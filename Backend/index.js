const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

const conn = require("./config/db")
const router = require("./router/Controller")
const ProductRouter = require("./router/ProductController")
const upload = require("./router/AdminController")
const Buynow = require("./router/Order")
const cart = require("./router/CartController")
const cors = require("cors")





app.use("/uploads", express.static("uploads"))
app.use(express.json())
conn();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}))


    // < img src = {`http://localhost:5000/uploads/${filename}`} alt = "Uploaded" />

app.use("/api", router)
app.use("/api", ProductRouter)
app.use("/api", upload)
app.use("/api",Buynow)
app.use("/api",cart)




app.get("/", (req, res) => {
    // res.cookie("name", "sapinder")
    res.send("Hello page")
})




app.listen(5000, () => { console.log("server started") })