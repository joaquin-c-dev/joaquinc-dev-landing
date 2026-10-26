/**
 * Lo que se ofrece al comprar, compartido por la tarjeta de precio de la página de curso y el
 * resumen de `/pagar/{curso}`, para que las dos digan exactamente lo mismo.
 */
import type { Course } from "@/lib/course-types";
import { formatDurationHours } from "@/lib/course-formatters";

/** Logo de la tecnología principal de cada curso. Sin entrada, el curso se muestra sin logo. */
const COURSE_LOGOS: Record<string, string> = {
  "java-desde-cero": "/images/logos/java.svg",
  "java-intermedio": "/images/logos/spring.svg",
  "desarrollo-asistido-agentes-ai": "/images/logos/claude.svg",
  "arquitectura-agentica-ai": "/images/logos/claude-mascot.svg",
  "taller-spring-security-jwt": "/images/logos/spring.svg",
};

export const getCourseLogo = (slug: string): string | undefined => COURSE_LOGOS[slug];

/** Los meses sin intereses que ofrece Stripe con tarjetas de crédito mexicanas (solo cursos). */
export const MAX_INSTALLMENTS = 12;

/** Qué incluye la compra: los talleres son de un día y se pagan en una sola exhibición. */
export function getCourseIncludes(course: Course): string[] {
  const hours = formatDurationHours(course.durationInHours);
  return course.type === "WORKSHOP"
    ? [`${hours} de taller en vivo`, "Proyecto práctico guiado paso a paso", "Resuelves tus dudas en vivo con el instructor"]
    : [
        `${hours} de clases en vivo por Zoom`,
        "Grabación de cada clase",
        "Grupo de WhatsApp para dudas entre clases",
        "Proyecto real para tu portafolio",
      ];
}
