// place order cod : /api/order/cod

import Order from "../models/orderSchema.js";
import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";
import stripe from 'stripe';

export const placeOrderCOD = async (req,res)=>{
    try {
        const {userId, items, address} = req.body;
        if(!address || items.length === 0){
            return res.json({success:false, message:"invalid data"})
        }
        // calculate ammount using items
        let ammount = await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)
        // add tax charges (2%)
        ammount += Math.floor( ammount * 0.02);

        await Order.create({
            userId,
            items,
            ammount,
            address,
            paymentType:'COD'
        });
        return res.json({success:true, message:"Order Placed Successfully"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

// get orders by userId : api/order/user

export const getUserOrders = async (req,res)=>{
    try {
        const {userId} = req.query;
        const orders = await Order.find({
            userId,
            $or:[{paymentType:'COD'}, {isPaid: true}] //paymentType is 'COD' (Cash on Delivery), OR isPaid is true (user has already paid online).
        }).populate("items.product address").sort({createdAt: -1}); // .populate => It just finds that ID and then fills the complete data from another schema to which it is referenced.
        return res.json({success:true, orders})
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}

// get All Orders ( seller / admin) : /api/order/seller  ==> it will return all orders for admin or seller

export const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find({
            $or:[{paymentType:'COD'}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1}) //sort => newly ordered items will be at the top, 
        return res.json({success:true, orders})
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}



// place order stripe :- api/order/stripe  ==> controller function to create an order using stripe

export const placeOrderStripe = async (req,res)=>{
    try {
        const {userId, items, address} = req.body;
        const{origin} = req.headers;
        if(!address || items.length === 0){
            return res.json({success:false, message:"invalid data"})
        }

        let productData = [];

        // calculate ammount using items
        let ammount = await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity:item.quantity
            });
            return (await acc) + product.offerPrice * item.quantity;
        },0)
        // add tax charges (2%)
        ammount += Math.floor( ammount * 0.02); 
        const order = await Order.create({
            userId,
            items,
            ammount,
            address,
            paymentType:'Online'
        });
        

        // stripe gateway initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // create line items for stripe (in this we have to provide the product data, currency, price and quantity)
        const line_items = productData.map((item)=>({
            price_data:{
                currency:"usd",
                product_data : {
                    name: item.name,
                },
            unit_amount:Math.floor(item.price + item.price * 0.02) * 100
            //unit_amount: Math.round(item.price * 1.02 * 100) // cents
            },
            quantity:item.quantity,
        }));

        // create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`, // if payment is cancelled user will br redirected to the cart page
            metadata:{
                orderId: order._id.toString(),
                userId,
            }
        })
        console.log("Stripe session URL:", session.url);
        console.log("Order created:", order);   
        return res.json({success:true, url:session.url})// it will be either success or cancel url
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}


// stripe webhooks to verify paymant Action :- /stripe
export const stripeWebhooks = async(request,response)=>{
    // stripe gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`webhook error ${error.message}`)
    }

    // handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            });

            const {orderId, userId} = session.data[0].metadata;
            // mark payment as paid
            await Order.findByIdAndUpdate(orderId, {isPaid:true})

            // clear user cart
            await User.findByIdAndUpdate(userId, {cartItems:{}});
            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            });

            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
            
        default:
            console.error(`Unhandled event type ${event.type}`)
            break;
    }
    response.json({recieved:true});

}