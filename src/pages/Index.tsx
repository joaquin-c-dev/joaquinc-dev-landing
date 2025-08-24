import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CurriculumSection from "@/components/CurriculumSection";
import InstructorSection from "@/components/InstructorSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <CurriculumSection />
      <InstructorSection />
      <CTASection />
    </div>
  );
};

export default Index;
