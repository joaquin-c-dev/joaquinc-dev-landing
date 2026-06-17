import HomeHeroSection from "@/components/HomeHeroSection";
import CoursesSection from "@/components/CoursesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AppShell from "@/components/app/AppShell";

const Index = () => {
  return (
    <AppShell>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HomeHeroSection />
        <CoursesSection />
        <WhyChooseUsSection />
        <Footer />
      </div>
    </AppShell>
  );
};

export default Index;
