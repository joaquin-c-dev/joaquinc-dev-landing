/**
 * Capa de datos de cursos.
 * Flujo: ApiCourseLandingResponse -> mapApiCoursesToView -> Course (vista React).
 */
import type { Course, NavCourse, ScheduleItem } from "@/lib/course-types";
import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import { mapApiCoursesToView, mapApiCourseToView } from "@/lib/course-mapper";
import { fetchCoursesFromApi } from "@/lib/course-api";
import { selectHomeCourses } from "@/lib/course-listings";
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

  const nearestScheduledCourseId = pickNextSchedule(schedules.items)?.id;
  return {
    ...course,
    schedules,
    nearestScheduledCourseId,
  };
}

/**
 * Grupo al que se vende hoy: el primero que todavía no empieza. Si todos ya empezaron,
 * el más reciente (no el más viejo). Antes se tomaba el primero de la lista y, mientras
 * el grupo anterior siguiera en SCHEDULED/ACTIVE, las compras caían en ese grupo viejo.
 */
export function pickNextSchedule<T extends ScheduleItem>(items: T[], now = Date.now()): T | undefined {
  const upcoming = items.find(
    (item) => item.startsAt && new Date(item.startsAt).getTime() > now,
  );
  return upcoming ?? items[items.length - 1];
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await getAllCourses();
  return courses.map((course) => course.slug);
}

/**
 * "Próximos inicios" del home: cursos y talleres con un grupo que todavía no empieza,
 * cada uno con sus grupos futuros, ordenados por la fecha de inicio más cercana.
 */
export async function getUpcomingStarts(): Promise<Course[]> {
  const now = Date.now();
  const courses = await getAllCourses();
  const upcoming = await Promise.all(
    courses.map(async (course): Promise<Course | null> => {
      const schedules = await getCourseSchedules(course.id, {
        durationInHours: course.durationInHours,
        subtitle: course.subtitle,
        slug: course.slug,
      });
      const items = (schedules?.items ?? []).filter(
        (item) => item.startsAt && new Date(item.startsAt).getTime() > now,
      );
      if (!schedules || !items.length) return null;
      return {
        ...course,
        schedules: { ...schedules, items },
        nearestScheduledCourseId: items[0].id,
      };
    }),
  );
  const startOf = (course: Course) =>
    new Date(course.schedules?.items[0]?.startsAt ?? 0).getTime();
  return upcoming
    .filter((course): course is Course => course != null)
    .sort((a, b) => startOf(a) - startOf(b));
}

export async function getHomeCourses(): Promise<Course[]> {
  const courses = await getAllCourses();
  return selectHomeCourses(courses);
}

export async function getNavCourses(): Promise<NavCourse[]> {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug, name: c.title }));
}
