import Navigation from "@/components/Navigation";
import DiscountBannerIntroduccion from "@/components/DiscountBannerIntroduccion";
import Footer from "@/components/Footer";
import HeroSectionIntroduccion from "@/components/HeroSectionIntroduccion";
import CurriculumSectionIntroduccion from "@/components/CurriculumSectionIntroduccion";
import ProximosIniciosSectionIntroduccion from "@/components/ProximosIniciosSectionIntroduccion";
import PricingSectionIntroduccion from "@/components/PricingSectionIntroduccion";
import PrerequisitosIntroduccion from "@/components/PrerequisitosIntroduccion";
import AppShell from "@/components/app/AppShell";
import type { Course } from "@/lib/courses";

interface IntroduccionProgramacionProps {
  course?: Course;
}

const IntroduccionProgramacion = ({}: IntroduccionProgramacionProps = {}) => {
  return (
    <AppShell>
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
    </AppShell>
  );
};

export default IntroduccionProgramacion;
