import type { CourseModality, TimeSchedule } from "@/lib/api-course-types";

export type ScheduledCourseStatus = "ACTIVE" | "ARCHIVED" | "SCHEDULED";

/** Item de GET /scheduled/v1/scheduled/course/by-course/{courseId} */
export interface ApiScheduledCourseItem {
  id: string;
  startDate: string;
  endDate: string;
  courseModality: CourseModality;
  timeSchedule: TimeSchedule;
  status: ScheduledCourseStatus;
  note?: string;
  meetingId?: string;
}

export interface ApiCourseSchedulesResponse {
  courseId: string;
  subtitle?: string;
  fullHeight?: boolean;
  scheduledCourses: ApiScheduledCourseItem[];
}
