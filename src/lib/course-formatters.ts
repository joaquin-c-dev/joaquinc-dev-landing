import type { CourseModality, TimeSchedule } from "@/lib/api-course-types";

const MODALITY_LABELS: Record<CourseModality, string> = {
  SATURDAY: "Modalidad Sabatina",
  MONDAY_TO_THURSDAY: "Modalidad Lun–Jue",
};

const TIME_SCHEDULE_LABELS: Record<TimeSchedule, string> = {
  FROM_9AM_TO_2PM: "9:00 AM - 2:00 PM",
  FROM_8PM_TO_10PM: "8:00 PM - 10:00 PM",
};

const MODALITY_DAY_PREFIX: Record<CourseModality, string> = {
  SATURDAY: "Sábados",
  MONDAY_TO_THURSDAY: "Lunes a Jueves",
};

export function formatDurationHours(hours: number): string {
  if (hours === 1) return "1 hora";
  return `${hours} horas`;
}

export function formatModalityLabel(modality: CourseModality): string {
  return MODALITY_LABELS[modality];
}

export function formatTimeScheduleLabel(
  modality: CourseModality,
  schedule: TimeSchedule,
): string {
  return `${MODALITY_DAY_PREFIX[modality]} ${TIME_SCHEDULE_LABELS[schedule]}`;
}

export function formatSectionDuration(hoursPerSection: number): string {
  return `${hoursPerSection} hrs`;
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const yearOpts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const startStr = start.toLocaleDateString("es-MX", opts);
  const endStr = end.toLocaleDateString("es-MX", yearOpts);
  return `${startStr} - ${endStr}`;
}

export function formatWeekDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const ms = end.getTime() - start.getTime();
  const weeks = Math.max(1, Math.round(ms / (7 * 24 * 60 * 60 * 1000)));
  return weeks === 1 ? "1 semana de duración" : `${weeks} semanas de duración`;
}
