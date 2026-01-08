import HeroSection from "@/app/sections/about/HeroSection";
import StorySection from "@/app/sections/about/StorySection";
import SpanishIntroSection from "@/app/sections/about/SpanishIntroSection";
import ResumeSection from "@/app/sections/about/ResumeSection";
import ValuesSection from "@/app/sections/about/ValuesSection";
import ExperienceSection from "@/app/sections/about/ExperienceSection";
import SEO from "@/components/common/SEO";

export default function About() {
  return (
    <div className="w-full">
      <SEO
        title="About | Adedamola"
        description="Learn more about Adedamola - a passionate frontend developer and designer dedicated to crafting digital experiences."
      />
      <HeroSection />
      <StorySection />
      <SpanishIntroSection />
      <ValuesSection />
      <ExperienceSection />
      <ResumeSection />
    </div>
  );
}
