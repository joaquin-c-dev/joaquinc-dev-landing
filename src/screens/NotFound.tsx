import { ArrowRight, FileCode2, Search } from "lucide-react";
import Footer from "@/components/Footer";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_MUTED, rise } from "@/components/home/home-theme";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import { CoursesNavProvider, type NavCourse } from "@/contexts/CoursesNavContext";

interface NotFoundProps {
  navCourses?: NavCourse[];
  /** Ruta que se pidió y no existe; se muestra en el buscador. */
  requestedPath: string;
}

/**
 * 404 con el look del sitio. A la derecha, el "Search Everywhere" de IntelliJ: buscó la ruta
 * pedida, no encontró nada y ofrece los cursos activos como archivos para abrir (un curso que
 * se desactiva cae aquí). HTML sin hidratar.
 */
const NotFound = ({ navCourses = [], requestedPath }: NotFoundProps) => {
  const query = requestedPath.replace(/^\//, "") || "/";
  return (
    <>
      <main id="contenido">
        <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-16 lg:pt-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(53,116,240,0.16),transparent_70%)]"
          />
          <div className={`${HOME_CONTAINER} relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16`}>
            <div className="min-w-0">
              <p {...rise(0)} className={HOME_EYEBROW}>
                {"// error 404"}
              </p>
              <h1
                {...rise(60)}
                className="mt-5 text-[clamp(38px,9vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]"
              >
                Esta página no existe
                <span className="mt-[0.2em] block text-[0.55em] leading-[1.15] text-[#ffc66d]">
                  o ya no está disponible
                </span>
              </h1>
              <p {...rise(120)} className={`mt-6 max-w-[500px] text-[17px] leading-[1.6] ${HOME_MUTED}`}>
                Si buscabas un curso, puede que ya no tenga grupos abiertos. Revisa los cursos disponibles o
                vuelve al inicio.
              </p>
              <div {...rise(180)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="/#cursos" className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}>
                  Ver cursos y fechas
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="/"
                  className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-[#d5d8dd] underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Ir al inicio
                </a>
              </div>
            </div>

            {/* "Search Everywhere" de IntelliJ: la búsqueda sin resultados y los cursos activos. */}
            <div
              {...rise(150)}
              className="min-w-0 overflow-hidden rounded-xl border border-[#393B40] bg-[#1E1F22] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center gap-1 border-b border-black/30 bg-[#2B2D30] px-3 pt-2 text-[13px]">
                {["Todo", "Cursos", "Archivos"].map((tab, index) => (
                  <span
                    key={tab}
                    className={`px-3 pb-2 ${index === 0 ? "border-b-2 border-[#3574F0] text-[#DFE1E5]" : "text-[#9DA0A8]"}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2.5 border-b border-[#393B40] px-4 py-3 font-['JetBrains_Mono',ui-monospace,monospace] text-[14px]">
                <Search className="h-4 w-4 shrink-0 text-[#8C8F96]" aria-hidden />
                <span className="truncate text-[#DFE1E5]">{query}</span>
                <span aria-hidden className="-ml-1 h-4 w-px animate-pulse bg-[#DFE1E5] motion-reduce:animate-none" />
              </div>
              <p className="px-4 pb-1 pt-4 text-[13px] text-[#8C8F96]">Sin resultados para “{query}”</p>
              {navCourses.length > 0 && (
                <>
                  <p className="px-4 pb-2 pt-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9DA0A8]">
                    Cursos disponibles
                  </p>
                  <ul className="pb-3">
                    {navCourses.map((course) => (
                      <li key={course.slug}>
                        <a
                          href={`/${course.slug}`}
                          className="group flex min-h-[44px] items-center gap-3 px-4 py-2 text-[15px] text-[#DFE1E5] transition-colors hover:bg-[#2E436E] focus-visible:bg-[#2E436E] focus-visible:outline-none"
                        >
                          <FileCode2 className="h-4 w-4 shrink-0 text-[#56A8F5]" aria-hidden />
                          <span className="min-w-0 flex-1">{course.name}</span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-[#ffc66d] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                            aria-hidden
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <CoursesNavProvider courses={navCourses}>
        <Footer />
      </CoursesNavProvider>
    </>
  );
};

export default NotFound;
