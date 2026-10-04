import HomeHeroSection from "@/components/HomeHeroSection";
import CoursesSection from "@/components/CoursesSection";
import HomeUpcomingStartsSection from "@/components/HomeUpcomingStartsSection";
import WorkshopTestimonials from "@/components/workshop/WorkshopTestimonials";
import { getCourseTestimonials } from "@/lib/workshop-content";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AppShell from "@/components/app/AppShell";
import type { Course } from "@/lib/course-types";
import type { NavCourse } from "@/contexts/CoursesNavContext";

interface IndexProps {
  courses: Course[];
  /** Cursos y talleres con un grupo futuro, ordenados por fecha de inicio. */
  upcomingStarts: Course[];
  navCourses: NavCourse[];
  pathname: string;
}

const Index = ({ courses, upcomingStarts, navCourses, pathname }: IndexProps) => {
  return (
    <AppShell navCourses={navCourses} pathname={pathname}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HomeHeroSection />
        <HomeUpcomingStartsSection courses={upcomingStarts} />
        <CoursesSection courses={courses} />
        <WorkshopTestimonials variant="site" testimonials={getCourseTestimonials()} />
        <WhyChooseUsSection />
        <Footer />
      </div>
    </AppShell>
  );
};

export default Index;
