import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import ProximosIniciosSection from "@/components/ProximosIniciosSection";
import Footer from "@/components/Footer";
import DiscountBanner from "@/components/DiscountBanner";
import Navigation from "@/components/Navigation";
import CurriculumSection from "@/components/CurriculumSection";

const JavaDesdeCero = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Navigation />
      <HeroSection />
      <CurriculumSection />
      <ProximosIniciosSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default JavaDesdeCero;
