import { motion } from 'framer-motion';
import { Input, TextArea } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import workWithMeImage from '@/assets/work-with-me.png';

export default function ContactSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Content & Form */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4 text-gray-900">
              Got a challenge? <br />
              Let's build something remarkable.
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              From concept to code, I'm ready to bring your vision to life.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input 
              placeholder="Your name" 
              name="name"
            />
            <Input 
              type="email" 
              placeholder="Email address" 
              name="email"
            />
            <TextArea 
              placeholder="Tell me about your project" 
              name="message"
              rows={4}
            />
            
            <div className="pt-4">
              <Button type="submit" variant="primary" className="rounded-full px-8">
                Send Message
              </Button>
            </div>
          </motion.form>
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
