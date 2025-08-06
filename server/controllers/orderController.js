// place order cod : /api/order/cod

import Order from "../models/orderSchema.js";
import Product from "../models/ProductSchema.js";

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