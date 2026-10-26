import type { Course, ScheduleItem } from "@/lib/course-types";
import { getCourseTestimonials } from "@/lib/workshop-content";
import HomeClasses from "@/components/home/HomeClasses";
import HomeInstructor from "@/components/home/HomeInstructor";
import HomeReviews from "@/components/home/HomeReviews";
import CourseHero from "./CourseHero";
import CourseFacts from "./CourseFacts";
import CourseSyllabus from "./CourseSyllabus";
import CourseGroups from "./CourseGroups";
import CourseRequirements from "./CourseRequirements";
import { getCourseNotifyUrl } from "@/lib/course-whatsapp";

interface CourseContentProps {
  course: Course;
  /** Grupos que no han empezado, del más cercano al más lejano. */
  groups: ScheduleItem[];
}

/** Promedio de estrellas (calificación 0–10 / 2) de las reseñas que se muestran. */
export const averageRating = (slug: string) => {
  const testimonials = getCourseTestimonials(slug);
  return testimonials.length
    ? testimonials.reduce((sum, testimonial) => sum + testimonial.nps / 2, 0) / testimonials.length
    : 0;
};

/**
 * Parte de arriba de la página de curso (hasta reseñas), como HTML sin hidratar. La tarjeta de
 * precio es una isla aparte en `[slug].astro`, entre este bloque y `CourseClosing`.
 */
const CourseContent = ({ course, groups }: CourseContentProps) => {
  const testimonials = getCourseTestimonials(course.slug);
  const rating = averageRating(course.slug);
  const sections = course.sections ?? [];
  return (
    <>
      <CourseHero course={course} nextGroup={groups[0]} />
      <CourseFacts
        hours={course.durationInHours}
        modules={sections.length}
        schedule={groups[0]?.schedule}
        rating={rating}
      />
      {sections.length > 0 && (
        <CourseSyllabus sections={sections} hours={course.durationInHours} summary={course.summarySections} />
      )}
      <CourseGroups groups={groups} notifyUrl={getCourseNotifyUrl(course.title)} />
      {course.prerequisites && <CourseRequirements prerequisites={course.prerequisites} />}
      <HomeClasses />
      <HomeInstructor />
      <HomeReviews testimonials={testimonials} rating={rating} />
    </>
  );
};

export default CourseContent;
