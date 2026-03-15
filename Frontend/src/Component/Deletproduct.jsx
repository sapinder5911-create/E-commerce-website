

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
    const Navigate = useNavigate();
    const [items, setitems] = useState([]);

    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/delete/${id}`,
                { withCredentials: true }
            );

            alert(res.data.message);

            // Refresh product list after delete
            setitems((prev) => prev.filter((item) => item._id !== id));

        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/products"
                );
                setitems(res.data);
            } catch (error) {
                console.log("Error fetching ", error.message);
            }
        };

        fetchProducts();
    }, []);

    const goToProduct = (id) => {
        Navigate(`/products/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-10">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
                    Trending Products
                </h1>

                <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-8
                "
                >
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                            duration-300
                            overflow-hidden
                            flex
                            flex-col
                        "
                        >
                            {/* Image */}
                            <div
                                className="cursor-pointer overflow-hidden"
                                onClick={() => goToProduct(item._id)}
                            >
                                <img
                                    src={`http://localhost:5000/uploads/${item.img}`}
                                    alt={item.name}
                                    className="
                                    h-95 w-70
                    
                                    object-cover
                                    hover:scale-105
                                    transition
                                    duration-300
                                "
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <p className="text-lg font-semibold text-gray-800">
                                    {item.name}
                                </p>

                                <p className="text-xl font-bold text-gray-900 mt-2">
                                    Price : ${item.price}
                                </p>

                                {/* Delete Button */}
                                <button
                                    onClick={() =>
                                        deleteProduct(item._id)
                                    }
                                    className="
                                    mt-auto
                                    w-full
                                    py-2.5
                                    bg-red-600
                                    hover:bg-red-700
                                    text-black
                                    font-semibold
                                    rounded-xl
                                    transition
                                    mt-6
                                "
                                >
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Shop;