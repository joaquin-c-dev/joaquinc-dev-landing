import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import DiscountBanner from "@/components/DiscountBanner";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DiscountBanner />
      <HeroSection />
      <PricingSection />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
