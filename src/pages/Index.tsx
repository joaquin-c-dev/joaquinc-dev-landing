import HeroSection from "@/components/HeroSection";
import ProximosIniciosSection from "@/components/ProximosIniciosSection";
import CTASection from "@/components/CTASection";
import DiscountBanner from "@/components/DiscountBanner";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Navigation />
      <HeroSection />
      <ProximosIniciosSection />
      <CTASection />
    </div>
  );
};

export default Index;
