import { forwardRef } from "react";
import { Check } from "lucide-react";
import { formatDurationHours } from "@/lib/course-formatters";
import { useOpensInSameTab } from "@/lib/mobile-navigation";
import { formatPrice } from "@/lib/workshop-format";
import WorkshopCountdown from "./WorkshopCountdown";
import { WS_CTA, WS_CTA_CAPSULE, WS_CTA_GLOW, WS_CTA_LINK, WS_FONT_CODE } from "./workshop-styles";

interface WorkshopBuyCardProps {
  price: number;
  /** Precio original tachado, solo si hay descuento. */
  regularPrice?: number;
  durationInHours: number;
  startsAt?: string;
  onCheckout?: () => void;
  /** WhatsApp para pedir los datos bancarios, para quien no paga con tarjeta. */
  transferUrl?: string;
}

/**
 * Tarjeta de compra del hero. En celular
 * el botón va justo debajo del precio para que ambos quepan en la primera pantalla;
 * en escritorio (`lg`) el orden es precio → cuenta regresiva → beneficios → botón.
 */
const WorkshopBuyCard = forwardRef<HTMLDivElement, WorkshopBuyCardProps>(
  ({ price, regularPrice, durationInHours, startsAt, onCheckout, transferUrl }, ref) => {
    const sameTab = useOpensInSameTab();
    const discountPercent =
      regularPrice != null && regularPrice > price
        ? Math.round((1 - price / regularPrice) * 100)
        : null;
    const benefits = [
      `${formatDurationHours(durationInHours)} de taller en vivo`,
      "Proyecto práctico guiado paso a paso",
      "Resuelves tus dudas en vivo con el instructor",
      "Pago único, sin mensualidades",
    ];

    return (
      <div
        ref={ref}
        className="flex flex-col gap-5 rounded-[14px] border border-[#262A30] bg-[#14171B] p-4 min-[360px]:p-[22px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-8 lg:gap-6"
      >
        {/* El precio va en el botón; aquí solo el ancla del precio normal y el descuento. */}
        {regularPrice != null && (
          <div className="order-1 flex items-baseline justify-between gap-3">
            <span className="text-sm text-[#9AA0A8]">
              Precio normal <s>{formatPrice(regularPrice)}</s>
            </span>
            {discountPercent != null && (
              <span className={`${WS_FONT_CODE} text-xs text-[#8FC8FF]`}>-{discountPercent}%</span>
            )}
          </div>
        )}

        {startsAt && (
          <div className="order-4 lg:order-2">
            <WorkshopCountdown startsAt={startsAt} />
          </div>
        )}

        <ul className="order-5 flex flex-col gap-3 text-[15px] text-[#d5dae0] lg:order-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5">
              <Check className="mt-[3px] h-4 w-4 shrink-0 text-[#ffc66d]" />
              {benefit}
            </li>
          ))}
        </ul>

        {onCheckout && (
          <button
            type="button"
            onClick={onCheckout}
            className={`${WS_CTA} ${WS_CTA_GLOW} order-2 w-full justify-between gap-3 whitespace-nowrap rounded-xl py-2 pl-4 pr-2 text-[15px] min-[360px]:text-base sm:pl-[22px] sm:text-[17px] lg:order-4`}
          >
            Apartar mi lugar
            <span className={`${WS_CTA_CAPSULE} rounded-lg px-3 py-2.5 font-extrabold sm:px-3.5`}>
              {formatPrice(price)} MXN
              {/* En pantallas de 320px la flecha no cabe sin partir el botón. */}
              <span className="hidden min-[360px]:inline"> →</span>
            </span>
          </button>
        )}
        <div className="order-3 -mt-2 flex flex-col items-center gap-1.5 text-center lg:order-5 lg:mt-0">
          <span className="text-[13px] text-[#9AA0A8]">Pago único · tarjeta vía Stripe</span>
          {transferUrl && (
            <a
              href={transferUrl}
              target={sameTab ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`${WS_CTA_LINK} text-sm`}
            >
              ¿Prefieres hacer tu inversión por transferencia? →
            </a>
          )}
        </div>
      </div>
    );
  },
);

WorkshopBuyCard.displayName = "WorkshopBuyCard";

export default WorkshopBuyCard;
