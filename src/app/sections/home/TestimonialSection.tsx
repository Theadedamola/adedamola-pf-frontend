import TestimonialCard from "@/components/common/TestimonialCard";
import { motion } from "framer-motion";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Frank",
      role: "CEO",
      company: "Zmarket",
      quote:
        "Adedamola is a rare breed of developer who understands both the technical and business aspects of product development. His attention to detail and ability to deliver high-quality code is unmatched.",
    },
    {
      name: "Samuel Adeyemi",
      role: "CEO",
      company: "NagidaFoods",
      quote:
        "Working with Adedamola transformed our digital presence. His ability to translate complex ideas into elegant, user-friendly solutions is remarkable. The new platform he built increased our customer engagement.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-12 md:mb-16 text-center"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 tracking-tight">
            Kind Words
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
