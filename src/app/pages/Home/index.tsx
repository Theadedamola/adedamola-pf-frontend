import HeroSection from '@/app/sections/home/HeroSection';
import SelectedWorks from '@/app/sections/home/SelectedWorks';
import SkillsSection from '@/app/sections/home/SkillsSection';
import TestimonialSection from '@/app/sections/home/TestimonialSection';
import ContactSection from '@/app/sections/home/ContactSection';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <SelectedWorks />
      <SkillsSection />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
}
