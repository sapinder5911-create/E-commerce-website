
import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import axios from "axios"

function Home() {

    const [items, setitems] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products",);
                console.log("Frontend data:", res.data);
                setitems(res.data);

            } catch (error) {
                console.log("Error fetching ", error.message)
            }
        };

        fetchProducts();

    }, [])


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










    return (
        <>
            <div className="h-200 w-380 flex justify-center bg-cover bg-center 
            bg-[url(https://static.wixstatic.com/media/c837a6_992ba64846024ddab0a484c034298629~mv2.jpeg/v1/fill/w_1873,h_1134,fp_0.49_0.23,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_a5d0bc62a83e4ebab069c11b7e15e25a~mv2.jpeg)]">

                <motion.div className="h-130 w-300 flex items-center justify-center flex-col"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}>

                    <div className="h-20 w-300 flex flex-col justify-center items-center 
                    animate-fadeInUp">
                        <p className="text-7xl font-serif font-bold text-white mt-50 ">
                            Discover the beauty of
                        </p>
                    </div>

                    <div className="h-20 w-300 flex justify-center items-center  ">
                        <p className="text-7xl font-serif font-bold text-white mt-50 ">
                            Nature at Your Fingertips
                        </p>
                    </div>

                    <br />

                    <button className="bg-green-400 text-black hover:bg-green-500 mt-30 
                    px-6 py-2 rounded-lg 
                    transition-all duration-500 
                    hover:scale-110 hover:shadow-2xl 
                    animate-bounce">
                        <Link to="/shop" id="hello">Shop Now</Link>
                    </button>

                </motion.div>
            </div >


            <div className="h-300 w-full  flex flex-col  items-center bg-taupe-300">
                <motion.div className="h-320 w-370  flex flex-col  items-center "
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.2 }}

                
                >
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
                                        <button
                                                onClick={() => { addcart(item) }}
                                                className="mt-3 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-black font-semibold rounded-lg shadow transition"
                                            >
                                                Add to cart
                                            </button>
                                        
                                    </div>


                                </div>
                            ))
                        }
                    </div>
                </motion.div>
                {/* <button className="mt-9">Explor More</button> */}




            </div>


            






            <div className="h-150 w-380 flex flex-col items-center bg-cover bg-center 
            bg-[url(https://static.wixstatic.com/media/c837a6_35bdfabce3724dad92a9f8828437078e~mv2.jpeg/v1/fill/w_1873,h_945,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_85e5f4e9599f470cb22efaa7e0cf7d8f~mv2.jpeg)]">

              
                <motion.div className="h-150 w-380 flex flex-col items-center bg-cover bg-center "
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true, amount: 0.2 }}
                    
                
                >
                <div className="h-20 w-300 flex flex-col justify-center items-center 
                animate-fadeInUp" >
                    
                    <p className="text-5xl font-serif font-bold text-white mt-50 
                    animate-slideDown duration-1000">
                        Everything You Need to Know About Plants
                    </p>
                </div>

                <div className="h-20 w-250 flex justify-center items-center 
                animate-fadeInUp delay-300">
                    <p className="text-5xl font-serif font-bold text-white mt-50 
                    animate-slideUp duration-1000">
                        and More. No Spam, We Promise
                    </p>
                </div>

                <div className="h-20 w-250 flex justify-center items-center 
                animate-fadeInUp delay-500">
                    <p className="text-2xl font-serif font-bold text-white mt-50">
                        Subscribe now and get 15% off...
                    </p>
                </div>

                <br />

                <div className="h-20 w-250 flex justify-center items-center">
                    <button className="font-serif font-bold mt-30 
                    px-6 py-2 rounded-lg bg-white text-black
                    transition-all duration-500 
                    hover:scale-110 hover:bg-green-400 hover:text-black 
                    hover:shadow-xl  animate-bounce">
                        Subscibe Now
                    </button>
                </div>

                </motion.div>
            </div>

           

        </>
    )
}

export default Home