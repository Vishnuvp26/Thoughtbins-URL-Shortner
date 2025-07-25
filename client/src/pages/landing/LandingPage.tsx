import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import UrlShortenerForm from "@/components/shortner/UrlShortner";
import { navItems } from "@/constants/items/NavItems";

const LandingPage = () => {
    return (
        <div className="relative min-h-screen w-full">
            <Navbar title="URL Shortener" navItems={navItems} />
            <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(rgba(0,0,0,0.2)_0.8px,transparent_1px)] [background-size:20px_20px]">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-32 text-center"
                >
                    <h1 className="mt-6 max-w-[15ch] text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-black leading-[1.1] tracking-tighter">
                        Smart links, better results!
                    </h1>
                    <p className="mt-4 text-gray-800 text-sm sm:text-lg max-w-xl">
                        Create short, memorable links that drive more clicks and simplify your sharing.
                    </p>
                    <UrlShortenerForm />
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;