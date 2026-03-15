// import { div } from "framer-motion/client"
import { motion } from "framer-motion";

function Footer (){
    return (
        <>
            <div className="h-90 w-380  flex items-center justify-center bg-black border border-white ">
                <motion.div className="h-70 w-300  flex items-center justify-evenly bg-black mt-5 "
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                
                >
            <div className="h-70 w-50  text-white font-serif font-bold justify-center items-center ">
                <p className="text-2xl ">Contect</p>

                Address: 500 Terry <br />
                Francine Street <br />
                San Francisco, CA 94158 <br />
                Phone: 123-456-7890 <br />
                Email: info@mysite.com <br />
            
            
            </div>
            <div className="h-70 w-50  text-white font-serif font-bold justify-center items-center "> 
                <p className="text-2xl">Shop</p>
                Shop All Plants <br />
                Pots <br />
                Sale <br />
                Subscriptions <br />
            </div>
            <div className="h-70 w-50  text-white font-serif font-bold justify-center items-center">
                <p className="text-2xl">helpful Links</p>
                FAQ <br />
                Shipping Policy <br />
                Refund Policy <br />
                Terms 8 Conditions <br />
                Accessibility Statement <br />
                Privacy Policy <br />
            
            </div>
            <div className="h-70 w-50  text-white font-serif font-bold justify-center items-center "> 
                <p className="text-2xl">Company</p>
                Our Story <br />
                Contact Us <br />
            </div>
            </motion.div >
           
        </div >
            <div className="h-20 w-full border border-black flex bg-black "
                
            
            >
                <motion.p className=" text-white text-center text-sm font-serif font-bold m-auto"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                
                >Copyright © 2026 Plants's Co. All rights reserved.</motion.p>




            </div>
        </>
    )
}

export default Footer