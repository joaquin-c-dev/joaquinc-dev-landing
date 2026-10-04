/**
 * Datos estructurados (schema.org, JSON-LD) del sitio: organización y sitio en el home,
 * perfil del instructor en "Acerca de mí" y `Course` en cada curso. Ayudan a Google y a
 * los asistentes de IA a entender qué se ofrece y quién lo imparte. Los talleres usan
 * `Event` (ver `workshop-structured-data.ts`).
 */
import { ASSETS } from "@/lib/assets";
import type { Course } from "@/lib/course-types";

type JsonLd = Record<string, unknown>;

const BRAND = "Joaquín C. Dev";

const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/joaquincr/",
  "https://instagram.com/joaquinc.dev",
  "https://www.facebook.com/profile.php?id=61579829160975",
];

/** El instructor, con `@id` para referenciarlo desde las demás piezas. */
export function buildInstructor(siteUrl: string): JsonLd {
  return {
    "@type": "Person",
    "@id": `${siteUrl}#joaquin-coronado`,
    name: "Joaquín Coronado Ramírez",
    alternateName: "Joaquín Coronado",
    jobTitle: "Head of Backend",
    url: new URL("/acerca-de-mi", siteUrl).href,
    image: new URL(ASSETS.joaquinProfile, siteUrl).href,
    sameAs: SOCIAL_PROFILES,
    knowsAbout: ["Java", "Spring Boot", "Spring Security", "APIs REST", "Desarrollo backend"],
  };
}

function buildOrganization(siteUrl: string): JsonLd {
  return {
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}#organizacion`,
    name: BRAND,
    url: siteUrl,
    logo: new URL("/favicon.png", siteUrl).href,
    sameAs: SOCIAL_PROFILES,
    founder: { "@id": `${siteUrl}#joaquin-coronado` },
  };
}

/** Home: organización, sitio e instructor. */
export function buildHomeJsonLd(siteUrl: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization(siteUrl),
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#sitio`,
        name: BRAND,
        url: siteUrl,
        inLanguage: "es-MX",
        publisher: { "@id": `${siteUrl}#organizacion` },
      },
      buildInstructor(siteUrl),
    ],
  };
}

/** "Acerca de mí": página de perfil del instructor. */
export function buildProfileJsonLd(pageUrl: string, siteUrl: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: pageUrl,
    inLanguage: "es-MX",
    mainEntity: buildInstructor(siteUrl),
  };
}

/** Precio vigente: el de descuento si es menor, igual que en las páginas. */
const currentPrice = (course: Course) =>
  course.discountPrice != null &&
  course.regularPrice != null &&
  course.discountPrice < course.regularPrice
    ? course.discountPrice
    : course.regularPrice;

/**
 * `Course` de un curso regular: siempre online y en vivo; cada grupo agendado futuro es
 * un `CourseInstance` con sus fechas. Sin grupos, queda una instancia genérica online.
 */
export function buildCourseJsonLd(course: Course, pageUrl: string, siteUrl: string): JsonLd {
  const price = currentPrice(course);
  const instructor = { "@id": `${siteUrl}#joaquin-coronado` };
  const workload = course.durationInHours > 0 ? `PT${course.durationInHours}H` : undefined;
  const scheduled = (course.schedules?.items ?? []).filter((item) => item.startsAt);
  const instances = scheduled.length
    ? scheduled.map((item) => ({
        "@type": "CourseInstance",
        courseMode: "Online",
        startDate: item.startsAt,
        endDate: item.endsAt,
        courseWorkload: workload,
        instructor,
      }))
    : [{ "@type": "CourseInstance", courseMode: "Online", courseWorkload: workload, instructor }];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: course.title,
        description: course.seo.description || course.description,
        url: pageUrl,
        image: course.seo.ogImage,
        inLanguage: "es-MX",
        provider: buildOrganization(siteUrl),
        offers:
          price != null
            ? {
                "@type": "Offer",
                category: "Paid",
                price,
                priceCurrency: "MXN",
                availability: "https://schema.org/InStock",
                url: pageUrl,
              }
            : undefined,
        hasCourseInstance: instances,
      },
      buildInstructor(siteUrl),
    ],
  };
}
