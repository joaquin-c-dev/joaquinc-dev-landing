import type { ApiScheduledCourse } from "@/lib/api-course-types";

/** Respuesta de GET /api/courses/{courseId}/scheduled-courses */
export interface ApiCourseSchedulesResponse {
  courseId: string;
  subtitle?: string;
  fullHeight?: boolean;
  scheduledCourses: ApiScheduledCourse[];
}
