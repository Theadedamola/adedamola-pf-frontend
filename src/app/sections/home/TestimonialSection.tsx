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
    <section className="py-24 px-6 md:px-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-normal font-heading leading-tight tracking-tight text-gray-900 mb-6 text-center">
            Kind Words
          </h2>
          <div className="w-16 h-0.5 bg-gray-200 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              quote={testimonial.quote}
              className={index === 1 ? "lg:border-l lg:border-gray-100 lg:pl-20" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
