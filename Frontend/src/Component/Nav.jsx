


import { ShoppingCart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "lucide-react"
import { Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import axios from "axios"
import Logo1 from "../assets/logo.jpeg"
import "./Nav.css"

function Nav() {

    const [profilePic, setProfilePic] = useState(null)
  
  
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    
    
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    let userName = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userName = decoded.name;
        } catch (e) {
            console.log("Invalid token");
        }
    }

    
    const [items, setitems] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/getcart");
                setitems(res.data);
            } catch (err) {
                console.error("Error fetching:", err.message);
            }
        };
        fetchProducts();
    }, []);

    const deleteCartItem = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/deletecart/${id}`,
            );
            setitems((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.log("Failed to delete");
        }
    };

    const Navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/logout", {
                withCredentials: true,
            });
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setIsLoggedIn(false);
            Navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="h-20 w-380 flex items-center justify-center bg-[url(https://static.wixstatic.com/media/c837a6_35bdfabce3724dad92a9f8828437078e~mv2.jpeg/v1/fill/w_1873,h_945,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_85e5f4e9599f470cb22efaa7e0cf7d8f~mv2.jpeg)]">

            <div className="h-20 w-300 flex items-center justify-between text-xl ">

                {/* LEFT */}
                <div className="flex-1 flex justify-start">
                    <a href="" id="hello">🌿Plants</a>
                    <div className="flex-1 flex justify-center gap-10 text-white  w-200">
                        <Link to="/" id="hello" className="text-blue-400 hover:text-blue-600">Home</Link>
                        <Link to="/about" id="hello" className="text-green-400 hover:text-green-600">About</Link>
                        <Link to="/shop" id="hello" className="text-yellow-400 hover:text-yellow-600">Shop</Link>
                    </div>
                </div>

                {/* CENTER */}
               

                <div className="h-20 w-100  flex justify-end-safe  ">
                    <div className="flex-1 flex justify-end items-center gap-5">

                        <details className="dropdown">
                            <summary className="btn m-1 bg-transparent shadow-none border-none text-black font-bold flex items-center gap-2">
                                <User />
                                <span className="hidden sm:inline">Account</span>
                            </summary>

                            <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm text-black">

                                {!localStorage.getItem("token") && (
                                    <li>
                                        <Link to="/login" id="hello" className="flex items-center gap-2">
                                            <User /> LOGIN
                                        </Link>
                                    </li>
                                )}

                                {localStorage.getItem("token") && (
                                    <li>
                                        <button onClick={handleLogout} className="flex items-center gap-2">
                                            <User /> LOGOUT
                                        </button>
                                    </li>
                                )}

                                {localStorage.getItem("role") === "admin" && (
                                    <li>
                                        <Link to="/admin" id="hello" className="flex items-center gap-2">
                                            <User /> Admin
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </details>

                        {isLoggedIn && (
                            <details className="dropdown">
                                <summary className="btn m-1 bg-transparent shadow-none border-none text-white font-bold flex items-center gap-2">
                                    <img
                                        src={profilePic || Logo1}
                                        alt=""
                                        className="w-8 h-8 rounded-full object-cover border border-white/30 shadow-sm"
                                    />
                                    <p className="hidden sm:inline text-black">
                                        {userName}
                                    </p>
                                </summary>

                                <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm text-black">
                                    <li>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <User /> Set picture
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setProfilePic(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </label>
                                    </li>
                                    <li>
                                        <Link to="/userorder" id="hello" className="flex items-center gap-2">
                                            <User /> Order
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        )}

                        {role === "user" && (
                            <div className="drawer drawer-end">
                                <input
                                    id="my-drawer-5"
                                    type="checkbox"
                                    className="drawer-toggle"
                                />
                                <div className="drawer-content">
                                    <label
                                        htmlFor="my-drawer-5"
                                        className="drawer-button btn btn-primary bg-transparent border-none shadow-none text-black"
                                    >
                                        <ShoppingCart /> cart
                                    </label>
                                </div>

                                <div className="drawer-side">
                                    <label
                                        htmlFor="my-drawer-5"
                                        className="drawer-overlay"
                                    ></label>

                                    <ul className="menu bg-base-200 min-h-full w-120 p-4">
                                        {items.length === 0 ? (
                                            <li className="text-black text-4xl text-center">
                                                No items in cart
                                            </li>
                                        ) : (
                                            items.map((item) => (
                                                <div
                                                    className="w-full text-black flex mt-4 justify-between"
                                                    key={item._id}
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <img
                                                            className="h-30 w-30 rounded-xl"
                                                            src={`http://localhost:5000/uploads/${item.img}`}
                                                            alt="item"
                                                        />
                                                        <div className="text-3xl font-bold flex flex-col gap-5 p-3">
                                                            {item.name}
                                                            <br />
                                                            {`$ ${item.price}`}
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => deleteCartItem(item._id)}
                                                        className="p-4"
                                                    >
                                                        <Trash size={20} className="cursor-pointer" />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Nav