import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrambleText } from "@/components/common/ScrambleText";

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="max-w-4xl">
          <h1 className="text-[90px] md:text-[195px] lg:text-[250px] font-bold font-heading tracking-tight text-gray-900 mb-16">
            <ScrambleText text="Design Engineer" className="inline-block" />
          </h1>
          <h1 className="text-4xl 2xl:text-6xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
            adedamola crafts clarity from chaos — building intuitive digital
            experiences that feel less like software and more like second
            nature.
          </h1>
        </div>

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
      </motion.div>
    </section>
  );
}
