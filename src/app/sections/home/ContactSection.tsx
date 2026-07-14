import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Link } from "react-router-dom";
import workWithMeImage from "@/assets/work-with-me.png";

export default function ContactSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white border-t border-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Column: Content & CTA */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-6xl font-normal leading-tight mb-6 text-gray-900 tracking-tight">
              Got a challenge? <br />
              Let's build something remarkable.
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md">
              From concept to code, I'm ready to bring your vision to life. 
              Let's discuss how we can work together to build products that scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact">
              <Button
                variant="primary"
                className="rounded-full px-8 py-6 text-base md:text-lg flex items-center gap-2 group"
              >
                <span>Get in touch</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Decorative Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="w-full aspect-square bg-black rounded-[40px] flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-shadow duration-500 p-12">
            <img
              src={workWithMeImage}
              alt="Work with me"
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
