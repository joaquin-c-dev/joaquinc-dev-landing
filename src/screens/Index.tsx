import HomeHeroSection from "@/components/HomeHeroSection";
import CoursesSection from "@/components/CoursesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AppShell from "@/components/app/AppShell";
import type { Course } from "@/lib/course-types";
import type { NavCourse } from "@/contexts/CoursesNavContext";

interface IndexProps {
  courses: Course[];
  navCourses: NavCourse[];
  pathname: string;
}

const Index = ({ courses, navCourses, pathname }: IndexProps) => {
  return (
    <AppShell navCourses={navCourses} pathname={pathname}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HomeHeroSection />
        <CoursesSection courses={courses} />
        <WhyChooseUsSection />
        <Footer />
      </div>
    </AppShell>
  );
};

export default Index;
