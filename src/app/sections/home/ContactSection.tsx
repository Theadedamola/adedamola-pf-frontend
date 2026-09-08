import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Link } from "react-router-dom";
import workWithMeImage from "@/assets/work-with-me.png";

export default function ContactSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-t border-neutral-200/60 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">

        {/* Centralized Headline with compact collage capsule spanning between text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.25] text-neutral-900 tracking-tight max-w-3xl"
        >
          <span>got a challenge?</span>
          <span className="inline-flex items-center justify-center mx-2 sm:mx-3.5 align-middle -translate-y-1 sm:-translate-y-2">
            <span className="relative w-14 sm:w-20 md:w-24 h-9 sm:h-12 md:h-14 rounded-full bg-neutral-950 px-2.5 py-1 flex items-center justify-center border border-neutral-800 shadow-xs hover:scale-105 transition-transform duration-300 select-none">
              <img
                src={workWithMeImage}
                alt="Work with me"
                className="h-full w-auto object-contain"
              />
            </span>
          </span>
          <span>let's build something remarkable.</span>
        </motion.h2>

        {/* Quiet Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-neutral-500 text-sm sm:text-base md:text-lg mt-6 md:mt-8 max-w-lg leading-relaxed font-normal"
        >
          from concept to code, i'm ready to bring your vision to life.
          let's discuss how we can build products that scale.
        </motion.p>

        {/* Centralized Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 md:mt-10"
        >
          <Link to="/contact">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full px-8 py-3 text-sm sm:text-base flex items-center gap-2 group shadow-sm hover:shadow-md transition-all"
            >
              <span>get in touch</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
