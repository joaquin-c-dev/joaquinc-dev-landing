import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import DiscountBanner from "@/components/DiscountBanner";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Navigation />
      <HeroSection />
      <PricingSection />
    </div>
  );
};

export default Index;
