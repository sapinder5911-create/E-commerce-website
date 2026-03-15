const { Schema, model } = require("mongoose");


const mySchema = new Schema({
    // UserName: String,
    // Email: String,
    // Password: String
    UserName: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    role: { type: String, default: "user" }
})

const myModel = model("User", mySchema)
module.exports = myModel; 