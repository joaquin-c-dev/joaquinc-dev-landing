/**
 * Capa de datos de cursos.
 * Flujo: ApiCourseLandingResponse -> mapApiCoursesToView -> Course (vista React).
 */
import type { Course, NavCourse } from "@/lib/course-types";
import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import { mapApiCoursesToView, mapApiCourseToView } from "@/lib/course-mapper";
import { fetchCoursesFromApi } from "@/lib/course-api";
import { isCourseVisibleOnHome } from "@/lib/course-listings";
import { getCourseSchedules } from "@/lib/scheduled-courses";

export type {
  Course,
  CourseHeroData,
  CourseIconName,
  CoursePromo,
  CoursePrerequisites,
  CourseSeo,
  CurriculumModule,
  NavCourse,
  ScheduleItem,
  CourseType,
  CourseStatus,
} from "@/lib/course-types";

export type {
  ApiCourseLandingResponse,
  ApiCourseSection,
  ApiCoursePrerequisites,
  ApiCoursePromotion,
  ApiCourseHero,
  ApiCourseSeo,
  ApiPrerequisiteCourseLink,
} from "@/lib/api-course-types";

export { mapApiCourseToView, mapApiCoursesToView } from "@/lib/course-mapper";

/** Respuesta cruda de GET /course/v1/course/query. */
export async function fetchApiCourses(): Promise<ApiCourseLandingResponse[]> {
  return fetchCoursesFromApi();
}

export async function getAllCourses(): Promise<Course[]> {
  return mapApiCoursesToView(await fetchApiCourses());
}

export async function getCourseBySlug(
  slug: string | undefined,
): Promise<Course | null> {
  if (!slug) return null;
  const courses = await getAllCourses();
  const course = courses.find((c) => c.slug === slug);
  if (!course) return null;

  const schedules = await getCourseSchedules(course.id, {
    durationInHours: course.durationInHours,
    subtitle: course.subtitle,
    slug: course.slug,
  });
  if (!schedules) return course;

  const nearestScheduledCourseId = schedules.items[0]?.id;
  return {
    ...course,
    schedules,
    nearestScheduledCourseId,
  };
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await getAllCourses();
  return courses.map((course) => course.slug);
}

export async function getHomeCourses(): Promise<Course[]> {
  const courses = await getAllCourses();
  return courses.filter((c) => isCourseVisibleOnHome(c.slug));
}

export async function getNavCourses(): Promise<NavCourse[]> {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug, name: c.title }));
}
