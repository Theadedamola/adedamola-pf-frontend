import HeroSection from '@/app/sections/home/HeroSection';
import SelectedWorks from '@/app/sections/home/SelectedWorks';
import ExplorationsReel from '@/app/sections/home/ExplorationsReel';
import DevOrManaged from '@/app/sections/home/DevOrManaged';
import SkillsSection from '@/app/sections/home/SkillsSection';
import GithubActivitySection from '@/app/sections/home/GithubActivitySection';
import TestimonialSection from '@/app/sections/home/TestimonialSection';
import ContactSection from '@/app/sections/home/ContactSection';
import SEO from '@/components/common/SEO';

export default function Home() {
  return (
    <div className="w-full">
      <SEO />
      <HeroSection />
      <SelectedWorks />
      <ExplorationsReel />
      <DevOrManaged />
      <SkillsSection />
      <GithubActivitySection />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
}

