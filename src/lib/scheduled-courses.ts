/**
 * Capa de datos de proximos inicios (ScheduledCourse).
 * En produccion: fetch a GET /api/courses/{courseId}/scheduled-courses
 */
import type { ApiCourseSchedulesResponse } from "@/lib/api-scheduled-courses-types";
import type { Course } from "@/lib/course-types";
import {
  formatDateRange,
  formatDurationHours,
  formatModalityLabel,
  formatTimeScheduleLabel,
  formatWeekDuration,
} from "@/lib/course-formatters";
import MOCK_COURSE_SCHEDULES from "@/lib/mock-scheduled-courses";

/** Cambiar a false cuando la API de scheduled courses este disponible. */
const USE_LEGACY_MOCK = true;

export type { ApiCourseSchedulesResponse } from "@/lib/api-scheduled-courses-types";

async function fetchCourseSchedulesFromApi(
  courseId: string,
): Promise<ApiCourseSchedulesResponse | null> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  // TODO: return fetch(`${API_URL}/courses/${courseId}/scheduled-courses`).then(r => r.json());
  return MOCK_COURSE_SCHEDULES[courseId] ?? null;
}

export function mapApiSchedulesToView(
  response: ApiCourseSchedulesResponse,
  durationInHours: number,
): NonNullable<Course["schedules"]> | undefined {
  if (!response.scheduledCourses.length) return undefined;

  return {
    subtitle: response.subtitle,
    fullHeight: response.fullHeight,
    items: response.scheduledCourses.map((scheduled) => ({
      id: scheduled.id,
      modality: formatModalityLabel(scheduled.courseModality),
      schedule: formatTimeScheduleLabel(
        scheduled.courseModality,
        scheduled.timeSchedule,
      ),
      hours: `${formatDurationHours(durationInHours)} totales`,
      dateRange: formatDateRange(scheduled.startDate, scheduled.endDate),
      duration: formatWeekDuration(scheduled.startDate, scheduled.endDate),
      note: scheduled.note,
    })),
  };
}

export async function getCourseSchedules(
  courseId: string,
  durationInHours: number,
): Promise<NonNullable<Course["schedules"]> | undefined> {
  const response = USE_LEGACY_MOCK
    ? MOCK_COURSE_SCHEDULES[courseId] ?? null
    : await fetchCourseSchedulesFromApi(courseId);

  if (!response) return undefined;
  return mapApiSchedulesToView(response, durationInHours);
}
