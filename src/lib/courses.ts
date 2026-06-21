/**
 * Capa de datos de cursos.
 * Flujo: ApiCourseLandingResponse -> mapApiCoursesToView -> Course (vista React).
 */
import type { Course, NavCourse } from "@/lib/course-types";
import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import { mapApiCoursesToView, mapApiCourseToView } from "@/lib/course-mapper";
import MOCK_API_COURSES from "@/lib/mock-courses";
import { isCourseVisibleOnHome } from "@/lib/course-listings";
import { getCourseSchedules } from "@/lib/scheduled-courses";

/** Cambiar a false cuando la API Java este disponible. */
const USE_MOCK_API = true;

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

async function fetchCoursesFromApi(): Promise<ApiCourseLandingResponse[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  // TODO: return fetch(`${API_URL}/courses`).then((r) => r.json());
  return MOCK_API_COURSES;
}

/** Respuesta cruda de la API (o mock con la misma forma). */
export async function fetchApiCourses(): Promise<ApiCourseLandingResponse[]> {
  if (USE_MOCK_API) {
    return MOCK_API_COURSES;
  }
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

  const schedules = await getCourseSchedules(course.slug, course.durationInHours);
  return schedules ? { ...course, schedules } : course;
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
