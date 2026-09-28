/**
 * Datos estructurados (schema.org, JSON-LD) de la página de un taller: la edición más
 * próxima como `Event` en línea, con el instructor como `Person`. Todo sale del curso y
 * de su agendado, así cada taller nuevo los tiene sin tocar código.
 */
import type { Course } from "@/lib/course-types";
import { INSTRUCTOR_PROFILE } from "@/lib/workshop-content";

/** Devuelve `undefined` si no hay fecha agendada: un `Event` sin `startDate` no es válido. */
export function buildWorkshopEventJsonLd(
  course: Course,
  pageUrl: string,
  siteUrl: string,
): Record<string, unknown> | undefined {
  // `schedules.items` ya viene ordenado por fecha: el primero es el más próximo.
  const nextSchedule = course.schedules?.items[0];
  if (!nextSchedule?.startsAt || !nextSchedule.endsAt) return undefined;

  // Misma regla de precio que WorkshopPage: el precio con descuento si es menor.
  const hasDiscount =
    course.discountPrice != null &&
    course.regularPrice != null &&
    course.discountPrice < course.regularPrice;
  const price = hasDiscount ? course.discountPrice : course.regularPrice;

  const instructor = {
    "@type": "Person",
    name: INSTRUCTOR_PROFILE.name,
    url: siteUrl,
    sameAs: [INSTRUCTOR_PROFILE.linkedinUrl],
  };

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: course.title,
    description: course.seo.description,
    image: course.seo.ogImage ? [course.seo.ogImage] : undefined,
    inLanguage: "es-MX",
    startDate: nextSchedule.startsAt,
    endDate: nextSchedule.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: pageUrl },
    organizer: instructor,
    performer: instructor,
    offers:
      price != null
        ? {
            "@type": "Offer",
            price,
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
            url: pageUrl,
          }
        : undefined,
  };
}

/** JSON listo para `<script type="application/ld+json">`; escapa `<` para no cerrar el script. */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
