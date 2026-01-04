import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <h1 className="text-3xl md:text-4xl 2xl:text-6xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
          <span className="font-thaloria text-4xl md:text-6xl 2xl:text-7xl">Adedamola</span> crafts clarity from chaos — building intuitive digital experiences that feel less like software and more like second nature.
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm md:text-base text-gray-400"
        >
          <span className="mr-2">Currently Building:</span>
          <a href="https://zmarket.ng" className="text-gray-500 hover:text-blue-600 hover:underline transition-colors">Zmarket</a>, <a href="https://vociara.com" className="text-gray-500 hover:text-blue-600 hover:underline transition-colors">Vociara</a>, <a href="https://nagidafoods.com" className="text-gray-500 hover:text-blue-600 hover:underline transition-colors">Nagida foods</a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm flex gap-4 mt-8 md:text-base text-gray-500"
        >
          <Link to="https://wa.me/2347067276819">
          <Button className='h-full'>Hit me up</Button>
          </Link>
          <Link to="https://drive.google.com/file/d/1LM2XE0GTNVoaqvj8eFllRwUWOfUj9Yk4/view?usp=sharing">
          <Button variant="secondary" className="flex items-center justify-center gap-2"><span className="font-thaloria text-2xl"><strong>Résumé</strong></span></Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
