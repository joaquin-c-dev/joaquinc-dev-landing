import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CurriculumSection from "@/components/CurriculumSection";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyBanner from "@/components/StickyBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyBanner />
      <HeroSection />
      <FeaturesSection />
      <CurriculumSection />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
