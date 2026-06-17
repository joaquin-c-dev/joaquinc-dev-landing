/** Tipos compartidos del modelo de curso (contrato con la API). */

export interface CourseSeo {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

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

export interface CurriculumModule {
  icon?: CourseIconName;
  title: string;
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
  /** Ruta interna (ej. /temario) o scroll a sección con `#id`. */
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
  prerequisiteCourseLink?: { label: string; path: string };
  footerNote?: string;
  noExperienceNote?: string;
}

export interface ScheduleItem {
  modality: string;
  courseLabel: string;
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
  /** Si es false, no aparece en el home (ej. talleres ocultos). */
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
  slug: string;
  layout: CourseLayout;
  name: string;
  subtitle?: string;
  shortDescription?: string;
  level?: string;
  duration?: string;
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
