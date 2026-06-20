import type { ApiCourseLandingResponse, HeroLayout } from "@/lib/api-course-types";
import type {
  Course,
  CourseHeroData,
  CourseIconName,
  CourseLayout,
  CurriculumModule,
} from "@/lib/course-types";
import {
  formatDurationHours,
  formatSectionDuration,
} from "@/lib/course-formatters";

function mapTypeToLayout(type: ApiCourseLandingResponse["type"]): CourseLayout {
  return type === "WORKSHOP" ? "workshop" : "standard";
}

function mapHeroLayout(layout?: HeroLayout): CourseHeroData["layout"] {
  if (layout === "TWO_COLUMN") return "two-column";
  if (layout === "CENTERED") return "centered";
  return undefined;
}

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
  const layout = mapTypeToLayout(api.type);

  const course: Course = {
    id: api.id,
    slug: api.slug,
    type: api.type,
    status: api.status,
    layout,
    title: api.title,
    description: api.description,
    durationInHours: api.durationInHours,
    duration: formatDurationHours(api.durationInHours),
    subtitle: api.subtitle,
    level: api.level,
    topicsUrl: api.topicsUrl,
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
      titleLine2: api.hero.titleLine2,
      description: api.hero.description,
      layout: mapHeroLayout(api.hero.layout),
      video: api.hero.video,
      stripeUrl: api.hero.stripeUrl,
      secondaryCta: api.hero.secondaryCta
        ? {
            label: api.hero.secondaryCta.label,
            href: api.hero.secondaryCta.href,
            scrollTo: api.hero.secondaryCta.scrollTo,
          }
        : undefined,
    },
    promo: api.promotion,
    pricing: api.pricing,
    workshop: api.workshop,
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
  layout: CourseLayout;
  name: string;
  subtitle?: string;
  shortDescription?: string;
  level?: string;
  duration?: string;
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
  workshop?: Course["workshop"];
}

function parseDurationHours(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function parseSectionHours(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function mapHeroLayoutToApi(
  layout?: CourseHeroData["layout"],
): HeroLayout | undefined {
  if (layout === "two-column") return "TWO_COLUMN";
  if (layout === "centered") return "CENTERED";
  return undefined;
}

/** Convierte el mock legacy al formato ApiCourseLandingResponse. */
export function mapLegacyMockToApi(legacy: LegacyMockCourse): ApiCourseLandingResponse {
  const durationInHours = parseDurationHours(legacy.duration);

  return {
    id: legacy.slug,
    slug: legacy.slug,
    type: legacy.layout === "workshop" ? "WORKSHOP" : "COURSE",
    status: "ACTIVE",
    title: legacy.name,
    description: legacy.shortDescription ?? legacy.hero.description,
    durationInHours,
    subtitle: legacy.subtitle,
    level: legacy.level,
    seo: legacy.seo,
    listing: legacy.listing,
    hero: {
      titleLine1: legacy.hero.titleLine1,
      titleHighlight: legacy.hero.titleHighlight,
      titleLine2: legacy.hero.titleLine2,
      description: legacy.hero.description,
      layout: mapHeroLayoutToApi(legacy.hero.layout),
      video: legacy.hero.video,
      stripeUrl: legacy.hero.stripeUrl,
      secondaryCta: legacy.hero.secondaryCta,
    },
    promotion: legacy.promo,
    pricing: legacy.pricing,
    workshop: legacy.workshop,
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
