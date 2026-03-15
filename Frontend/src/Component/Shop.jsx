// import { div } from "framer-motion/client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Shop() {
    const Navigate = useNavigate();
    const [items, setitems] = useState([]);

    const role = localStorage.getItem("role");
    

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
            // setMessage(err.response?.data?.message || "Something went wrong");
        }
    };
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products", );
                console.log("Frontend data:", res.data);
                setitems(res.data);

            } catch (error) {
                console.log("Error fetching ", error.message)
            }
        };

        fetchProducts();

    }, [])
    
    const goToProduct = (id) => {
        Navigate(`/products/${id}`);
    }
    
    return (
        <div className="h-420 w-full  flex flex-col  items-center bg-taupe-300">
            <div className="h-320 w-370  flex flex-col  items-center " >
                <h1 className="text-3xl font-bold my-6">Trending Products</h1>
            <div className="flex flex-wrap justify-evenly b p-6 gap-8">
                {
                    items.map((item) => (
                        <div
                        
                            key={item._id}
                            className="flex flex-col items-center cursor-pointer p-4  rounded-lg hover:shadow-lg "
                        >
                            
                            <img
                                onClick={() => goToProduct(item._id)}
                                className="h-95 w-70 object-cover gap-4"
                                src={`http://localhost:5000/uploads/${item.img}`}
                                alt={item.name}
                            ></img>

                            <p className="text-xl ">{item.name}</p>
                            <p className="text-2xl">Price : ${item.price}</p>
                            <div className="flex gap-4">
                                {
                                    role === "user" && (<button
                                        onClick={() => { addcart(item) }}
                                        className="mt-3 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-black font-semibold rounded-lg shadow transition"
                                    >
                                        Add to cart
                                    </button>)
                              }
                                <button onClick={() => handleBuyNow(item._id)}  className="px-4 py-2 mt-3">Buy Now</button>
                                </div>
                            
                            
                    </div>
                    ))
                }
                </div>
            </div>
            {/* <button className="mt-9">Explor More</button> */}



           
        </div>
    )
}

export default Shop

