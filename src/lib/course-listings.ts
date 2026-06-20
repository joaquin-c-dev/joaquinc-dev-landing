import type { CourseIconName } from "@/lib/course-types";

/** Presentacion de tarjetas en el home (hardcodeada; no viene de la API). */
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
};

export function getHomeCourseListing(
  slug: string,
): HomeCourseListing | undefined {
  return HOME_COURSE_LISTINGS[slug];
}

export function isCourseVisibleOnHome(slug: string): boolean {
  const listing = HOME_COURSE_LISTINGS[slug];
  return listing != null && listing.showOnHome !== false;
}
