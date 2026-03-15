const Cart = require("../model/cart");
const express = require("express")
const router = express.Router()


 router.post("/addcart" ,async (req, res) => {
    try {
        const { name, price, img } = req.body;
        const newcart = new Cart({ name, price, img });
        await newcart.save();
        res.status(200).json({ message: "product add suucesfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get("/getcart", async (req, res) => {
    try {
        const items = await Cart.find(); // Fetch all items in cart collection
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/deletecart/:id", async (req, res) => {
    try {
        const { id } = req.params; // get id from URL
        await Cart.findByIdAndDelete(id);

        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router