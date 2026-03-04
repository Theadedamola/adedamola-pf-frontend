import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrambleText } from "@/components/common/ScrambleText";
import zmarketPreview from "@/assets/zmarket-preview.png";
import vociaraPreview from "@/assets/vociara-preview.png";
import nagidaPreview from "@/assets/nagida-preview.png";

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
          <h1 className="text-[90px] md:text-[195px] lg:text-[250px] font-bold tracking-tight text-gray-900 mb-16">
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
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
              Currently Building
            </span>
            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 max-w-[200px]"></div>
          </div>

          <div className="flex overflow-x-auto gap-5 py-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              {
                title: "Zmarket",
                link: "https://zmarket.ng",
                image: zmarketPreview,
                description: "Digital marketplace platform",
              },
              {
                title: "Vociara",
                link: "https://vociara.com",
                image: vociaraPreview,
                description: "AI voice synthesis",
              },
              {
                title: "Nagida Foods",
                link: "https://nagidafoods.com",
                image: nagidaPreview,
                description: "Food delivery & logistics",
              },
            ].map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="snap-start shrink-0 w-[260px] md:w-[300px] rounded-2xl border border-gray-200/60 bg-white overflow-hidden transition-all duration-300 group hover:shadow-2xl hover:shadow-gray-300/40 hover:-translate-y-1.5 relative"
              >
                {/* Website Screenshot */}
                <div className="relative w-full h-[160px] md:h-[180px] overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Arrow icon on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-800"
                      >
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-base text-gray-900 mb-0.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm flex gap-4 mt-8 md:text-base text-gray-500 max-w-4xl"
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
