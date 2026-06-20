/**
 * Contrato JSON alineado con las clases Java (CourseLandingResponse).
 * Es la forma en que la API del backend debe responder.
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

export interface ApiRecommendedModal {
  promoCodeLabel: string;
  conditions: string[];
  note: string;
}

export interface ApiCoursePricing {
  subtitle: string;
  fullPrice: number;
  discountPrice: number;
  stripeUrl: string;
  stripePromoUrl: string;
  whatsappCourseName: string;
  recommendedModal: ApiRecommendedModal;
}

export interface ApiPrerequisiteCourseLink {
  label: string;
  courseSlug: string;
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
  seo: ApiCourseSeo;
  hero: ApiCourseHero;
  promotion?: ApiCoursePromotion;
  prerequisites?: ApiCoursePrerequisites;
  pricing?: ApiCoursePricing;
  summarySections?: string;
  sections?: ApiCourseSection[];
}
