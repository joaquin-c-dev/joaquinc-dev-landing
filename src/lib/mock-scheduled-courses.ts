import type { ApiCourseSchedulesResponse } from "@/lib/api-scheduled-courses-types";

/**
 * Mock legacy de proximos inicios (solo con USE_LEGACY_MOCK en scheduled-courses.ts).
 * Produccion: GET /scheduled/v1/scheduled/course/by-course/{courseId}
 */
export const MOCK_COURSE_SCHEDULES: Record<string, ApiCourseSchedulesResponse> = {
  "java-intermedio": {
    courseId: "java-intermedio",
    subtitle:
      "Elige la modalidad que mejor se adapte a tu horario y lleva tu carrera al siguiente nivel",
    fullHeight: true,
    scheduledCourses: [
      {
        id: "java-intermedio-schedule-1",
        startDate: "2026-04-25T09:00:00-06:00",
        endDate: "2026-06-27T14:00:00-06:00",
        courseModality: "SATURDAY",
        timeSchedule: "FROM_9AM_TO_2PM",
        status: "SCHEDULED",
        note: "⚠️ No hay clases: 2 Mayo y 30 Mayo",
      },
    ],
  },
  "introduccion-programacion": {
    courseId: "introduccion-programacion",
    subtitle:
      "Elige la modalidad que mejor se adapte a tu horario y comienza tu aprendizaje",
    fullHeight: true,
    scheduledCourses: [
      {
        id: "introduccion-programacion-schedule-1",
        startDate: "2026-05-02T09:00:00-06:00",
        endDate: "2026-06-06T14:00:00-06:00",
        courseModality: "SATURDAY",
        timeSchedule: "FROM_9AM_TO_2PM",
        status: "SCHEDULED",
      },
    ],
  },
  "java-desde-cero": {
    courseId: "java-desde-cero",
    subtitle:
      "Elige la modalidad que mejor se adapte a tu horario y comienza tu transformación profesional",
    scheduledCourses: [
      {
        id: "java-desde-cero-schedule-1",
        startDate: "2026-09-05T09:00:00-06:00",
        endDate: "2026-10-24T14:00:00-06:00",
        courseModality: "SATURDAY",
        timeSchedule: "FROM_9AM_TO_2PM",
        status: "SCHEDULED",
      },
    ],
  },
};

export default MOCK_COURSE_SCHEDULES;
