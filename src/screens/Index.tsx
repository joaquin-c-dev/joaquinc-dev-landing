import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import HomeProofBar from "@/components/home/HomeProofBar";
import HomeUpcomingStarts from "@/components/home/HomeUpcomingStarts";
import HomeCourseCatalog from "@/components/home/HomeCourseCatalog";
import HomeClasses from "@/components/home/HomeClasses";
import HomeInstructor from "@/components/home/HomeInstructor";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import { CoursesNavProvider, type NavCourse } from "@/contexts/CoursesNavContext";
import { getCourseTestimonials } from "@/lib/workshop-content";
import type { Course } from "@/lib/course-types";

interface IndexProps {
  courses: Course[];
  /** Cursos y talleres con un grupo futuro, ordenados por fecha de inicio. */
  upcomingStarts: Course[];
  navCourses: NavCourse[];
}

/**
 * Contenido del home "claridad primero": qué es y cuándo empieza, pruebas, próximos inicios,
 * catálogo, cómo son las clases, quién enseña, reseñas, cierre y footer. Se renderiza en el
 * servidor como HTML sin hidratar (sin JavaScript de React): las animaciones son de CSS y
 * `scripts/home-reveal.ts`. El menú y el botón de WhatsApp son islas aparte en `index.astro`.
 */
const Index = ({ courses, upcomingStarts, navCourses }: IndexProps) => {
  const testimonials = getCourseTestimonials();
  const rating = testimonials.length
    ? testimonials.reduce((sum, testimonial) => sum + testimonial.nps / 2, 0) / testimonials.length
    : 0;
  const nextCourse = upcomingStarts[0];
  return (
    <>
      <main id="contenido">
        <HomeHero upcomingStarts={upcomingStarts} />
        <HomeProofBar rating={rating} reviewCount={testimonials.length} courseCount={courses.length} />
        <HomeUpcomingStarts upcomingStarts={upcomingStarts} />
        <HomeCourseCatalog courses={courses} upcomingStarts={upcomingStarts} />
        <HomeClasses />
        <HomeInstructor />
        <HomeReviews testimonials={testimonials} rating={rating} />
        <HomeFinalCta nextCourse={nextCourse} />
      </main>
      <CoursesNavProvider courses={navCourses}>
        <Footer />
      </CoursesNavProvider>
    </>
  );
};

export default Index;
