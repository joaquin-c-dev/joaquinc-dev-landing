import type { ApiScheduledCourseItem } from "@/lib/api-scheduled-courses-types";
import { getCourseApiBaseUrl } from "@/lib/course-api";

const SCHEDULED_COURSES_BY_COURSE_PATH =
  "/scheduled/v1/scheduled/course/by-course";

export async function fetchScheduledCoursesByCourseId(
  courseId: string,
): Promise<ApiScheduledCourseItem[]> {
  const url = `${getCourseApiBaseUrl()}${SCHEDULED_COURSES_BY_COURSE_PATH}/${encodeURIComponent(courseId)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Scheduled course API responded with ${response.status} for GET ${url}`,
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Scheduled course API response is not an array");
  }

  return data as ApiScheduledCourseItem[];
}
