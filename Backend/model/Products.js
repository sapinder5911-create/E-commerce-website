const { Schema, model } = require("mongoose");


const MyproductSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    img: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        required: true
    },
    discription: {
        type: String,
        required: true,
        
    }
})

const MyproductModel = model("Product", MyproductSchema)

module.exports = MyproductModel