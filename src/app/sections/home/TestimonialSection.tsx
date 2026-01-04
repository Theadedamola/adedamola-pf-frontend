import TestimonialCard from '@/components/common/TestimonialCard';

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Frank",
      role: "CEO",
      company: "Zmarket",
      quote: "Adedamola is a rare breed of developer who understands both the technical and business aspects of product development. His attention to detail and ability to deliver high-quality code is unmatched."
    },
    {
      name: "Samuel Adeyemi",
      role: "CEO",
      company: "NagidaFoods",
      quote: "Working with Adedamola transformed our digital presence. His ability to translate complex ideas into elegant, user-friendly solutions is remarkable. The new platform he built increased our customer engagement."
    },
    // Added a second one for balance, or I can just keep one centered.
    // Let's stick to the requested one primarily, but maybe layout allows for more.
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-3xl md:text-4xl 2xl:text-6xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
            Kind Words
          </h2>
          <div className="w-20 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
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
