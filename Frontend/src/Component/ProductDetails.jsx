import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ProductDetails() {
    const { id } = useParams(); 
    const [product, setProduct] = useState([]);
    const Navigate = useNavigate();


    const handleBuyNow = (id) => {
        Navigate(`/checkout/${id}`);
    };


    const addcart = async (data) => {
        try {
            const res = await axios.post("http://localhost:5000/api/addcart", {
                name: data.name,
                price: data.price,
                img: data.img,
            });
            toast.success("succesfully added to cart");
        } catch (err) {
            toast.error("Something went wrong");
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}` );
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err.message);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="flex items-center bg-gray-100  p-6  justify-center gap-20 bg-taupe-300">
            <div className="h-220 w-130 p-4 rounded-lg flex gap-20">
                <img
                    src={`http://localhost:5000/uploads/${product.img}`}
                    alt={product.name}
                    className="h-180 w-130 object-cover rounded-lg shadow-md mt-30"
                />
            </div>
            <div className=" p-6 rounded-lg max-w-md">
                <h1 className="text-6xl font-extrabold mb-4 ">{product.name}</h1>
                <p className="text-5xl font-semibold text-black mt-2">
                    $ {product.price}
                </p>
                <p className="mt-6 text-base  ">{product.discription}</p>
                <div className="flex gap-4 mt-10">
                    <button
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-black font-semibold rounded-lg shadow-md transition mt-10"
                        onClick={() => { addcart(product) }}
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => handleBuyNow(product._id)}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-black font-semibold rounded-lg shadow-md transition mt-10"
                    >
                        Buy Now
                    </button>

                  
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

