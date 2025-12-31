import HomeHeroSection from "@/components/HomeHeroSection";
import CoursesSection from "@/components/CoursesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HomeHeroSection />
      <CoursesSection />
      <WhyChooseUsSection />
      <Footer />
    </div>
  );
};

export default Index;
