import { forwardRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { formatDurationHours } from "@/lib/course-formatters";
import { useOpensInSameTab } from "@/lib/mobile-navigation";
import { formatPrice } from "@/lib/workshop-format";
import WorkshopCountdown from "./WorkshopCountdown";
import { WS_CTA, WS_LINK } from "./workshop-styles";

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
    const benefits = [
      `${formatDurationHours(durationInHours)} de taller en vivo`,
      "Proyecto práctico guiado paso a paso",
      "Resuelves tus dudas en vivo con el instructor",
      "Pago único, sin mensualidades",
    ];

    return (
      <div
        ref={ref}
        className="flex flex-col gap-5 rounded-2xl border border-white/[0.09] bg-[#12151a] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-8 lg:gap-6"
      >
        <div className="order-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          {regularPrice != null && (
            <span className="text-lg text-[#8a929c] line-through">
              {formatPrice(regularPrice)}
            </span>
          )}
          <span className="text-[44px] font-bold leading-none tracking-[-0.03em] md:text-[52px]">
            {formatPrice(price)}
          </span>
          <span className="text-[15px] text-[#9aa3ae]">MXN · pago único</span>
        </div>

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
            className={`${WS_CTA} order-2 w-full rounded-[10px] p-4 text-base lg:order-4`}
          >
            Apartar mi lugar <ArrowRight className="h-4 w-4" />
          </button>
        )}
        <div className="order-3 -mt-2 flex flex-col items-center gap-1.5 text-center text-[13px] lg:order-5 lg:mt-0">
          <span className="text-[#8a929c]">Pago seguro con tarjeta vía Stripe</span>
          {transferUrl && (
            <a
              href={transferUrl}
              target={sameTab ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`${WS_LINK} text-sm`}
            >
              ¿Prefieres pagar por transferencia? →
            </a>
          )}
        </div>
      </div>
    );
  },
);

WorkshopBuyCard.displayName = "WorkshopBuyCard";

export default WorkshopBuyCard;
