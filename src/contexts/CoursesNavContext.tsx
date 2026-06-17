import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { Course } from "@/lib/course-types";

export type NavCourse = Pick<Course, "slug" | "name">;

interface CoursesNavContextType {
  courses: NavCourse[];
}

const CoursesNavContext = createContext<CoursesNavContextType | undefined>(
  undefined,
);

interface CoursesNavProviderProps {
  courses: NavCourse[];
  children: ReactNode;
}

export function CoursesNavProvider({
  courses,
  children,
}: CoursesNavProviderProps) {
  return (
    <CoursesNavContext.Provider value={{ courses }}>
      {children}
    </CoursesNavContext.Provider>
  );
}

export function useCoursesNav() {
  const context = useContext(CoursesNavContext);
  if (!context) {
    throw new Error("useCoursesNav must be used within a CoursesNavProvider");
  }
  return context;
}
