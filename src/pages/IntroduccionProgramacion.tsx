import Navigation from "@/components/Navigation";
import DiscountBannerIntroduccion from "@/components/DiscountBannerIntroduccion";
import Footer from "@/components/Footer";
import HeroSectionIntroduccion from "@/components/HeroSectionIntroduccion";
import CurriculumSectionIntroduccion from "@/components/CurriculumSectionIntroduccion";
import ProximosIniciosSectionIntroduccion from "@/components/ProximosIniciosSectionIntroduccion";
import PricingSectionIntroduccion from "@/components/PricingSectionIntroduccion";
import PrerequisitosIntroduccion from "@/components/PrerequisitosIntroduccion";
import { CountdownIntroduccionProvider } from "@/contexts/CountdownIntroduccionContext";

const IntroduccionProgramacion = () => {
  return (
    <CountdownIntroduccionProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <DiscountBannerIntroduccion />
        <Navigation />
        <HeroSectionIntroduccion />
        <CurriculumSectionIntroduccion />
        <PrerequisitosIntroduccion />
        <ProximosIniciosSectionIntroduccion />
        <PricingSectionIntroduccion />
        <Footer />
      </div>
    </CountdownIntroduccionProvider>
  );
};

export default IntroduccionProgramacion;
