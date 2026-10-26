import type { ScheduleItem } from "@/lib/course-types";
import { HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "@/components/home/home-theme";
import { formatWorkshopDay } from "@/lib/workshop-format";

/** Encabezado de la sección de precio (la tarjeta va como isla debajo). */
const CoursePriceHeading = ({ nextGroup }: { nextGroup?: ScheduleItem }) => (
  <div className="mb-10 max-w-[720px]">
    <p {...reveal(0)} className={HOME_EYEBROW}>
      {"// inversión"}
    </p>
    <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
      Un solo pago, a tu ritmo
    </h2>
    <p {...reveal(140)} className={`mt-4 text-[17px] leading-[1.6] ${HOME_MUTED}`}>
      {nextGroup?.startsAt
        ? `Aparta tu lugar en el grupo que empieza el ${formatWorkshopDay(nextGroup.startsAt)}. Paga de contado o en meses sin intereses.`
        : "Paga de contado o en meses sin intereses con tu tarjeta de crédito."}
    </p>
  </div>
);

export default CoursePriceHeading;
