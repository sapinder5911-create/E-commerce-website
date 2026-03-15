const User = require("../model/userModel");
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




router.post("/register", async (req, res) => {
   
    try {
        const { UserName, Email, Password } = req.body;

        const hasspassword = await bcrypt.hash(Password, 10);
        const newuser = new User({UserName,Email, Password: hasspassword,
        });
        await newuser.save();

       
        const token = jwt.sign(
            { id: newuser._id, role: newuser.role, name: newuser.UserName },
            process.env.Secret_key,
            {
                expiresIn: "1h",
            },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        });

        res.json({
            message: "user register succesfully",
            token,
            role: newuser.role,
        });
    } catch (err) {
        console.log(err.message);
    }



})


router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;

    const newUser = await User.findOne({ Email });
    if (!newUser) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(Password, newUser.Password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    

    const token = jwt.sign(
        { id: newUser._id, role: newUser.role, name: newUser.UserName },
        process.env.Secret_key,
        {
            expiresIn: "1h",
        },
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    });

    // console.log(token); 

    res.status(200).json({
        message: " successful", token, role: newUser.role
});
});


router.post("/logout", async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // true if HTTPS
        sameSite: "Lax", // must match login
    });
    res.json({ message: "Logged out successfully" });
});


router.get("/showuser",async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});


router.delete("/deleteuser/:id" , async (req, res) => {
    try {
        const { id } = req.params; // get id from URL
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "user deleted successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});








module.exports = router