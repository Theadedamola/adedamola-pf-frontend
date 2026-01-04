import { useState } from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  company?: string;
  className?: string;
}

export default function TestimonialCard({ name, role, quote, company, className = '' }: TestimonialCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative w-full max-w-md aspect-[1.586/1] perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl">
          {/* Background with noise texture */}
          <div className="absolute inset-0 bg-[#1a1a1a]">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6 z-10">
            <div className="flex justify-between items-start">
              {/* Chip illustration */}
              <div className="w-12 h-9 rounded bg-linear-to-br from-yellow-200 to-yellow-500 opacity-80" />
              <div className="text-white/50 font-mono text-xs">TESTIMONIALS</div>
            </div>
            
            <div className="space-y-1">
              <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Tap to reveal</p>
              <h3 className="text-white text-xl md:text-2xl font-medium tracking-wide">
                {role} {company && <span className="text-white/80">@ {company}</span>}
              </h3>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl bg-black rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 bg-[#1e1e1e]">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative h-full flex flex-col justify-center p-8 z-10 text-center">
            <p className="text-gray-200 text-sm md:text-xl font-regular leading-5.5">
              {quote}
            </p>
            <div className="my-6">
              <p className="text-gray-200 font-bold">{name}</p>
              <p className="text-gray-200 text-sm">{role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
