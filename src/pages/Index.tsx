import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import ProximosIniciosSection from "@/components/ProximosIniciosSection";
import Footer from "@/components/Footer";
import DiscountBanner from "@/components/DiscountBanner";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Navigation />
      <HeroSection />
      <ProximosIniciosSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
