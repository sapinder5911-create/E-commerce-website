const express = require("express");
const router = express.Router();
const Order = require("../model/buynow");

router.post("/create", async (req, res) => {
    try {
        const { productname, address,img,email, price, customerName, } = req.body;
        const newcart = new Order({ productname, address, price, customerName, img, email, });
        await newcart.save();
        res.status(200).json({ message: "product add suucesfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

   


router.get("/order" ,async (req, res) => {
    try {
        const orders = await Order.find(); 
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;