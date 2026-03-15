
const Product = require("../model/Products");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { authMiddleware , checkAdmin} = require("../Middleware/auth");



const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/") } ,
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });



router.post("/add", authMiddleware, checkAdmin, upload.single("img"), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const { name, price, discription } = req.body;
        const imgPath = req.file ? req.file.filename : null;
        const newproduct = new Product({ name, price, discription, img: imgPath })
        await newproduct.save();
        res.status(200).json({ message: "product add suucesfully" })

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete("/delete/:id", authMiddleware, checkAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete image file
        if (product.img) {
            const imagePath = path.join(__dirname, "../uploads", product.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router