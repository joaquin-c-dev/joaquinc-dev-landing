import { ArrowRight } from "lucide-react";
import { formatPrice, formatWeekday, formatWorkshopLongDate } from "@/lib/workshop-format";
import { WS_BAND, WS_CTA, WS_FONT_MONO } from "./workshop-styles";

interface WorkshopFinalCtaProps {
  price: number;
  startsAt?: string;
  endsAt?: string;
  headline?: string;
  onCheckout?: () => void;
}

const WorkshopFinalCta = ({ price, startsAt, endsAt, headline, onCheckout }: WorkshopFinalCtaProps) => {
  const title =
    headline ??
    (startsAt ? `Aparta tu lugar para este ${formatWeekday(startsAt)}.` : "Aparta tu lugar en el taller.");

  return (
    <section className={WS_BAND}>
      <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-6 px-6 py-16 md:py-24 text-center">
        {startsAt && endsAt && (
          <span className={`${WS_FONT_MONO} text-[12.5px] tracking-[0.04em] text-[#9aa3ae]`}>
            {formatWorkshopLongDate(startsAt, endsAt)}
          </span>
        )}
        <h2 className="text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
          {title}
        </h2>
        {onCheckout && (
          <button
            type="button"
            onClick={onCheckout}
            className={`${WS_CTA} rounded-[10px] px-8 py-[18px] text-[17px]`}
          >
            Inscribirme por {formatPrice(price)} MXN <ArrowRight className="h-4 w-4" />
          </button>
        )}
        <span className="text-[13px] text-[#8a929c]">Pago único · Pago seguro vía Stripe</span>
      </div>
    </section>
  );
};

export default WorkshopFinalCta;
