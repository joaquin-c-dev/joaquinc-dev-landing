import type { Course, CourseIconName } from "@/lib/course-types";

/**
 * Presentación de las tarjetas del home (colores, ícono y puntos clave): no viene de la
 * API. Los cursos que salen en el home sí vienen de la API; si un curso nuevo no está
 * aquí, se muestra igual con el diseño por defecto (ver `getHomeCourseCard`).
 */
export interface HomeCourseListing {
  icon: CourseIconName;
  color: string;
  bgColor: string;
  borderColor: string;
  features: string[];
  featured?: boolean;
  showOnHome?: boolean;
}

const HOME_COURSE_LISTINGS: Record<string, HomeCourseListing> = {
  "java-intermedio": {
    icon: "rocket",
    color: "from-tech-purple to-pink-500",
    bgColor: "bg-tech-purple/10",
    borderColor: "border-tech-purple/20",
    features: ["Spring Boot", "APIs REST", "Spring Security"],
    showOnHome: true,
  },
  "introduccion-programacion": {
    icon: "book-open",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    features: [
      "Lógica de programación",
      "Primeros pasos en código",
      "Ejercicios prácticos",
    ],
    showOnHome: true,
  },
  "java-desde-cero": {
    icon: "code",
    color: "from-primary to-tech-cyan",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    features: ["POO completo", "Colecciones y Streams", "MongoDB"],
    featured: true,
    showOnHome: true,
  },
  "desarrollo-asistido-agentes-ai": {
    icon: "terminal",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    features: ["Claude Code y MCP", "Agentes en paralelo con Git", "Pruebas con Playwright"],
  },
  "arquitectura-agentica-ai": {
    icon: "boxes",
    color: "from-tech-cyan to-primary",
    bgColor: "bg-tech-cyan/10",
    borderColor: "border-tech-cyan/20",
    features: ["Workflows y agent loop", "Sistemas multi-agente", "Proyecto integrador real"],
  },
  "taller-spring-security-jwt": {
    icon: "shield",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    features: ["Spring Security y JWT", "Roles y permisos", "Proyecto práctico en un día"],
  },
};

/** Orden de la ruta de aprendizaje; los cursos que no estén aquí van al final. */
const HOME_COURSE_ORDER = [
  "introduccion-programacion",
  "java-desde-cero",
  "java-intermedio",
  "taller-spring-security-jwt",
  "desarrollo-asistido-agentes-ai",
  "arquitectura-agentica-ai",
];

const DEFAULT_LISTING: Omit<HomeCourseListing, "features"> = {
  icon: "code",
  color: "from-primary to-tech-purple",
  bgColor: "bg-primary/10",
  borderColor: "border-primary/20",
};

/** Diseño de la tarjeta; sin entrada propia, los puntos clave son los primeros módulos. */
export function getHomeCourseCard(course: Course): HomeCourseListing {
  const listing = HOME_COURSE_LISTINGS[course.slug];
  if (listing) return listing;
  const features = [...(course.sections ?? [])]
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map((section) => section.title);
  return { ...DEFAULT_LISTING, features };
}

/** Cursos y talleres que se muestran en el catálogo del home, en orden. */
export function selectHomeCourses(courses: Course[]): Course[] {
  const rank = (slug: string) => {
    const index = HOME_COURSE_ORDER.indexOf(slug);
    return index === -1 ? HOME_COURSE_ORDER.length : index;
  };
  return courses
    .filter((c) => HOME_COURSE_LISTINGS[c.slug]?.showOnHome !== false)
    .sort((a, b) => rank(a.slug) - rank(b.slug));
}
