import { motion, } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Import skill icons
import skill1 from '@/assets/skillicon/skillicon1.png';
import skill2 from '@/assets/skillicon/skillicon2.png';
import skill3 from '@/assets/skillicon/skillicon3.png';
import skill4 from '@/assets/skillicon/skillicon4.png';
import skill5 from '@/assets/skillicon/skillicon5.png';
import skill6 from '@/assets/skillicon/skillicon6.png';
import skill7 from '@/assets/skillicon/skillicon7.png';
import skill8 from '@/assets/skillicon/skillicon8.png';
import skill9 from '@/assets/skillicon/skillicon9.png';

const skills = [
  { icon: skill1, name: 'Figma' },
  { icon: skill2, name: 'React' },
  { icon: skill3, name: 'TypeScript' },
  { icon: skill4, name: 'Node.js' },
  { icon: skill5, name: 'Tailwind' },
  { icon: skill6, name: 'Motion' },
  { icon: skill7, name: 'Next.js' },
  { icon: skill8, name: 'Git' },
  { icon: skill9, name: 'Design' }
];

// Duplicate skills to create a larger explorable grid
const gridItems = [...skills, ...skills, ...skills, ...skills];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    if (containerRef.current) {
      // Calculate constraints to allow dragging but keep some content visible
      // This is a loose approximation to ensure "endless" feel without losing the content entirely
      const width = containerRef.current.scrollWidth;
      const height = containerRef.current.scrollHeight;
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      
      setDragConstraints({
        top: -height + viewportH / 2,
        left: -width + viewportW / 2,
        right: width / 2,
        bottom: height / 2
      });
    }
  }, []);

  return (
    <section className="h-[80vh] w-full overflow-hidden bg-black relative flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* Dot Texture Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-thaloria text-white mb-2">Capabilities</h2>
        <p className="text-gray-400 text-sm md:text-base font-mono">
          Drag to explore
        </p>
      </div>

      <motion.div
        ref={containerRef}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        className="grid grid-cols-3 md:grid-cols-6 gap-24 md:gap-32 p-24"
      >
        {gridItems.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="flex flex-col items-center justify-center gap-4 group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#111] rounded-3xl flex items-center justify-center border border-[#222] shadow-2xl group-hover:border-[#333] transition-colors duration-300 relative overflow-hidden">
               {/* Inner glow effect */}
               <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Fade overlay edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </section>
  );
}
