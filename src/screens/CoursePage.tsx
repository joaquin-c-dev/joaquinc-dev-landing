import AppShell from "@/components/app/AppShell";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseDiscountBanner from "@/components/course/CourseDiscountBanner";
import CourseHero from "@/components/course/CourseHero";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import CoursePrerequisites from "@/components/course/CoursePrerequisites";
import CourseSchedules from "@/components/course/CourseSchedules";
import CoursePricing from "@/components/course/CoursePricing";
import WorkshopPage from "@/components/workshop/WorkshopPage";
import WorkshopTestimonials from "@/components/workshop/WorkshopTestimonials";
import { getCourseTestimonials } from "@/lib/workshop-content";
import { PromoCountdownProvider } from "@/contexts/PromoCountdownContext";
import type { Course } from "@/lib/course-types";
import type { NavCourse } from "@/contexts/CoursesNavContext";

interface CoursePageProps {
  course: Course;
  navCourses: NavCourse[];
  pathname: string;
}

const CoursePage = ({ course, navCourses, pathname }: CoursePageProps) => {
  if (course.type === "WORKSHOP") {
    return <WorkshopPage course={course} navCourses={navCourses} pathname={pathname} />;
  }

  return (
    <AppShell navCourses={navCourses} pathname={pathname}>
      <PromoCountdownProvider endsAt={course.promo?.endsAt}>
        <div className="min-h-screen bg-background">
          {course.promo && <CourseDiscountBanner promo={course.promo} />}
          <Navigation />
          <CourseHero
            hero={course.hero}
            subtitle={course.subtitle}
            description={course.description}
            stripeUrl={course.stripeUrl}
            stripeCoupon={course.stripeCoupon}
            clientReferenceId={course.nearestScheduledCourseId}
          />
          {course.sections && (
            <CourseCurriculum
              sections={course.sections}
              summarySections={course.summarySections}
            />
          )}
          {course.prerequisites && (
            <CoursePrerequisites prerequisites={course.prerequisites} />
          )}
          {course.schedules && (
            <CourseSchedules schedules={course.schedules} />
          )}
          <WorkshopTestimonials
            variant="site"
            testimonials={getCourseTestimonials(course.slug)}
          />
          {course.regularPrice != null && course.discountPrice != null && (
            <CoursePricing
              title={course.title}
              regularPrice={course.regularPrice}
              discountPrice={course.discountPrice}
              stripeUrl={course.stripeUrl}
              stripeCoupon={course.stripeCoupon}
              clientReferenceId={course.nearestScheduledCourseId}
            />
          )}
          <Footer />
        </div>
      </PromoCountdownProvider>
    </AppShell>
  );
};

export default CoursePage;
