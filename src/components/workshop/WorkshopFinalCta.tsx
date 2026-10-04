import { formatPrice, formatWeekday, formatWorkshopLongDate } from "@/lib/workshop-format";
import { WS_BAND, WS_CTA, WS_CTA_CAPSULE, WS_FONT_CODE } from "./workshop-styles";

interface WorkshopFinalCtaProps {
  price: number;
  startsAt?: string;
  endsAt?: string;
  headline?: string;
  onCheckout?: () => void;
}

/** CTA final (handoff "CTA 3a"): fecha, titular y el mismo botón con cápsula de precio. */
const WorkshopFinalCta = ({ price, startsAt, endsAt, headline, onCheckout }: WorkshopFinalCtaProps) => {
  const title =
    headline ??
    (startsAt ? `Aparta tu lugar para este ${formatWeekday(startsAt)}.` : "Aparta tu lugar en el taller.");

  return (
    <section className={WS_BAND}>
      <div className="mx-auto flex w-full max-w-[760px] flex-col items-center px-6 py-14 text-center md:py-24">
        {startsAt && endsAt && (
          <span className={`${WS_FONT_CODE} text-[11px] tracking-[0.06em] text-[#9AA0A8] md:text-xs`}>
            {formatWorkshopLongDate(startsAt, endsAt)}
          </span>
        )}
        <h2 className="mb-5 mt-3 text-[26px] font-extrabold leading-[1.15] [text-wrap:balance] md:mb-7 md:mt-4 md:text-[40px]">
          {title}
        </h2>
        {onCheckout && (
          <button
            type="button"
            onClick={onCheckout}
            className={`${WS_CTA} gap-3.5 whitespace-nowrap rounded-xl py-2 pl-[22px] pr-2 text-base sm:text-[17px]`}
          >
            Inscribirme
            <span className={`${WS_CTA_CAPSULE} rounded-lg px-3.5 py-2.5`}>
              {formatPrice(price)} MXN →
            </span>
          </button>
        )}
        <span className="mt-3 text-xs text-[#9AA0A8]">Pago único · Pago seguro vía Stripe</span>
      </div>
    </section>
  );
};

export default WorkshopFinalCta;
