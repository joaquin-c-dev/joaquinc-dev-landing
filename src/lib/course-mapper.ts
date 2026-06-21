import type { ApiCourseLandingResponse } from "@/lib/api-course-types";
import type {
  Course,
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

function compareSectionOrder(
  a: { order?: number },
  b: { order?: number },
): number {
  return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
}

export function sortCurriculumSections<T extends { order?: number }>(
  sections: T[],
): T[] {
  return [...sections].sort(compareSectionOrder);
}

function mapApiSectionsToView(
  sections: ApiCourseLandingResponse["sections"],
): CurriculumModule[] {
  if (!sections?.length) return [];
  return sortCurriculumSections(sections).map((section) => ({
    order: section.order,
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
    promo: api.promo ?? api.promotion,
    prerequisites: api.prerequisites
      ? {
          items: api.prerequisites.items,
          equipment: api.prerequisites.equipment,
          noExperienceNote: api.prerequisites.noExperienceNote,
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
    .filter((course) => course.status === "ACTIVE" && course.slug?.trim())
    .map(mapApiCourseToView);
}
