import { ArrowRight } from "lucide-react";
import type { ScheduleItem } from "@/lib/course-types";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "@/components/home/home-theme";
import { capitalize } from "@/components/home/home-course-utils";
import { formatWorkshopDay } from "@/lib/workshop-format";

interface CourseFinalCtaProps {
  title: string;
  nextGroup?: ScheduleItem;
}

/** Cierre de la página de curso: el siguiente grupo y un solo botón a la tarjeta de precio. */
const CourseFinalCta = ({ title, nextGroup }: CourseFinalCtaProps) => (
  <section className="relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(123,92,240,0.18),transparent_70%)]"
    />
    <div className={`${HOME_CONTAINER} relative flex flex-col items-center text-center`}>
      <p {...reveal(0)} className={HOME_EYEBROW}>
        {"// tu siguiente paso"}
      </p>
      <h2 {...reveal(70)} className={`${HOME_H2} mt-4 max-w-[780px]`}>
        Aparta tu lugar en {title}
      </h2>
      <p {...reveal(140)} className={`mt-5 text-[17px] ${HOME_MUTED}`}>
        {nextGroup?.startsAt ? (
          <>
            El próximo grupo empieza el{" "}
            <span className="text-white">{capitalize(formatWorkshopDay(nextGroup.startsAt)).toLowerCase()}</span> ·{" "}
            {nextGroup.schedule}
          </>
        ) : (
          "Grupos pequeños, en vivo por Zoom y con grabación de cada clase."
        )}
      </p>
      <a {...reveal(210)} href="#precio" className={`${WS_CTA} ${WS_CTA_GLOW} mt-9 gap-2 rounded-xl px-6 text-[15.5px]`}>
        Aparta tu lugar
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  </section>
);

export default CourseFinalCta;
