import type { Course } from "@/lib/course-types";
import { CLASS_PHOTOS } from "@/lib/class-photos";
import HomeCodeEditor from "./HomeCodeEditor";
import ZoomFrame from "./ZoomFrame";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_MUTED, rise } from "./home-theme";
import HomeNextStartCard from "./HomeNextStartCard";

/** Renglón del título: logo de la tecnología en una columna fija para que los textos queden alineados. */
const TechLine = ({ logo, children }: { logo: string; children: string }) => (
  <span className="flex items-center gap-[0.3em]">
    <span className="flex w-[0.9em] shrink-0 justify-center">
      <img src={logo} alt="" aria-hidden width={128} height={128} className="h-[0.78em] w-auto" />
    </span>
    {children}
  </span>
);

interface HomeHeroProps {
  /** Cursos y talleres con un grupo futuro, ordenados por fecha de inicio. */
  upcomingStarts: Course[];
}

/**
 * Hero claro: qué es (clases en vivo de Java y Spring Boot), quién enseña, cuándo es el
 * siguiente inicio y un solo CTA. A la derecha, el código que se escribe en clase y una
 * captura real de Zoom para que se entienda que es en vivo.
 */
const HomeHero = ({ upcomingStarts }: HomeHeroProps) => {
  // En escritorio el hero ocupa una pantalla y todo cabe sin hacer scroll.
  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-12 lg:pt-28 [@media(min-width:1024px)_and_(max-height:760px)]:pb-6 [@media(min-width:1024px)_and_(max-height:760px)]:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(53,116,240,0.16),transparent_70%)]"
      />
      <div className={`${HOME_CONTAINER} relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14`}>
        <div className="min-w-0">
          <p {...rise(0)} className={HOME_EYEBROW}>
            {"// cursos y talleres en vivo por Zoom"}
          </p>
          <h1
            {...rise(60)}
            className="mt-6 text-[clamp(40px,11vw,56px)] font-bold leading-[1.12] tracking-[-0.03em] lg:text-[clamp(40px,min(4.4vw,7.6vh),62px)]"
          >
            {/* Listado: una tecnología por renglón y "en vivo" al final. Las comas ocultas solo
                ayudan a los lectores de pantalla a leerlo como frase. */}
            <TechLine logo="/images/logos/java.svg">Java</TechLine>
            <span className="sr-only">, </span>
            <TechLine logo="/images/logos/spring.svg">Spring Boot</TechLine>
            <span className="sr-only"> y </span>
            <TechLine logo="/images/logos/claude.svg">Claude</TechLine>
            <span className="sr-only">, </span>
            <span className="mt-[0.18em] block text-[0.62em] leading-[1.1] text-[#ffc66d]">en vivo</span>
          </h1>
          <p {...rise(120)} className={`mt-6 max-w-[540px] text-[17px] leading-[1.6] ${HOME_MUTED}`}>
            Clases en vivo con Joaquín Coronado, Líder Técnico en Avena Health. Programas en cada clase y
            terminas con un proyecto real.
          </p>

          <div {...rise(180)} className="mt-8">
            <HomeNextStartCard upcomingStarts={upcomingStarts} />
          </div>
        </div>

        <div {...rise(150)} className="relative min-w-0">
          <p className="mb-3 font-['JetBrains_Mono',ui-monospace,monospace] text-[12px] text-[#7d838d]">
            Lo que escribes en clase ↓
          </p>
          <HomeCodeEditor />
          {/* `home-pop`: entra después del código, ya inclinada (keyframes en index.css). */}
          <div className="home-pop mx-auto mt-6 w-[88%] lg:absolute lg:-right-6 lg:top-2 lg:mt-0 lg:w-[44%]">
            <ZoomFrame photo={CLASS_PHOTOS[0]} live eager />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
