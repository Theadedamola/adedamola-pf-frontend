import { useState } from "react";
import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrambleText } from "@/components/common/ScrambleText";
import HandwrittenSignature from "@/components/common/HandwrittenSignature";
import ExperiencePill from "@/components/common/ExperiencePill";

export default function HeroSection() {
  const [signatureDone, setSignatureDone] = useState(false);

  return (
    <>
      <section className="relative h-screen flex flex-col justify-center w-full pt-16 md:pt-20 overflow-hidden bg-black">
        {/* Solid Black Background with subtle ambient spotlight */}
        <div className="absolute inset-0 z-0 bg-black bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,119,198,0.12),rgba(0,0,0,0))]" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center text-center"
          >

            {/* Handwritten Signature: Animated Pen Writing */}
            <HandwrittenSignature
              onComplete={() => setSignatureDone(true)}
              className="mx-auto"
            />

            {/* Subtitle: "Design Engineer" gracefully emerges under the signature */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                signatureDone
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <span className="w-6 sm:w-10 h-[1px] bg-neutral-700/80" />
                <h2 className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.28em] text-neutral-300 font-medium">
                  <ScrambleText text="Design Engineer" delay={0.1} />
                </h2>
                <span className="w-6 sm:w-10 h-[1px] bg-neutral-700/80" />
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-neutral-500 tracking-wider text-center max-w-md">
                crafting clarity from chaos through intuitive design & code
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Storytelling Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-mono text-neutral-500"
        >
          <span className="animate-bounce">↓</span>
          <span>Scroll to read the story</span>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 max-w-4xl mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 text-sm sm:text-base md:text-lg text-neutral-700 font-normal leading-relaxed"
        >
          <p>
            adedamola crafts clarity from chaos — building intuitive digital
            experiences for complex product systems.
          </p>

          <p>
            currently a design engineer working at{" "}
            <ExperiencePill
              name="zmarket"
              iconBg="bg-blue-600"
              href="https://zmarket.ng"
            />{" "}
            where i manage the design system, and collaborate closely with engineers to
            turn ideas into polished, implementation-ready interfaces.
          </p>

          <p>
            i've also contributed to{" "}
            <ExperiencePill
              name="reycasa"
              iconBg="bg-indigo-600"
            />{" "}
            and led end-to-end product design at{" "}
            <ExperiencePill
              name="nagida foods"
              iconBg="bg-emerald-600"
              href="https://nagidafoods.com"
            />
            , working across mobile product experiences, interaction details, dark mode,
            receipts, and design-engineering improvements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm flex gap-4 mt-8 md:mt-10 md:text-base text-gray-500 max-w-4xl"
        >
          <Link to="https://wa.me/2347067276819">
            <Button className="h-full">Hit me up</Button>
          </Link>
          <Link to="https://drive.google.com/file/d/1Yu5HnRJZjcoUoajpEDGwWqP26y4irAjf/view?usp=sharing">
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

