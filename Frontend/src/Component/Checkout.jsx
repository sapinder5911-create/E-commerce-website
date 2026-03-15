
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { div } from "framer-motion/client";
import { motion } from "framer-motion";

function Checkout() {
    const { id } = useParams();

    const [cartItems, setCartItems] = useState([]);
    const [productitem, setproductitem] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setproductitem(res.data);
            } catch (err) {
                console.error("Error fetching product:", err.message);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/getcart");
                setCartItems(res.data);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };
        fetchCart();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:5000/api/create", {
                productname: productitem.name,
                price: productitem.price,
                img: productitem.img,
                customerName: data.name,
                email: data.email,
                address: data.address,
            });

            toast.success("Order placed successfully!");
            setCartItems([]);
            reset();
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="h-250 w-385  flex justify-center  bg-cover bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/1931143/pexels-photo-1931143.jpeg')] ">
            <motion.div className="h-250 w-300"
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.2 }}
            
            >
            
        

            <div className=" max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    Checkout
                </h1>

                {/* Cart Section */}
                <div className="mb-10">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Your Cart
                    </h2>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                        <div className="flex gap-4 overflow-x-auto pb-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md min-w-[160px]"
                                >
                                    <img
                                        src={`http://localhost:5000/uploads/${item.img}`}
                                        alt={item.name}
                                        className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-lg mb-3"
                                    />
                                    <span className="font-semibold text-center text-sm sm:text-base">
                                        {item.name}
                                    </span>
                                    <span className="text-blue-600 font-bold">
                                        {`$ ${item.price}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                    <br />

                {/* Shipping Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-3xl mx-auto flex flex-col gap-5"
                >
                    <h2 className="text-lg sm:text-xl font-semibold text-center">
                        Shipping Details
                    </h2>

                    {/* Selected Product */}
                    {productitem && (
                        <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 p-4 rounded-xl">
                            <img
                                src={`http://localhost:5000/uploads/${productitem.img}`}
                                alt={productitem.name}
                                className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-lg"
                            />
                            <div className="text-center sm:text-left">
                                <h3 className="font-semibold text-base sm:text-lg">
                                    {productitem.name}
                                </h3>
                                <p className="text-blue-600 font-bold text-lg">
                                    ₹{productitem.price}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Full Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                                    message: "Invalid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            {...register("address", { required: "Address is required" })}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-black font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300"
                    >
                        Place Order
                    </button>
                </form>
            </div>
            </motion.div>
        </div>
        
        
    );
}

export default Checkout;