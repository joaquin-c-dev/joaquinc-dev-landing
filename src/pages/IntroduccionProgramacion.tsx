import Navigation from "@/components/Navigation";
import DiscountBannerIntroduccion from "@/components/DiscountBannerIntroduccion";
import Footer from "@/components/Footer";
import HeroSectionIntroduccion from "@/components/HeroSectionIntroduccion";
import CurriculumSectionIntroduccion from "@/components/CurriculumSectionIntroduccion";
import ProximosIniciosSectionIntroduccion from "@/components/ProximosIniciosSectionIntroduccion";
import PricingSectionIntroduccion from "@/components/PricingSectionIntroduccion";

const IntroduccionProgramacion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <DiscountBannerIntroduccion />
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