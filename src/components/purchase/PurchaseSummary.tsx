import { ArrowLeft, CalendarDays, Check } from "lucide-react";
import type { Course, ScheduleItem } from "@/lib/course-types";
import { getCurrentPrice } from "@/components/checkout/CheckoutContext";
import {
  MAX_INSTALLMENTS,
  getCourseIncludes,
  getCourseLogo,
} from "@/lib/course-offer";
import { formatPrice } from "@/lib/workshop-format";
import { HOME_EYEBROW, HOME_MUTED, rise } from "@/components/home/home-theme";
import {
  capitalize,
  courseKindLabel,
} from "@/components/home/home-course-utils";
import { formatWorkshopDay } from "@/lib/workshop-format";

interface PurchaseSummaryProps {
  course: Course;
  nextGroup?: ScheduleItem;
  /** `?editar=1`: llegó desde Stripe para corregir sus datos. */
  editMode: boolean;
}

/**
 * Resumen de la compra junto al formulario: qué curso, cuándo empieza, cuánto y qué incluye. Son
 * dos piezas de la cuadrícula de `/pagar`: en celular el formulario va entre ellas (justo después
 * del precio), y en escritorio las dos van a la izquierda del formulario.
 */
const PurchaseSummary = ({
  course,
  nextGroup,
  editMode,
}: PurchaseSummaryProps) => {
  const price = getCurrentPrice(course);
  const savings =
    course.regularPrice != null && course.regularPrice > price
      ? course.regularPrice - price
      : 0;
  const logo = getCourseLogo(course.slug);
  const isCourse = course.type !== "WORKSHOP";
  return (
    <>
      <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
        <p {...rise(0)} className={`${HOME_EYEBROW} flex items-center gap-3`}>
          {logo && (
            <img
              src={logo}
              alt=""
              aria-hidden
              width={128}
              height={128}
              className="h-6 w-auto max-w-8 object-contain"
            />
          )}
          {editMode
            ? "// corrige tus datos"
            : `// inscripción · ${courseKindLabel(course).toLowerCase()} en vivo`}
        </p>
        <h1
          {...rise(60)}
          className="mt-4 text-[clamp(30px,6vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]"
        >
          {course.title}
        </h1>
        {nextGroup?.startsAt && (
          <p
            {...rise(100)}
            className="mt-4 flex items-start gap-2 text-[15.5px] text-[#d5d8dd]"
          >
            <CalendarDays
              className="mt-0.5 h-4 w-4 shrink-0 text-[#ffc66d]"
              aria-hidden
            />
            <span>
              Empieza el{" "}
              <strong className="font-semibold text-[#ffc66d]">
                {capitalize(
                  formatWorkshopDay(nextGroup.startsAt),
                ).toLowerCase()}
              </strong>
              <span className="text-[#8b919b]"> · {nextGroup.schedule}</span>
            </span>
          </p>
        )}

        <div
          {...rise(140)}
          className="mt-7 rounded-[16px] border border-white/[0.08] bg-[#12151a] p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="text-[34px] font-bold leading-none tracking-[-0.03em] text-white tabular-nums">
              {formatPrice(price)}
            </span>
            <span className="text-[15px] text-[#9da3ad]">MXN</span>
            {savings > 0 && (
              <span className="text-[14px] text-[#8b919b]">
                <s>{formatPrice(course.regularPrice!)}</s>
                <span className="ml-2 rounded-md bg-[#3ccf7a]/15 px-2 py-0.5 text-[12.5px] font-semibold text-[#7ee2a8]">
                  Ahorras {formatPrice(savings)}
                </span>
              </span>
            )}
          </div>
          <p className={`mt-3 text-[14.5px] leading-[1.5] ${HOME_MUTED}`}>
            {isCourse ? (
              <>
                Paga de contado o desde{" "}
                <strong className="font-semibold text-[#ffc66d]">
                  {formatPrice(Math.ceil(price / MAX_INSTALLMENTS))} al mes
                </strong>{" "}
                con hasta {MAX_INSTALLMENTS} meses sin intereses.
              </>
            ) : (
              "Pago único con tarjeta de crédito o débito."
            )}
          </p>
        </div>
      </div>

      <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
        <div className="rounded-[16px] border border-white/[0.08] bg-[#12151a] p-5 sm:p-6">
          <p className="text-[14px] font-semibold text-white">Incluye</p>
          <ul className="mt-3 space-y-2.5 text-[14.5px] text-[#d5d8dd]">
            {getCourseIncludes(course).map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#ffc66d]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={`/${course.slug}`}
          className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[14px] text-[#9da3ad] transition-colors hover:text-[#ffc66d]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Ver detalles del {course.type === "WORKSHOP" ? "taller" : "curso"}
        </a>
      </div>
    </>
  );
};

export default PurchaseSummary;
