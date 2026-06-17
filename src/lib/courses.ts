/**
 * Capa de datos de cursos.
 *
 * Por ahora simula la API real con datos mock y un pequeño retraso, pero la
 * forma de la respuesta y las funciones (`getCourseBySlug` / `getAllCourses`)
 * estan pensadas para que conectar la API real solo implique cambiar la
 * implementacion interna de `fetchCoursesFromApi`, sin tocar las paginas.
 *
 * Como las paginas usan SSR (`output: 'server'`), estas funciones se ejecutan
 * en cada request: al apuntar a la API real, los cambios en los cursos se
 * reflejaran de inmediato sin necesidad de hacer deploy.
 */

export type CourseComponentKey =
  | "introduccion-programacion"
  | "java-desde-cero"
  | "java-intermedio"
  | "taller-poo";

export interface CourseSeo {
  /** Titulo para la pestaña / OG / Twitter. */
  title: string;
  /** Meta description. */
  description: string;
  /** Keywords separadas por coma. */
  keywords?: string;
  /** Imagen de preview (OG) propia del curso. URL absoluta (Cloudinary). */
  ogImage?: string;
}

export interface Course {
  /** Slug usado en la URL: /<slug>. */
  slug: string;
  /** Clave que mapea al arbol de componentes React de la pagina. */
  component: CourseComponentKey;
  /** Nombre corto del curso. */
  name: string;
  /** Subtitulo / claim. */
  subtitle?: string;
  /** Descripcion corta usada en listados. */
  shortDescription?: string;
  /** Nivel mostrado en tarjetas. */
  level?: string;
  /** Duracion estimada. */
  duration?: string;
  /** Precio mostrado (texto libre, ej. "$340.00 MXN"). */
  price?: string;
  /** Link de checkout de Stripe. */
  stripeUrl?: string;
  /** Fecha de fin de la promo (ISO) para countdowns por props. */
  promoEndsAt?: string;
  /** Metadata SEO/preview por curso. */
  seo: CourseSeo;
}

const OG_BASE =
  "https://res.cloudinary.com/joaquin-test/image/upload/w_1200,h_630,c_fill,f_auto,q_auto";

const COURSES: Course[] = [
  {
    slug: "introduccion-programacion",
    component: "introduccion-programacion",
    name: "Introducción a la Programación",
    subtitle: "Para principiantes absolutos",
    shortDescription:
      "Aprende los fundamentos de la programación desde cero. Ideal si nunca has escrito una línea de código.",
    level: "Principiante",
    duration: "30 horas",
    promoEndsAt: "2026-05-02T23:59:59-06:00",
    seo: {
      title: "Introducción a la Programación desde Cero | Joaquín C. Dev",
      description:
        "Curso en vivo de introducción a la programación para principiantes absolutos. Aprende lógica de programación y tus primeros pasos en código con acompañamiento en tiempo real.",
      keywords:
        "introducción a la programación, aprender a programar, programación desde cero, lógica de programación, curso para principiantes",
      ogImage: `${OG_BASE}/v1757136018/joaquin%20c.%20dev/java%20desde%20cero/Screenshot_at_Aug_26_23-53-12_vavqyx.png`,
    },
  },
  {
    slug: "java-desde-cero",
    component: "java-desde-cero",
    name: "Java desde Cero",
    subtitle: "Fundamentos hasta profesional",
    shortDescription:
      "Domina Java desde los fundamentos hasta nivel profesional. POO, colecciones, manejo de errores y más.",
    level: "Principiante a Intermedio",
    duration: "40 horas",
    stripeUrl:
      "https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO",
    promoEndsAt: "2026-01-17T23:59:59-06:00",
    seo: {
      title: "Curso de Java desde Cero en Vivo | Joaquín C. Dev",
      description:
        "Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional: POO, colecciones, Streams y MongoDB. Más de 9 años de experiencia backend guiándote en tiempo real.",
      keywords:
        "java, curso java, programación java, aprender java, java desde cero, desarrollo java, POO java",
      ogImage: `${OG_BASE}/v1757136018/joaquin%20c.%20dev/java%20desde%20cero/Screenshot_at_Aug_26_23-53-12_vavqyx.png`,
    },
  },
  {
    slug: "java-intermedio",
    component: "java-intermedio",
    name: "Java Intermedio",
    subtitle: "Spring Boot Profesional",
    shortDescription:
      "Lleva tus habilidades al siguiente nivel con Spring Boot, APIs REST, seguridad y arquitectura empresarial.",
    level: "Intermedio a Avanzado",
    duration: "40 horas",
    stripeUrl:
      "https://buy.stripe.com/6oU4gB1mm91hgjLavab3q05?prefilled_promo_code=INTERMEDIO&client_reference_id=69e4199d168fb564dd8e7a78",
    promoEndsAt: "2026-04-28T23:59:59-06:00",
    seo: {
      title: "Curso de Java Intermedio con Spring Boot | Joaquín C. Dev",
      description:
        "Curso de Java Intermedio en vivo: Spring Boot, APIs REST, Spring Security con JWT, Spring Data JPA, RabbitMQ, Docker y testing profesional con proyectos reales.",
      keywords:
        "java intermedio, spring boot, spring security, apis rest java, jwt spring, spring data jpa, docker java",
      ogImage: `${OG_BASE}/v1757136018/joaquin%20c.%20dev/java%20desde%20cero/Screenshot_at_Aug_26_23-53-12_vavqyx.png`,
    },
  },
  {
    slug: "taller-poo",
    component: "taller-poo",
    name: "Taller de POO",
    subtitle: "Programación Orientada a Objetos",
    shortDescription:
      "Domina los conceptos fundamentales de la POO y aprende a aplicarlos eficientemente en Java.",
    level: "Intermedio",
    duration: "Taller intensivo",
    price: "$340.00 MXN",
    stripeUrl: "https://buy.stripe.com/9B69AV1mmfpF8Rj32Ib3q03",
    seo: {
      title: "Taller de Programación Orientada a Objetos en Java | Joaquín C. Dev",
      description:
        "Taller intensivo de POO en Java: clases y objetos, herencia, polimorfismo, encapsulamiento y abstracción con ejercicios prácticos y proyecto final.",
      keywords:
        "taller poo, programación orientada a objetos, java poo, herencia polimorfismo, clases y objetos java",
      ogImage: `${OG_BASE}/v1757136018/joaquin%20c.%20dev/java%20desde%20cero/Screenshot_at_Aug_26_23-53-12_vavqyx.png`,
    },
  },
];

/**
 * Simula la llamada de red a la API real.
 * Reemplazar el cuerpo por un `fetch(import.meta.env.COURSES_API_URL)` cuando
 * la API este lista; el resto de la app no necesita cambios.
 */
async function fetchCoursesFromApi(): Promise<Course[]> {
  // Simula latencia de red para reflejar la interaccion real con la API.
  await new Promise((resolve) => setTimeout(resolve, 30));
  return COURSES;
}

/** Devuelve todos los cursos (para listados / sitemap). */
export async function getAllCourses(): Promise<Course[]> {
  return fetchCoursesFromApi();
}

/** Devuelve un curso por su slug, o `null` si no existe. */
export async function getCourseBySlug(
  slug: string | undefined,
): Promise<Course | null> {
  if (!slug) return null;
  const courses = await fetchCoursesFromApi();
  return courses.find((course) => course.slug === slug) ?? null;
}

/** Slugs disponibles (util para `getStaticPaths` o validaciones). */
export async function getCourseSlugs(): Promise<string[]> {
  const courses = await fetchCoursesFromApi();
  return courses.map((course) => course.slug);
}
