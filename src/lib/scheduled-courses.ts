/**
 * Capa de datos de proximos inicios (ScheduledCourse).
 * GET /scheduled/v1/scheduled/course/by-course/{courseId}
 */
import type {
  ApiCourseSchedulesResponse,
  ApiScheduledCourseItem,
} from "@/lib/api-scheduled-courses-types";
import type { Course } from "@/lib/course-types";
import {
  formatDateRange,
  formatDurationHours,
  formatClassCount,
  formatModalityLabel,
  formatTimeScheduleLabel,
} from "@/lib/course-formatters";
import { fetchScheduledCoursesByCourseId } from "@/lib/scheduled-course-api";
import MOCK_COURSE_SCHEDULES from "@/lib/mock-scheduled-courses";

/** Cambiar a true solo para desarrollo offline sin backend. */
const USE_LEGACY_MOCK = false;

const VISIBLE_SCHEDULE_STATUSES = new Set<ApiScheduledCourseItem["status"]>([
  "SCHEDULED",
  "ACTIVE",
]);

const FULL_HEIGHT_SCHEDULE_SLUGS = new Set([
  "introduccion-programacion",
  "java-intermedio",
]);

export type { ApiCourseSchedulesResponse } from "@/lib/api-scheduled-courses-types";

/** Hora de inicio y fin (24 h, hora de CDMX) de cada bloque horario. */
const TIME_SCHEDULE_HOURS: Record<
  ApiScheduledCourseItem["timeSchedule"],
  { start: number; end: number }
> = {
  FROM_9AM_TO_2PM: { start: 9, end: 14 },
  FROM_8PM_TO_10PM: { start: 20, end: 22 },
};

/** CDMX no tiene horario de verano desde 2022: siempre UTC-6. */
const CDMX_UTC_OFFSET = "-06:00";

/**
 * La API manda fechas sin zona ("2026-10-03T06:00:00"): 06:00 UTC es la medianoche de
 * CDMX, así que la parte de la fecha ya es el día correcto en México. Se combina con la
 * hora del bloque para obtener un instante exacto, sin depender de la zona del servidor.
 */
function toCdmxIso(apiDate: string, hour: number): string {
  const hh = String(hour).padStart(2, "0");
  return `${apiDate.slice(0, 10)}T${hh}:00:00${CDMX_UTC_OFFSET}`;
}

export interface CourseSchedulesOptions {
  durationInHours: number;
  subtitle?: string;
  slug?: string;
}

async function fetchCourseSchedulesFromApi(
  courseId: string,
): Promise<ApiScheduledCourseItem[]> {
  const items = await fetchScheduledCoursesByCourseId(courseId);
  return items
    .filter((item) => VISIBLE_SCHEDULE_STATUSES.has(item.status))
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
}

function mapApiItemsToView(
  scheduledCourses: ApiScheduledCourseItem[],
  options: CourseSchedulesOptions,
): NonNullable<Course["schedules"]> | undefined {
  if (!scheduledCourses.length) return undefined;

  const fullHeight =
    options.slug != null && FULL_HEIGHT_SCHEDULE_SLUGS.has(options.slug);

  return {
    subtitle: options.subtitle,
    fullHeight: fullHeight || undefined,
    items: scheduledCourses.map((scheduled) => ({
      id: scheduled.id,
      modality: formatModalityLabel(scheduled.courseModality),
      schedule: formatTimeScheduleLabel(
        scheduled.courseModality,
        scheduled.timeSchedule,
      ),
      hours: `${formatDurationHours(options.durationInHours)} totales`,
      dateRange: formatDateRange(scheduled.startDate, scheduled.endDate),
      duration: formatClassCount(
        options.durationInHours,
        scheduled.timeSchedule,
      ),
      note: scheduled.note,
      startsAt: toCdmxIso(
        scheduled.startDate,
        TIME_SCHEDULE_HOURS[scheduled.timeSchedule].start,
      ),
      endsAt: toCdmxIso(
        scheduled.endDate,
        TIME_SCHEDULE_HOURS[scheduled.timeSchedule].end,
      ),
    })),
  };
}

/** @deprecated Usar mapApiItemsToView; conservado para el mock legacy. */
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
      duration: formatClassCount(durationInHours, scheduled.timeSchedule),
      note: scheduled.note,
    })),
  };
}

export async function getCourseSchedules(
  courseId: string,
  options: CourseSchedulesOptions,
): Promise<NonNullable<Course["schedules"]> | undefined> {
  if (USE_LEGACY_MOCK) {
    const mock = MOCK_COURSE_SCHEDULES[options.slug ?? courseId] ?? null;
    if (!mock) return undefined;
    return mapApiSchedulesToView(mock, options.durationInHours);
  }

  try {
    const scheduledCourses = await fetchCourseSchedulesFromApi(courseId);
    return mapApiItemsToView(scheduledCourses, options);
  } catch (error) {
    console.error(
      `Failed to fetch scheduled courses for courseId=${courseId}`,
      error,
    );
    return undefined;
  }
}
