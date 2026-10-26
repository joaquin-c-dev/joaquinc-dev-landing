import { ArrowRight, CalendarRange, Clock, MessageCircle } from "lucide-react";
import type { ScheduleItem } from "@/lib/course-types";
import { WS_CTA } from "@/components/workshop/workshop-styles";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "@/components/home/home-theme";
import { startDateParts } from "@/components/home/home-course-utils";

interface CourseGroupsProps {
  /** Grupos que no han empezado, del más cercano al más lejano. */
  groups: ScheduleItem[];
  /** WhatsApp para pedir aviso cuando no hay grupo agendado. */
  notifyUrl: string;
}

/**
 * Próximos grupos del curso con el bloque de calendario del inicio. Sin grupos agendados,
 * invita a pedir aviso por WhatsApp en lugar de esconder la sección.
 */
const CourseGroups = ({ groups, notifyUrl }: CourseGroupsProps) => (
  <section id="grupos" className="scroll-mt-24 border-y border-white/[0.07] bg-[#0e1014] py-24 md:py-28">
    <div className={HOME_CONTAINER}>
      <p {...reveal(0)} className={HOME_EYEBROW}>
        {"// próximos grupos"}
      </p>
      <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
        {groups.length ? "Elige tu grupo" : "Próximo grupo por anunciar"}
      </h2>
      <p {...reveal(140)} className={`mt-4 max-w-[640px] text-[17px] leading-[1.6] ${HOME_MUTED}`}>
        {groups.length
          ? "Grupos pequeños por Zoom. Si faltas a una clase, la grabación queda disponible."
          : "Escríbeme y te aviso en cuanto abra la fecha, antes de anunciarla."}
      </p>

      {groups.length ? (
        <ul className="mt-12 space-y-4">
          {groups.map((group, index) => {
            const date = startDateParts(group.startsAt!);
            return (
              <li key={group.id} {...reveal(index * 80)}>
                <div className="flex flex-col gap-5 rounded-[18px] border border-[#ffc66d]/30 bg-[linear-gradient(110deg,rgba(255,198,109,0.08),#12151a_40%)] p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
                    <div className="flex w-[72px] shrink-0 flex-col items-center overflow-hidden rounded-xl border border-white/10 bg-[#0b0d10] text-center sm:w-[84px]">
                      <span className="w-full bg-[#ffc66d] py-1 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#1a1406]">
                        {date.month}
                      </span>
                      <span className="pt-1 text-[28px] font-bold leading-none text-white sm:text-[32px]">{date.day}</span>
                      <span className="pb-2 pt-1 text-[12px] capitalize text-[#9da3ad]">{date.weekday}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium uppercase tracking-[0.06em] text-[#7ee2a8]">{group.modality}</p>
                      <h3 className="mt-1 text-[19px] font-semibold leading-snug text-white sm:text-[21px]">{group.schedule}</h3>
                      <p className={`mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[14px] ${HOME_MUTED}`}>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarRange className="h-3.5 w-3.5" aria-hidden />
                          {group.dateRange}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {group.duration} · {group.hours}
                        </span>
                      </p>
                      {group.note && <p className="mt-1.5 text-[13.5px] text-[#c9cdd3]">{group.note}</p>}
                    </div>
                  </div>
                  <a href="#precio" className={`${WS_CTA} gap-2 self-start whitespace-nowrap rounded-xl px-5 text-[14.5px] sm:self-center`}>
                    Aparta tu lugar
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <a
          {...reveal(210)}
          href={notifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 px-5 text-[15px] text-[#d5d8dd] transition-colors hover:border-white/30 hover:text-white"
        >
          <MessageCircle className="h-4 w-4 text-[#3ccf7a]" aria-hidden />
          Avísame cuando abra el próximo grupo
        </a>
      )}
    </div>
  </section>
);

export default CourseGroups;
