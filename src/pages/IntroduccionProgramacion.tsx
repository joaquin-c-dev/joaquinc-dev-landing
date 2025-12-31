import Navigation from "@/components/Navigation";
import DiscountBanner from "@/components/DiscountBanner";
import Footer from "@/components/Footer";
import HeroSectionIntroduccion from "@/components/HeroSectionIntroduccion";
import CurriculumSectionIntroduccion from "@/components/CurriculumSectionIntroduccion";
import ProximosIniciosSectionIntroduccion from "@/components/ProximosIniciosSectionIntroduccion";
import PricingSectionIntroduccion from "@/components/PricingSectionIntroduccion";

const IntroduccionProgramacion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <DiscountBanner />
      <Navigation />
      <HeroSectionIntroduccion />
      <CurriculumSectionIntroduccion />
      <ProximosIniciosSectionIntroduccion />
      <PricingSectionIntroduccion />
      <Footer />
    </div>
  );
};

export default IntroduccionProgramacion;