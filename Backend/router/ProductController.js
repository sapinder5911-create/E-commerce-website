// const { model } = require("mongoose");
const Product = require("../model/Products")
const express = require("express")
const router = express.Router();


router.get("/products", async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" })
    }
});


router.get("/products/:id", async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        res.json(products);

    } catch (error) {
        res.status(500).json({message :"product not found"})
    }
})

module.exports = router