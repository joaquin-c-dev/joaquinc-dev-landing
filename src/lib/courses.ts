/**
 * Capa de datos de cursos.
 * Cambiar `fetchCoursesFromApi` para conectar la API real sin tocar paginas ni componentes.
 */
import type { Course } from "@/lib/course-types";
import MOCK_COURSES from "@/lib/mock-courses";

export type {
  Course,
  CourseHeroData,
  CourseIconName,
  CourseLayout,
  CourseListing,
  CoursePricing,
  CoursePromo,
  CoursePrerequisites,
  CourseSeo,
  CurriculumModule,
  ScheduleItem,
  WorkshopData,
} from "@/lib/course-types";

async function fetchCoursesFromApi(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return MOCK_COURSES;
}

export async function getAllCourses(): Promise<Course[]> {
  return fetchCoursesFromApi();
}

export async function getCourseBySlug(
  slug: string | undefined,
): Promise<Course | null> {
  if (!slug) return null;
  const courses = await fetchCoursesFromApi();
  return courses.find((course) => course.slug === slug) ?? null;
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await fetchCoursesFromApi();
  return courses.map((course) => course.slug);
}

/** Cursos visibles en el home y navegacion. */
export async function getHomeCourses(): Promise<Course[]> {
  const courses = await fetchCoursesFromApi();
  return courses.filter((c) => c.listing?.showOnHome !== false);
}

/** Datos minimos para el menu de navegacion. */
export async function getNavCourses(): Promise<
  { slug: string; name: string }[]
> {
  const courses = await fetchCoursesFromApi();
  return courses.map((c) => ({ slug: c.slug, name: c.name }));
}
