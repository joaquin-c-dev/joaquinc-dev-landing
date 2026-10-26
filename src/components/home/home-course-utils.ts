import type { Course } from "@/lib/course-types";
import { formatWorkshopDay } from "@/lib/workshop-format";

/** El precio con descuento si es menor, igual que en las páginas de cada curso. */
export const currentPrice = (course: Course) =>
  course.discountPrice != null &&
  course.regularPrice != null &&
  course.discountPrice < course.regularPrice
    ? course.discountPrice
    : course.regularPrice;

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "Sábado 7 de noviembre", o `undefined` si el curso no trae fecha de inicio. */
export const formatNextStart = (course?: Course) => {
  const startsAt = course?.schedules?.items[0]?.startsAt;
  return startsAt ? capitalize(formatWorkshopDay(startsAt)) : undefined;
};

export const courseKindLabel = (course: Course) => (course.type === "WORKSHOP" ? "Taller" : "Curso");

/** Partes de la fecha para el bloque de calendario: { weekday: "sáb", day: "14", month: "nov" } (CDMX). */
export const startDateParts = (startsAt: string) => {
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Date(startsAt).toLocaleDateString("es-MX", { ...options, timeZone: "America/Mexico_City" }).replace(".", "");
  return { weekday: part({ weekday: "short" }), day: part({ day: "numeric" }), month: part({ month: "short" }) };
};
