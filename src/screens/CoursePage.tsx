import AppShell from "@/components/app/AppShell";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseDiscountBanner from "@/components/course/CourseDiscountBanner";
import CourseHero from "@/components/course/CourseHero";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import CoursePrerequisites from "@/components/course/CoursePrerequisites";
import CourseSchedules from "@/components/course/CourseSchedules";
import CoursePricing from "@/components/course/CoursePricing";
import CourseWorkshop from "@/components/course/CourseWorkshop";
import { PromoCountdownProvider } from "@/contexts/PromoCountdownContext";
import type { Course } from "@/lib/course-types";
import type { NavCourse } from "@/contexts/CoursesNavContext";

interface CoursePageProps {
  course: Course;
  navCourses: NavCourse[];
  pathname: string;
}

const CoursePage = ({ course, navCourses, pathname }: CoursePageProps) => {
  return (
    <AppShell navCourses={navCourses} pathname={pathname}>
      <PromoCountdownProvider endsAt={course.promo?.endsAt}>
        {course.layout === "workshop" && course.workshop ? (
          <CourseWorkshop
            course={{ ...course, workshop: course.workshop }}
          />
        ) : (
          <div className="min-h-screen bg-background">
            {course.promo && <CourseDiscountBanner promo={course.promo} />}
            <Navigation />
            <CourseHero hero={course.hero} />
            {course.curriculum && (
              <CourseCurriculum curriculum={course.curriculum} />
            )}
            {course.prerequisites && (
              <CoursePrerequisites prerequisites={course.prerequisites} />
            )}
            {course.schedules && (
              <CourseSchedules schedules={course.schedules} />
            )}
            {course.pricing && <CoursePricing pricing={course.pricing} />}
            <Footer />
          </div>
        )}
      </PromoCountdownProvider>
    </AppShell>
  );
};

export default CoursePage;
