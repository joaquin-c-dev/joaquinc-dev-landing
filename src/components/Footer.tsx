import { useCoursesNav } from "@/contexts/CoursesNavContext";
import { ASSETS } from "@/lib/assets";

/** Redes con su logo oficial a color (archivos en public/images/logos). */
const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61579829160975", logo: "/images/logos/facebook.svg" },
  { name: "Instagram", url: "https://instagram.com/joaquinc.dev", logo: "/images/logos/instagram.svg" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/joaquincr/", logo: "/images/logos/linkedin.svg" },
];

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
        <a href="/" aria-label="joaquinc.dev, ir al inicio" className="mx-auto mb-8 block w-fit">
          <img src={ASSETS.brandLogo} alt="" width={108} height={96} loading="lazy" className="h-24 w-auto" />
        </a>
        <nav aria-label="Cursos y páginas" className="mb-8 flex flex-col items-center gap-3 text-sm">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {SITE_LINKS.map((link) => (
              <li key={link.path}>
                <a href={link.path} className="inline-block py-1 text-muted-foreground hover:text-[#ffc66d] transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          {courses.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {courses.map((course) => (
                <li key={course.slug}>
                  <a href={`/${course.slug}`} className="inline-block py-1 text-muted-foreground hover:text-[#ffc66d] transition-colors">
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
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-12 h-12 bg-white/[0.06] rounded-full flex items-center justify-center hover:bg-white/[0.12] transition-colors duration-300 group"
              >
                <img
                  src={social.logo}
                  alt=""
                  width={26}
                  height={26}
                  loading="lazy"
                  className="w-[26px] h-[26px] group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            © 2026 Joaquín Coronado - Líder Técnico en Avena Health | Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
