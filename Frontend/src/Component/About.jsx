
import { Link } from "react-router-dom"
import { motion } from "framer-motion";


function About() {
    return (
        <div className="h-350 w-full  flex flex-col  ">
            <div className="h-170 w-full flex flex-col justify-center items-center bg-cover bg-[url(https://static.wixstatic.com/media/11062b_3124664d3f4747b8ac3f20021182544c~mv2.jpg/v1/fill/w_1801,h_716,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Greenhouse%20Garden%20View.jpg)]">
            <motion.div className="h-100 w-300   flex items-center justify-center flex-col "
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
            
            
            >
                    <div className="h-10 w-200  flex flex-col justify-center  items-center "
                        
                    
                    >
                        <p className="text-3xl font-serif font-bold text-white ">About</p></div>

                <div className="h-20 w-200  flex flex-col justify-center  items-center ">
                    <p className=" text-7xl  font-serif font-bold gap-50 text-white">We are Passionate </p>



                </div>
                <div className="h-20 w-250 flex justify-center  items-center ">
                    <p className=" text-8xl  font-serif font-bold gap-50 text-white">About Our Work</p>



                </div><br />
               



                </motion.div>
            </div>
            <div className="h-200 w-full bg-cover bg-[url(https://images.pexels.com/photos/2239676/pexels-photo-2239676.jpeg)]">
                <motion.div className="h-150 w-200 flex flex-col justify-center items-center gap-10  "
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true, amount: 0.2 }}
                
                >
                    <p className="text-5xl font-serif font-bold ml-50">We Strive to Provide Our <br />Customers with the hightest quality</p>
                    <p className="text-xl font-serif font-bold ml-50">Plants's Co . was founded in 1960 by a group or plant entnusiasts <br />  recognized the positive impact that plants can have on our lives. <br /> Whether it's purifying the air, reducing stress, or simply <br /> adding a touch
                        of beauty to
                        your environment, plants are more <br /> than lust decoration-ney re a lifestyle</p>
                    
                    <button className=" text-green-400"><Link to="/Login" id="hello">Contect us</Link></button>


                </motion.div>

            
            
            </div>
        </div>
    )
}

export default About

