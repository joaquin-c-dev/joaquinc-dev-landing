import HeroSection from "@/components/HeroSection";
import CurriculumSection from "@/components/CurriculumSection";
import PricingSection from "@/components/PricingSection";
import InstructorSection from "@/components/InstructorSection";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyBanner from "@/components/StickyBanner";
import DiscountBanner from "@/components/DiscountBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <StickyBanner />
      <HeroSection />
      <PricingSection />
      <CurriculumSection />
      <InstructorSection />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
