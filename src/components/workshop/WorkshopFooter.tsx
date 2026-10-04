import { useCoursesNav } from "@/contexts/CoursesNavContext";
import { WS_CONTAINER } from "./workshop-styles";

/** Mismas redes que el `Footer` del sitio. */
const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579829160975" },
  { label: "Instagram", href: "https://instagram.com/joaquinc.dev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joaquincr/" },
];

const SITE_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Acerca de mí", path: "/acerca-de-mi" },
];

const LINK = "text-[#9aa3ae] hover:text-[#eceef1]";

/**
 * Footer del taller. Arriba, links reales al sitio y a los demás cursos (la página no
 * tiene menú, para no distraer de la compra, pero buscadores y asistentes de IA necesitan
 * poder recorrer el sitio). El padding inferior (96px) deja libre el botón flotante de
 * WhatsApp para que no tape los links.
 */
const WorkshopFooter = () => {
  const { courses } = useCoursesNav();

  return (
    <footer className="border-t border-white/[0.07]">
      <div className={`${WS_CONTAINER} flex flex-col gap-6 pb-24 pt-8 text-[13px] text-[#8a929c]`}>
        <nav aria-label="Más cursos y páginas" className="flex flex-col gap-2.5">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {SITE_LINKS.map((link) => (
              <li key={link.path}>
                <a href={link.path} className={LINK}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          {courses.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {courses.map((course) => (
                <li key={course.slug}>
                  <a href={`/${course.slug}`} className={LINK}>
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Joaquín Coronado · Java Developer</span>
          <div className="flex gap-5">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WorkshopFooter;
