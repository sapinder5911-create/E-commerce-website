
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Admin() {
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onsubmit = async (data) => {
        const formData = new FormData();
        formData.append("img", data.img[0]);
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("discription", data.discription);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/add",
                formData,
                { withCredentials: true }
            );
            setMessage(res.data.message);
            reset();
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center 
            bg-cover bg-center px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/5012851/pexels-photo-5012851.jpeg')] "
          
        >
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onsubmit)}
                    className="flex flex-col gap-5 p-6 sm:p-8 
                    bg-white/90 backdrop-blur-md 
                    rounded-2xl shadow-2xl"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
                        Add Product
                    </h2>

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">
                            {errors.name ? (
                                <span className="text-red-600 text-sm">
                                    {errors.name.message}
                                </span>
                            ) : (
                                "User Name"
                            )}
                        </label>
                        <input
                            className="p-3 border border-gray-300 rounded-lg outline-none
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            {...register("name", {
                                required: "name is required",
                                pattern: {
                                    value: /^[A-Za-z ]+$/,
                                    message: "Only letters are allowed",
                                },
                            })}
                            placeholder="Enter your product name"
                            type="text"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">
                            {errors.price ? (
                                <span className="text-red-600 text-sm">
                                    {errors.price.message}
                                </span>
                            ) : (
                                "Price"
                            )}
                        </label>
                        <input
                            className="p-3 border border-gray-300 rounded-lg outline-none
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            {...register("price", {
                                required: "price is required",
                                pattern: {
                                    message: "Only letters are allowed",
                                },
                            })}
                            placeholder="Enter your price"
                            type="number"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">
                            {errors.discription ? (
                                <span className="text-red-600 text-sm">
                                    {errors.discription.message}
                                </span>
                            ) : (
                                "Description"
                            )}
                        </label>
                        <input
                            className="p-3 border border-gray-300 rounded-lg outline-none
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            {...register("discription", {
                                required: "price is required",
                                pattern: {
                                    message: "Only letters are allowed",
                                },
                            })}
                            placeholder="Enter your description"
                            type="text"
                        />
                    </div>

                    {/* Image */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">
                            {errors.img ? (
                                <span className="text-red-600 text-sm">
                                    {errors.img.message}
                                </span>
                            ) : (
                                "Image"
                            )}
                        </label>
                        <input
                            className="p-2 border border-gray-300 rounded-lg cursor-pointer"
                            {...register("img", {
                                required: "img is required",
                            })}
                            type="file"
                            accept="image/*"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 text-black py-3 rounded-lg 
                        font-semibold hover:bg-blue-700 active:scale-95 
                        transition duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>

                    {/* Message */}
                    {message && (
                        <p className="text-center text-sm text-green-600 mt-2">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Admin;