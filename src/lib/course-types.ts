/**
 * Modelo de vista usado por los componentes React.
 * Se construye desde ApiCourseLandingResponse via course-mapper.ts.
 */

export type CourseType = "COURSE";
export type CourseStatus = "ACTIVE" | "INACTIVE";

/** Id fijo del ancla de temario en todas las paginas de curso. */
export const COURSE_CURRICULUM_SECTION_ID = "curriculum";

/** Nombre de icono Lucide serializable desde la API. */
export type CourseIconName =
  | "book-open"
  | "code"
  | "code2"
  | "database"
  | "shield"
  | "cloud"
  | "boxes"
  | "settings"
  | "test-tube"
  | "zap"
  | "globe"
  | "terminal"
  | "type"
  | "calculator"
  | "git-branch"
  | "rotate-ccw"
  | "grid-3x3"
  | "layers"
  | "message-square"
  | "file-text"
  | "container"
  | "rocket";

export interface CourseSeo {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface CurriculumModule {
  icon?: CourseIconName;
  title: string;
  /** Horas de la seccion (CourseSection.hoursPerSection en Java). */
  hoursPerSection: number;
  /** Etiqueta formateada para UI (ej. "4 hrs"). */
  duration: string;
  specificTopics: string[];
}

export interface CourseHeroData {
  titleLine1: string;
  titleHighlight?: string;
  video?: { src: string; poster: string };
}

export interface CoursePromo {
  endsAt: string;
  bannerDesktop: string;
  bannerMobile: string;
}

export interface CoursePricing {
  subtitle: string;
  fullPrice: number;
  discountPrice: number;
  stripeUrl: string;
  stripePromoUrl: string;
  whatsappCourseName: string;
  recommendedModal: {
    promoCodeLabel: string;
    conditions: string[];
    note: string;
  };
}

export interface CoursePrerequisites {
  items: string[];
  equipment: string[];
  prerequisiteCourseLink?: { label: string; courseSlug: string };
  noExperienceNote?: string;
}

export interface ScheduleItem {
  id: string;
  modality: string;
  schedule: string;
  hours: string;
  dateRange: string;
  duration: string;
  note?: string;
}

export interface Course {
  id: string;
  slug: string;
  type: CourseType;
  status: CourseStatus;
  title: string;
  description: string;
  durationInHours: number;
  subtitle?: string;
  level?: string;
  topicsUrl?: string;
  stripeUrl?: string;
  stripeCoupon?: string;
  summarySections?: string;
  seo: CourseSeo;
  hero: CourseHeroData;
  promo?: CoursePromo;
  sections?: CurriculumModule[];
  prerequisites?: CoursePrerequisites;
  schedules?: {
    subtitle?: string;
    fullHeight?: boolean;
    items: ScheduleItem[];
  };
  pricing?: CoursePricing;
}
