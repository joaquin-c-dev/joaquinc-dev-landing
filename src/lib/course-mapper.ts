import type { ApiCourseLandingResponse, HeroLayout } from "@/lib/api-course-types";
import type {
  Course,
  CourseHeroData,
  CourseIconName,
  CourseLayout,
  CurriculumModule,
} from "@/lib/course-types";
import {
  formatDateRange,
  formatDurationHours,
  formatModalityLabel,
  formatSectionDuration,
  formatTimeScheduleLabel,
  formatWeekDuration,
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
  if (modules.length > 0 || api.curriculumSummary || api.methodology?.length) {
    course.curriculum = {
      sectionId: api.curriculumSectionId,
      summary: api.curriculumSummary,
      modules,
      methodology: api.methodology,
    };
  }

  if (api.scheduledCourses?.length) {
    course.schedules = {
      subtitle: api.schedulesSubtitle,
      fullHeight: api.schedulesFullHeight,
      items: api.scheduledCourses.map((scheduled) => ({
        id: scheduled.id,
        modality: formatModalityLabel(scheduled.courseModality),
        schedule: formatTimeScheduleLabel(
          scheduled.courseModality,
          scheduled.timeSchedule,
        ),
        hours: `${formatDurationHours(api.durationInHours)} totales`,
        dateRange: formatDateRange(scheduled.startDate, scheduled.endDate),
        duration: formatWeekDuration(scheduled.startDate, scheduled.endDate),
        note: scheduled.note,
      })),
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
    methodology?: { title: string; description: string }[];
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
  schedules?: {
    subtitle?: string;
    fullHeight?: boolean;
    items: {
      modality: string;
      courseLabel?: string;
      schedule: string;
      hours: string;
      dateRange: string;
      duration: string;
      note?: string;
    }[];
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
    methodology: legacy.curriculum?.methodology,
    schedulesSubtitle: legacy.schedules?.subtitle,
    schedulesFullHeight: legacy.schedules?.fullHeight,
    scheduledCourses: legacy.schedules?.items.map((item, index) => ({
      id: `${legacy.slug}-schedule-${index + 1}`,
      courseId: legacy.slug,
      startDate: "2026-05-02T09:00:00-06:00",
      endDate: "2026-06-06T14:00:00-06:00",
      courseModality: item.modality.toLowerCase().includes("sabat")
        ? "SATURDAY"
        : "MONDAY_TO_THURSDAY",
      timeSchedule: item.schedule.includes("8:00 PM")
        ? "FROM_8PM_TO_10PM"
        : "FROM_9AM_TO_2PM",
      note: item.note,
    })),
  };
}

export function mapLegacyMockToView(legacy: LegacyMockCourse): Course {
  const view = mapApiCourseToView(mapLegacyMockToApi(legacy));

  if (legacy.schedules?.items.length) {
    view.schedules = {
      subtitle: legacy.schedules.subtitle,
      fullHeight: legacy.schedules.fullHeight,
      items: legacy.schedules.items.map((item, i) => ({
        id: `${legacy.slug}-schedule-${i + 1}`,
        modality: item.modality,
        schedule: item.schedule,
        hours: item.hours,
        dateRange: item.dateRange,
        duration: item.duration,
        note: item.note,
      })),
    };
  }

  return view;
}
