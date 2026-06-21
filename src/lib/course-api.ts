import type { ApiCourseLandingResponse } from "@/lib/api-course-types";

const DEFAULT_BASE_URL = "http://localhost:8080";
const COURSES_QUERY_PATH = "/course/v1/course/query";

export function getCourseApiBaseUrl(): string {
  const fromEnv = process.env.COURSE_API_BASE_URL?.trim();
  return (fromEnv || DEFAULT_BASE_URL).replace(/\/$/, "");
}

export async function fetchCoursesFromApi(): Promise<ApiCourseLandingResponse[]> {
  const url = `${getCourseApiBaseUrl()}${COURSES_QUERY_PATH}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Course API responded with ${response.status} for GET ${url}`,
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Course API response is not an array");
  }

  return data as ApiCourseLandingResponse[];
}
