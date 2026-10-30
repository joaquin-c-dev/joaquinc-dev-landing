import { ArrowRight, Clock } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { WS_CTA } from "@/components/workshop/workshop-styles";
import { formatDurationHours } from "@/lib/course-formatters";
import { formatHourRange, formatPrice } from "@/lib/workshop-format";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "./home-theme";
import {
  courseKindLabel,
  currentPrice,
  formatNextStart,
  startDateParts,
} from "./home-course-utils";

interface HomeUpcomingStartsProps {
  /** Cursos y talleres con un grupo futuro, ordenados por fecha de inicio. */
  upcomingStarts: Course[];
}

/**
 * "Próximos inicios": un renglón por cada grupo agendado, con la fecha en un bloque tipo
 * calendario para que se vea de un vistazo qué empieza y cuándo. Sale de los agendados de la
 * API; si no hay ningún grupo futuro, la sección no aparece.
 */
const HomeUpcomingStarts = ({ upcomingStarts }: HomeUpcomingStartsProps) => {
  if (!upcomingStarts.length) return null;
  return (
    <section id="proximos-inicios" className="scroll-mt-24 pb-8 pt-24 md:pt-32">
      <div className={HOME_CONTAINER}>
        <div
          className="max-w-[680px]"
        >
          <p {...reveal(0)} className={HOME_EYEBROW}>
            {"// próximos inicios"}
          </p>
          <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
            Grupos con inscripciones abiertas
          </h2>
          <p
            {...reveal(140)}
            className={`mt-4 text-[17px] leading-[1.6] ${HOME_MUTED}`}
          >
            Aparta tu lugar antes de que empiecen: los grupos son pequeños.
          </p>
        </div>

        <ul
          className="mt-12 space-y-4"
        >
          {upcomingStarts.map((course, index) => {
            const schedule = course.schedules!.items[0];
            const date = startDateParts(schedule.startsAt!);
            const price = currentPrice(course);
            const hasDiscount =
              price != null &&
              course.regularPrice != null &&
              price < course.regularPrice;
            const hours = schedule.endsAt
              ? `${formatHourRange(schedule.startsAt!, schedule.endsAt)} CDMX`
              : undefined;
            return (
              <li key={course.slug} {...reveal(index * 80)}>
                <a
                  href={`/pagar/${course.slug}`}
                  className="group flex flex-col gap-5 rounded-[18px] border border-[#ffc66d]/30 bg-[linear-gradient(110deg,rgba(255,198,109,0.08),#12151a_40%)] p-5 transition-colors hover:border-[#ffc66d]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FC8FF] sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
                    <div className="flex w-[72px] shrink-0 flex-col sm:w-[84px] items-center overflow-hidden rounded-xl border border-white/10 bg-[#0b0d10] text-center">
                      <span className="w-full bg-[#ffc66d] py-1 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#1a1406]">
                        {date.month}
                      </span>
                      <span className="pt-1 text-[28px] font-bold leading-none text-white sm:text-[32px]">
                        {date.day}
                      </span>
                      <span className="pb-2 pt-1 text-[12px] capitalize text-[#9da3ad]">
                        {date.weekday}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
                        <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-medium text-[#c9cdd3]">
                          {courseKindLabel(course)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 ${HOME_MUTED}`}
                        >
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {formatDurationHours(course.durationInHours)}
                        </span>
                      </div>
                      <h3 className="mt-2 text-[19px] font-semibold sm:text-[21px] leading-snug tracking-[-0.015em] text-white">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-[14.5px] text-[#d5d8dd]">
                        Empieza el{" "}
                        <strong className="font-semibold text-[#ffc66d]">
                          {formatNextStart(course)?.toLowerCase()}
                        </strong>
                        {hours && (
                          <span className="text-[#8b919b]"> · {hours}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:justify-center">
                    {price != null && (
                      <p className="text-[13px] text-[#8b919b]">
                        {hasDiscount && (
                          <span className="mr-2 line-through">
                            {formatPrice(course.regularPrice!)}
                          </span>
                        )}
                        <span className="text-[20px] font-semibold text-white">
                          {formatPrice(price)}
                        </span>{" "}
                        MXN
                      </p>
                    )}
                    <span
                      className={`${WS_CTA} gap-2 whitespace-nowrap rounded-xl px-5 text-[14.5px]`}
                    >
                      Inscribirme
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeUpcomingStarts;
