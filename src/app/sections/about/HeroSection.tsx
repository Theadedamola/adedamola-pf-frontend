import { motion } from "framer-motion";
import me1 from "@/assets/me1.jpg";
import me2 from "@/assets/me2.jpeg";

export default function HeroSection() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
          <span className="font-thaloria text-5xl md:text-6xl lg:text-7xl">
            About Me
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
          A passionate frontend developer and designer dedicated to crafting
          digital experiences that blend aesthetics with functionality.
        </p>
      </motion.div>

      {/* Profile Images */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row gap-6 md:gap-8"
      >
        {/* Image 1 - Casual */}
        <div className="relative group overflow-hidden rounded-3xl w-full md:w-1/2 aspect-[4/5]">
          <img
            src={me1}
            alt="Adedamola - Casual"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
        </div>

        {/* Image 2 - Professional */}
        <div className="relative group overflow-hidden rounded-3xl w-full md:w-1/2 aspect-[4/5]">
          <img
            src={me2}
            alt="Adedamola - Professional"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
        </div>
      </motion.div>
    </section>
  );
}
