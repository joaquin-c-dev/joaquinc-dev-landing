import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "./home-theme";
import { courseKindLabel, formatNextStart } from "./home-course-utils";

interface HomeFinalCtaProps {
  nextCourse?: Course;
}

/** Cierre: el siguiente grupo y un solo botón. */
const HomeFinalCta = ({ nextCourse }: HomeFinalCtaProps) => {
  const nextStart = formatNextStart(nextCourse);
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(123,92,240,0.18),transparent_70%)]"
      />
      <div
        className={`${HOME_CONTAINER} relative flex flex-col items-center text-center`}
      >
        <p {...reveal(0)} className={HOME_EYEBROW}>
          {"// tu siguiente paso"}
        </p>
        <h2 {...reveal(70)} className={`${HOME_H2} mt-4 max-w-[760px]`}>
          Aparta tu lugar en el próximo grupo
        </h2>
        {nextCourse && nextStart && (
          <p {...reveal(140)} className={`mt-5 text-[17px] ${HOME_MUTED}`}>
            {courseKindLabel(nextCourse)} {nextCourse.title} · empieza el <span className="text-white">{nextStart.toLowerCase()}</span>
          </p>
        )}
        <div {...reveal(210)} className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href={nextCourse ? `/${nextCourse.slug}` : "#cursos"}
            className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}
          >
            {nextCourse ? "Ver fechas e inscribirme" : "Ver cursos"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          {nextCourse && (
            <a
              href="#cursos"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-white/15 px-6 text-[15px] text-[#d5d8dd] transition-colors hover:border-white/30 hover:text-white"
            >
              Ver todos los cursos
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCta;
