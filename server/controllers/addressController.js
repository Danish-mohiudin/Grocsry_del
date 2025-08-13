// Add Address :- /api/address/add

import Address from "../models/addressSchema.js";

export const addAddress = async(req,res)=>{
    try {
        const {address, userId} = req.body;
        await Address.create({...address, userId})
        res.json({success:true, message:"Address added successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

// get adress :- /api/address/get

export const getAddress = async(req,res)=>{
    try {
        const {userId} = req.query;
        const addresses = await Address.find({userId}) // for this particular id we will get all its addresses
        res.json({success:true, addresses})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}