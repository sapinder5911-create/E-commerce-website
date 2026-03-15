
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Order() {
    const [item, setitem] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/order");
                setitem(res.data);
            } catch (err) {
                console.error("Error fetching product:", err.message);
            }
        };
        fetchProduct();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-10">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
                    Your Orders
                </h1>

                {item.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">
                        No order found
                    </p>
                ) : (
                    <div
                        className=" grid  grid-cols-1 sm:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {item.map((index) => (
                            <div
                                key={index._id}
                                className=" bg-white rounded-2x shadow-md hover:shadow-xl transition duration-300  overflow-hidden flex flex-col
                            "
                            >
                                {/* Product Image */}
                                <img
                                    src={`http://localhost:5000/uploads/${index.img}`}
                                    alt="order"
                                    className=" w-full h-100  sm:h-90   md:h-56 lg:h-60  object-cover "
                                />

                                {/* Product Info */}
                                <div className="p-5 flex flex-col gap-2 text-gray-800">

                                    <p className="text-lg font-semibold">
                                        {index.productname}
                                    </p>

                                    <p className="text-blue-700 font-bold text-lg">
                                        ₹{index.price}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Email:</span>{" "}
                                        {index.email}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Name:</span>{" "}
                                        {index.customerName}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Address:</span>{" "}
                                        {index.address}
                                    </p>

                                    <p className="text-sm text-gray-500 pt-2">
                                        <span className="font-semibold">
                                            Order Date:
                                        </span>{" "}
                                        {new Date(
                                            index.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Order;