const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectedDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongoose connected")
    }
    catch (error) {
        console.log(error.message)
        process.exit(1)

    }

}

module.exports = connectedDb