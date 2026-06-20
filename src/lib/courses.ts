/**
 * Capa de datos de cursos.
 * En produccion: fetch a la API Java y mapear con mapApiCoursesToView.
 */
import type { Course } from "@/lib/course-types";
import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import {
  mapApiCoursesToView,
  mapApiCourseToView,
  mapLegacyMockToApi,
  mapLegacyMockToView,
  type LegacyMockCourse,
} from "@/lib/course-mapper";
import LEGACY_MOCK_COURSES from "@/lib/mock-courses";

/** Cambiar a false cuando la API Java este disponible. */
const USE_LEGACY_MOCK = true;

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
  CourseType,
  CourseStatus,
} from "@/lib/course-types";

export type { ApiCourseLandingResponse } from "@/lib/api-course-types";

async function fetchCoursesFromApi(): Promise<ApiCourseLandingResponse[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  // TODO: return fetch(`${API_URL}/courses`).then(r => r.json());
  return (LEGACY_MOCK_COURSES as LegacyMockCourse[]).map(mapLegacyMockToApi);
}

export async function getAllCourses(): Promise<Course[]> {
  if (USE_LEGACY_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return (LEGACY_MOCK_COURSES as LegacyMockCourse[]).map(mapLegacyMockToView);
  }
  const apiCourses = await fetchCoursesFromApi();
  return mapApiCoursesToView(apiCourses);
}

export async function getCourseBySlug(
  slug: string | undefined,
): Promise<Course | null> {
  if (!slug) return null;
  const courses = await getAllCourses();
  return courses.find((course) => course.slug === slug) ?? null;
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await getAllCourses();
  return courses.map((course) => course.slug);
}

export async function getHomeCourses(): Promise<Course[]> {
  const courses = await getAllCourses();
  return courses.filter((c) => c.listing?.showOnHome !== false);
}

export async function getNavCourses(): Promise<
  { slug: string; name: string }[]
> {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug, name: c.title }));
}
