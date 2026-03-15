// const { number } = require("framer-motion");
const {Schema,model}=require("mongoose")
// const mongoose = require("mongoose");

const orderSchema = new Schema({
    productname: { type: String, required: true },
    price: { type: Number, required: true },

    img: { type: String, required: true },
    email: { type: String, required: true },
    
    customerName: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

const mymodel = model("Order", orderSchema)

module.exports = mymodel