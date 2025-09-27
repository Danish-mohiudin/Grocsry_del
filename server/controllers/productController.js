import { json } from "express"
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productSchema.js";

// Add Product : /api/product/add
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,
                    {resource_type:"image"});
                    return result.secure_url
            })
        )
        await Product.create({...productData,image:imagesUrl})
        res.json({success:true, message:"product added"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


// Get Products : /api/product/list
export const productList = async (req, res) => {
  try {
    // Disable caching
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    // Fetch only products for the logged-in seller
    const products = await Product.find({ sellerId: req.sellerId });

    res.json({ success: true, products });
  } catch (error) {
    console.log("Product list error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get single Product : /api/product/id
export const productById = async (req, res)=>{
    try {
        const {id} = req.body
        const product = await Product.find(id)
        res.json({success:true, product})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


// change Product stock : /api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const {id,inStock} = req.body;
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success:true, message:"stock updated"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}