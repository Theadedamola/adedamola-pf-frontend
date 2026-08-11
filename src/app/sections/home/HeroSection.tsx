import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrambleText } from "@/components/common/ScrambleText";

export default function HeroSection() {
  return (
    <>
      <section className="relative h-screen flex flex-col justify-center w-full pt-24 overflow-hidden bg-black">
        {/* Solid Black Background */}
        <div className="absolute inset-0 z-0 bg-black" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="max-w-4xl">
              <h1 className="text-[80px] sm:text-[120px] md:text-[175px] lg:text-[200px] font-bold font-heading tracking-tight text-wrap text-white mb-0">
                <ScrambleText text="Design Engineer" className="inline-block" />
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl 2xl:text-6xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
            adedamola crafts clarity from chaos — building intuitive digital
            experiences that feel less like software and more like second
            nature.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm flex gap-4 mt-12 md:text-base text-gray-500 max-w-4xl"
        >
          <Link to="https://wa.me/2347067276819">
            <Button className="h-full">Hit me up</Button>
          </Link>
          <Link to="https://drive.google.com/file/d/1LM2XE0GTNVoaqvj8eFllRwUWOfUj9Yk4/view?usp=sharing">
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2"
            >
              <span className="font-thaloria text-2xl">
                <strong>Résumé</strong>
              </span>
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
