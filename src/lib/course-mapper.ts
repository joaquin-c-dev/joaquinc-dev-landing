import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import type {
  Course,
  CourseHeroData,
  CourseIconName,
  CurriculumModule,
} from "@/lib/course-types";
import {
  formatSectionDuration,
} from "@/lib/course-formatters";

function mapIcon(icon?: string): CourseIconName | undefined {
  return icon as CourseIconName | undefined;
}

function mapSectionsToModules(
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
      topics: section.specificTopics,
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
    seo: api.seo,
    listing: api.listing
      ? {
          ...api.listing,
          icon: mapIcon(api.listing.icon) ?? "code",
        }
      : undefined,
    hero: {
      titleLine1: api.hero.titleLine1,
      titleHighlight: api.hero.titleHighlight,
      video: api.hero.video,
    },
    promo: api.promotion,
    pricing: api.pricing,
    prerequisites: api.prerequisites
      ? {
          ...api.prerequisites,
          prerequisiteCourseLink: api.prerequisites.prerequisiteCourseLink
            ? {
                label: api.prerequisites.prerequisiteCourseLink.label,
                courseSlug:
                  api.prerequisites.prerequisiteCourseLink.courseSlug,
              }
            : undefined,
        }
      : undefined,
  };

  const modules = mapSectionsToModules(api.sections);
  if (modules.length > 0 || api.curriculumSummary) {
    course.curriculum = {
      sectionId: api.curriculumSectionId,
      summary: api.curriculumSummary,
      modules,
    };
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
  seo: Course["seo"];
  listing?: Course["listing"];
  hero: Course["hero"];
  promo?: Course["promo"];
  curriculum?: {
    sectionId?: string;
    summary?: string;
    modules: {
      icon?: string;
      title: string;
      duration: string;
      topics: string[];
    }[];
  };
  prerequisites?: {
    intro?: string;
    items: string[];
    equipment: string[];
    equipmentNote?: string;
    prerequisiteCourseLink?: { label: string; path: string };
    footerNote?: string;
    noExperienceNote?: string;
  };
  pricing?: Course["pricing"];
}

function parseSectionHours(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
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
    seo: legacy.seo,
    listing: legacy.listing,
    hero: {
      titleLine1: legacy.hero.titleLine1,
      titleHighlight: legacy.hero.titleHighlight,
      video: legacy.hero.video,
    },
    promotion: legacy.promo,
    pricing: legacy.pricing,
    prerequisites: legacy.prerequisites
      ? {
          ...legacy.prerequisites,
          prerequisiteCourseLink: legacy.prerequisites.prerequisiteCourseLink
            ? {
                label: legacy.prerequisites.prerequisiteCourseLink.label,
                courseSlug:
                  legacy.prerequisites.prerequisiteCourseLink.path.replace(
                    /^\//,
                    "",
                  ),
              }
            : undefined,
        }
      : undefined,
    curriculumSectionId: legacy.curriculum?.sectionId,
    curriculumSummary: legacy.curriculum?.summary,
    sections: legacy.curriculum?.modules.map((module, index) => ({
      id: `${legacy.slug}-section-${index + 1}`,
      title: module.title,
      order: index + 1,
      hoursPerSection:
        module.hoursPerSection ?? parseSectionHours(module.duration),
      specificTopics: module.topics,
      icon: module.icon,
    })),
  };
}

export function mapLegacyMockToView(legacy: LegacyMockCourse): Course {
  return mapApiCourseToView(mapLegacyMockToApi(legacy));
}
