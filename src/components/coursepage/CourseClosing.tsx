import type { Course, ScheduleItem } from "@/lib/course-types";
import type { NavCourse } from "@/contexts/CoursesNavContext";
import { CoursesNavProvider } from "@/contexts/CoursesNavContext";
import Footer from "@/components/Footer";
import { getCurrentPrice } from "@/components/checkout/CheckoutContext";
import { getCourseQuestionUrl } from "@/lib/course-whatsapp";
import CourseFaq from "./CourseFaq";
import CourseFinalCta from "./CourseFinalCta";
import CourseStickyBar from "./CourseStickyBar";

interface CourseClosingProps {
  course: Course;
  nextGroup?: ScheduleItem;
  navCourses: NavCourse[];
}

/** Parte de abajo de la página de curso (preguntas, cierre, footer y barra del celular), sin hidratar. */
const CourseClosing = ({ course, nextGroup, navCourses }: CourseClosingProps) => (
  <>
    <CourseFaq prerequisites={course.prerequisites} questionUrl={getCourseQuestionUrl(course.title)} />
    <CourseFinalCta slug={course.slug} title={course.title} nextGroup={nextGroup} />
    <CoursesNavProvider courses={navCourses}>
      <Footer />
    </CoursesNavProvider>
    <CourseStickyBar slug={course.slug} price={getCurrentPrice(course)} />
  </>
);

export default CourseClosing;
