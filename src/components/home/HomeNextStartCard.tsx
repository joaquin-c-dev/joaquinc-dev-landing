import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import { courseKindLabel, startDateParts } from "./home-course-utils";

interface HomeNextStartCardProps {
  /** Cursos y talleres con un grupo futuro, ordenados por fecha de inicio. */
  upcomingStarts: Course[];
}

/**
 * CTA del hero: una línea discreta con el grupo más cercano y, debajo, el botón a los
 * próximos inicios. El detalle (precio, horario, todos los grupos) vive en "Próximos inicios".
 */
const HomeNextStartCard = ({ upcomingStarts }: HomeNextStartCardProps) => {
  const nextCourse = upcomingStarts[0];
  const startsAt = nextCourse?.schedules?.items[0]?.startsAt;
  const date = startsAt ? startDateParts(startsAt) : undefined;
  return (
    <div className="flex flex-col items-start gap-4">
      {nextCourse && date && (
        <a
          href={`/${nextCourse.slug}`}
          className="group inline-flex min-h-[40px] items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-[13.5px] text-[#c9cdd3] transition-colors hover:border-white/25 hover:text-white"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#3ccf7a] opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ccf7a]" />
          </span>
          <span>
            Próximo inicio:{" "}
            <strong className="font-semibold text-[#ffc66d]">
              {date.weekday} {date.day} {date.month}
            </strong>
            <span className="text-[#8b919b]">
              {" "}
              · {courseKindLabel(nextCourse)} {nextCourse.title}
            </span>
          </span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      )}
      <a
        href={nextCourse ? "#proximos-inicios" : "#cursos"}
        className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}
      >
        {nextCourse ? "Aparta tu lugar" : "Ver cursos"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
};

export default HomeNextStartCard;
