import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import type {
  Course,
  CourseHeroData,
  CourseIconName,
  CoursePrerequisites,
  CurriculumModule,
} from "@/lib/course-types";
import {
  formatSectionDuration,
} from "@/lib/course-formatters";

function mapIcon(icon?: string): CourseIconName | undefined {
  return icon as CourseIconName | undefined;
}

function mapPrerequisiteCourseLink(
  link?: { label?: string; courseSlug?: string } | null,
): CoursePrerequisites["prerequisiteCourseLink"] {
  if (!link?.label?.trim() || !link?.courseSlug?.trim()) return undefined;
  return {
    label: link.label.trim(),
    courseSlug: link.courseSlug.trim(),
  };
}

function mapApiSectionsToView(
  sections: ApiCourseLandingResponse["sections"],
): CurriculumModule[] {
  if (!sections?.length) return [];
  return [...sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      icon: mapIcon(section.icon),
      title: section.title,
      hoursPerSection: section.hoursPerSection,
      duration: formatSectionDuration(section.hoursPerSection),
      specificTopics: section.specificTopics,
    }));
}

/** Convierte la respuesta de la API Java al modelo usado por los componentes React. */
export function mapApiCourseToView(api: ApiCourseLandingResponse): Course {
  const course: Course = {
    id: api.id,
    slug: api.slug,
    type: api.type,
    status: api.status,
    title: api.title,
    description: api.description,
    durationInHours: api.durationInHours,
    subtitle: api.subtitle,
    level: api.level,
    topicsUrl: api.topicsUrl,
    stripeUrl: api.stripeUrl,
    stripeCoupon: api.stripeCoupon,
    regularPrice: api.regularPrice,
    discountPrice: api.discountPrice,
    summarySections: api.summarySections,
    seo: api.seo,
    hero: {
      titleLine1: api.hero.titleLine1,
      titleHighlight: api.hero.titleHighlight,
      video: api.hero.video,
    },
    promo: api.promotion,
    prerequisites: api.prerequisites
      ? {
          ...api.prerequisites,
          prerequisiteCourseLink: mapPrerequisiteCourseLink(
            api.prerequisites.prerequisiteCourseLink,
          ),
        }
      : undefined,
  };

  const sections = mapApiSectionsToView(api.sections);
  if (sections.length > 0) {
    course.sections = sections;
  }

  return course;
}

export function mapApiCoursesToView(
  courses: ApiCourseLandingResponse[],
): Course[] {
  return courses
    .filter((course) => course.status === "ACTIVE")
    .map(mapApiCourseToView);
}

/** @deprecated Solo para migrar el mock legacy; usar ApiCourseLandingResponse en produccion. */
export interface LegacyMockCourse {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  level?: string;
  durationInHours: number;
  stripeUrl?: string;
  stripeCoupon?: string;
  regularPrice?: number;
  discountPrice?: number;
  summarySections?: string;
  seo: Course["seo"];
  hero: Course["hero"];
  promo?: Course["promo"];
  sections?: {
    icon?: string;
    title: string;
    hoursPerSection: number;
    specificTopics: string[];
  }[];
  prerequisites?: {
    items: string[];
    equipment: string[];
    prerequisiteCourseLink?: { label: string; path: string };
    noExperienceNote?: string;
  };
}

/** Convierte el mock legacy al formato ApiCourseLandingResponse. */
export function mapLegacyMockToApi(legacy: LegacyMockCourse): ApiCourseLandingResponse {
  return {
    id: legacy.slug,
    slug: legacy.slug,
    type: "COURSE",
    status: "ACTIVE",
    title: legacy.title,
    description: legacy.description,
    durationInHours: legacy.durationInHours,
    subtitle: legacy.subtitle,
    level: legacy.level,
    stripeUrl: legacy.stripeUrl,
    stripeCoupon: legacy.stripeCoupon,
    regularPrice: legacy.regularPrice,
    discountPrice: legacy.discountPrice,
    summarySections: legacy.summarySections,
    seo: legacy.seo,
    hero: {
      titleLine1: legacy.hero.titleLine1,
      titleHighlight: legacy.hero.titleHighlight,
      video: legacy.hero.video,
    },
    promotion: legacy.promo,
    prerequisites: legacy.prerequisites
      ? {
          ...legacy.prerequisites,
          prerequisiteCourseLink: legacy.prerequisites.prerequisiteCourseLink
            ? mapPrerequisiteCourseLink({
                label: legacy.prerequisites.prerequisiteCourseLink.label,
                courseSlug:
                  legacy.prerequisites.prerequisiteCourseLink.path.replace(
                    /^\//,
                    "",
                  ),
              })
            : undefined,
        }
      : undefined,
    summarySections: legacy.summarySections,
    sections: legacy.sections?.map((section, index) => ({
      id: `${legacy.slug}-section-${index + 1}`,
      title: section.title,
      order: index + 1,
      hoursPerSection: section.hoursPerSection,
      specificTopics: section.specificTopics,
      icon: section.icon,
    })),
  };
}

export function mapLegacyMockToView(legacy: LegacyMockCourse): Course {
  return mapApiCourseToView(mapLegacyMockToApi(legacy));
}
