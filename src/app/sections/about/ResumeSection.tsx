import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const RESUME_URL =
  "https://drive.google.com/file/d/1Yu5HnRJZjcoUoajpEDGwWqP26y4irAjf/view?usp=sharing";

const SOCIAL_LINKS = [
  { label: "github", href: "https://github.com/adedamolaalausa" },
  { label: "linkedin", href: "https://linkedin.com/in/adedamolaalausa" },
  { label: "twitter / x", href: "https://x.com/theadedamola" },
  { label: "whatsapp", href: "https://wa.me/2347067276819" },
  { label: "email", href: "mailto:adedamolaalausa04@gmail.com" },
];

export default function ResumeSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >

        {/* Headline & Description */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-4 leading-[1.15]">
          want the <span className="font-heading">full record</span>?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-normal leading-relaxed mb-8 max-w-xl">
          a comprehensive breakdown of architectural competencies, design system governance, and production milestones.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 mb-14">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="primary"
              size="lg"
              className="rounded-full px-7 py-3 text-sm sm:text-base flex items-center gap-2 group shadow-sm hover:shadow-md transition-all"
            >
              <span>view curriculum vitae</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </a>

          <Link to="/contact" className="inline-block">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full px-7 py-3 text-sm sm:text-base flex items-center gap-2 group border-neutral-300 hover:border-neutral-400 transition-all"
            >
              <span>get in touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Social / Connect Footnote */}
        <div className="pt-8 border-t border-neutral-200/80">
          <div className="text-xs font-mono text-neutral-400 mb-4 uppercase tracking-wider">
            connect & channels
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-mono text-neutral-600 hover:text-black transition-colors flex items-center gap-1 group"
              >
                <span>{link.label}</span>
                <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all text-[11px]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
