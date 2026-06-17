import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import ProximosIniciosSection from "@/components/ProximosIniciosSection";
import Footer from "@/components/Footer";
import DiscountBanner from "@/components/DiscountBanner";
import Navigation from "@/components/Navigation";
import CurriculumSection from "@/components/CurriculumSection";
import PrerequisitosJavaDesdeCero from "@/components/PrerequisitosJavaDesdeCero";
import AppShell from "@/components/app/AppShell";
import type { Course } from "@/lib/courses";

interface JavaDesdeCeroProps {
  course?: Course;
}

const JavaDesdeCero = ({ course }: JavaDesdeCeroProps = {}) => {
  return (
    <AppShell>
      <div className="min-h-screen bg-background">
        <DiscountBanner />
        <Navigation />
        <HeroSection
          description={course?.shortDescription}
          stripeUrl={course?.stripeUrl}
        />
        <CurriculumSection />
        <PrerequisitosJavaDesdeCero />
        <ProximosIniciosSection />
        <PricingSection />
        <Footer />
      </div>
    </AppShell>
  );
};

export default JavaDesdeCero;
