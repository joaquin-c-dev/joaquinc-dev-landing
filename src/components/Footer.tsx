import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useCoursesNav } from "@/contexts/CoursesNavContext";

const SITE_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Acerca de mí", path: "/acerca-de-mi" },
];

/**
 * El footer lista todos los cursos y talleres con links reales: el menú de cursos solo
 * existe en el HTML cuando se abre, así que esta es la vía para que buscadores y
 * asistentes de IA descubran todas las páginas.
 */
const Footer = () => {
  const { courses } = useCoursesNav();

  return (
    <footer className="py-8 bg-course-darker border-t border-primary/20">
      <div className="container mx-auto px-6">
        <nav aria-label="Cursos y páginas" className="mb-8 flex flex-col items-center gap-3 text-sm">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {SITE_LINKS.map((link) => (
              <li key={link.path}>
                <a href={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          {courses.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {courses.map((course) => (
                <li key={course.slug}>
                  <a href={`/${course.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Sígueme en mis redes sociales</h3>

          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://www.facebook.com/profile.php?id=61579829160975"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
            >
              <Facebook className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </a>

            <a
              href="https://instagram.com/joaquinc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
            >
              <Instagram className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </a>

            <a
              href="https://www.linkedin.com/in/joaquincr/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
            >
              <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2026 Joaquín C. - Java Developer | Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
