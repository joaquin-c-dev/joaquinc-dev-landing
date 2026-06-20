/**
 * Modelo de vista usado por los componentes React.
 * Se construye desde ApiCourseLandingResponse via course-mapper.ts.
 */

export type CourseType = "COURSE" | "WORKSHOP";
export type CourseStatus = "ACTIVE" | "INACTIVE";
export type CourseLayout = "standard" | "workshop";

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
  keywords?: string;
  ogImage?: string;
}

export interface CurriculumModule {
  icon?: CourseIconName;
  title: string;
  /** Horas de la seccion (CourseSection.hoursPerSection en Java). */
  hoursPerSection: number;
  /** Etiqueta formateada para UI (ej. "4 hrs"). */
  duration: string;
  topics: string[];
}

export interface CourseHeroData {
  titleLine1: string;
  titleHighlight?: string;
  titleLine2?: string;
  description: string;
  layout?: "two-column" | "centered";
  video?: { src: string; poster: string };
  stripeUrl?: string;
  secondaryCta?: { label: string; href?: string; scrollTo?: string };
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
  intro?: string;
  items: string[];
  equipment: string[];
  equipmentNote?: string;
  prerequisiteCourseLink?: { label: string; courseSlug: string };
  footerNote?: string;
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

export interface CourseListing {
  icon: CourseIconName;
  color: string;
  bgColor: string;
  borderColor: string;
  features: string[];
  featured?: boolean;
  showOnHome?: boolean;
}

export interface WorkshopData {
  badge: string;
  features: string[];
  price: string;
  priceNote?: string;
  stripeUrl: string;
  paypalUrl?: string;
  meta: { label: string; value: string }[];
  scheduleBlocks: { title: string; description: string }[];
  requirements: string[];
}

export interface Course {
  id: string;
  slug: string;
  type: CourseType;
  status: CourseStatus;
  /** Derivado de type para el layout de componentes. */
  layout: CourseLayout;
  title: string;
  description: string;
  durationInHours: number;
  /** Etiqueta formateada para UI (ej. "40 horas"). */
  duration: string;
  subtitle?: string;
  level?: string;
  topicsUrl?: string;
  seo: CourseSeo;
  listing?: CourseListing;
  hero: CourseHeroData;
  promo?: CoursePromo;
  curriculum?: {
    sectionId?: string;
    summary?: string;
    modules: CurriculumModule[];
    methodology?: { title: string; description: string }[];
  };
  prerequisites?: CoursePrerequisites;
  schedules?: {
    subtitle?: string;
    fullHeight?: boolean;
    items: ScheduleItem[];
  };
  pricing?: CoursePricing;
  workshop?: WorkshopData;
}
