import Navigation from "@/components/Navigation";
import { CoursesNavProvider, type NavCourse } from "@/contexts/CoursesNavContext";
import { PathnameProvider } from "@/contexts/PathnameContext";

interface HomeNavigationProps {
  navCourses: NavCourse[];
  pathname: string;
}

/**
 * Menú del home como isla propia: es lo único de arriba que necesita React (menú de cursos
 * y menú del celular). Trae sus propios contextos porque las islas no comparten estado.
 */
const HomeNavigation = ({ navCourses, pathname }: HomeNavigationProps) => (
  <PathnameProvider pathname={pathname}>
    <CoursesNavProvider courses={navCourses}>
      <Navigation />
    </CoursesNavProvider>
  </PathnameProvider>
);

export default HomeNavigation;
