/**
 * Contrato JSON alineado con las clases Java (CourseLandingResponse).
 * Es la forma en que GET /api/courses y GET /api/courses/{slug} deben responder.
 */

export type CourseType = "COURSE";
export type CourseStatus = "ACTIVE" | "INACTIVE";
export type CourseModality = "SATURDAY" | "MONDAY_TO_THURSDAY";
export type TimeSchedule = "FROM_9AM_TO_2PM" | "FROM_8PM_TO_10PM";

export interface ApiCourseSection {
  id: string;
  title: string;
  order: number;
  hoursPerSection: number;
  specificTopics: string[];
  icon?: string;
}

export interface ApiScheduledCourse {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  courseModality: CourseModality;
  timeSchedule: TimeSchedule;
  note?: string;
  zoomMeetingId?: string;
}

export interface ApiCourseSeo {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ApiCourseVideo {
  src: string;
  poster: string;
}

export interface ApiCourseHero {
  titleLine1: string;
  titleHighlight?: string;
  video?: ApiCourseVideo;
}

export interface ApiCoursePromotion {
  endsAt: string;
  bannerDesktop: string;
  bannerMobile: string;
}

export interface ApiPrerequisiteCourseLink {
  label: string;
  /** Slug del curso recomendado (campo real de la API Java). */
  path: string;
  /** Alias legacy del mock local. */
  courseSlug?: string;
}

export interface ApiCoursePrerequisites {
  items: string[];
  equipment: string[];
  prerequisiteCourseLink?: ApiPrerequisiteCourseLink;
  noExperienceNote?: string;
}

/** Respuesta de GET /api/courses y GET /api/courses/{slug} */
export interface ApiCourseLandingResponse {
  id: string;
  slug: string;
  type: CourseType;
  status: CourseStatus;
  title: string;
  description: string;
  image?: string;
  durationInHours: number;
  subtitle?: string;
  level?: string;
  topicsUrl?: string;
  stripeUrl?: string;
  stripeCoupon?: string;
  regularPrice?: number;
  discountPrice?: number;
  seo: ApiCourseSeo;
  hero: ApiCourseHero;
  /** Alias usado por la API Java (`promo` en JSON). */
  promo?: ApiCoursePromotion;
  /** Forma legacy del mock local. */
  promotion?: ApiCoursePromotion;
  prerequisites?: ApiCoursePrerequisites;
  summarySections?: string;
  sections?: ApiCourseSection[];
}
