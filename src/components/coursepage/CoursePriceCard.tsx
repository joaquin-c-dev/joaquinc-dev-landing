import { ArrowRight, Check, Lock } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { CheckoutProvider, getCurrentPrice, useCheckout } from "@/components/checkout/CheckoutContext";
import { PromoCountdownProvider, usePromoCountdown } from "@/contexts/PromoCountdownContext";
import { formatDurationHours } from "@/lib/course-formatters";
import { getCourseTransferUrl } from "@/lib/course-whatsapp";
import { formatPrice } from "@/lib/workshop-format";
import { useOpensInSameTab } from "@/lib/mobile-navigation";
import { WS_CTA, WS_CTA_CAPSULE, WS_CTA_GLOW, WS_CTA_LINK } from "@/components/workshop/workshop-styles";

interface CoursePriceCardProps {
  course: Course;
  /** Inicio del siguiente grupo, para el mensaje de transferencia. */
  nextStartsAt?: string;
  apiBaseUrl?: string;
}

/** Los meses sin intereses que ofrece Stripe con tarjetas de crédito mexicanas. */
const MAX_INSTALLMENTS = 12;

/**
 * Isla de la tarjeta de precio: un solo precio (el que se cobra), lo que cuesta al mes con meses
 * sin intereses, cuenta regresiva solo si hay promo vigente, y un botón al formulario de pago.
 * Reemplaza los tres "planes" anteriores, que en realidad eran el mismo pago.
 */
const CoursePriceCard = ({ course, nextStartsAt, apiBaseUrl }: CoursePriceCardProps) => (
  <CheckoutProvider course={course} apiBaseUrl={apiBaseUrl}>
    <PromoCountdownProvider endsAt={course.promo?.endsAt}>
      <PriceCard course={course} nextStartsAt={nextStartsAt} />
    </PromoCountdownProvider>
  </CheckoutProvider>
);

const PriceCard = ({ course, nextStartsAt }: Omit<CoursePriceCardProps, "apiBaseUrl">) => {
  const { openCheckout, canCheckout } = useCheckout();
  const { timeLeft, formatNumber } = usePromoCountdown();
  const sameTab = useOpensInSameTab();
  const price = getCurrentPrice(course);
  const savings = course.regularPrice != null && course.regularPrice > price ? course.regularPrice - price : 0;
  const monthly = Math.ceil(price / MAX_INSTALLMENTS);
  const transferUrl = getCourseTransferUrl(course.title, nextStartsAt);
  const includes = [
    `${formatDurationHours(course.durationInHours)} de clases en vivo por Zoom`,
    "Grabación de cada clase",
    "Grupo de WhatsApp para dudas entre clases",
    "Proyecto real para tu portafolio",
  ];

  return (
    <div className="grid overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#12151a] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] md:grid-cols-[1.15fr_1fr]">
      <div className="p-5 sm:p-8">
        <p className="text-[12.5px] font-medium uppercase tracking-[0.08em] text-[#9da3ad]">Inversión total</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="text-[40px] font-bold leading-none tracking-[-0.03em] text-white tabular-nums sm:text-[44px]">
            {formatPrice(price)}
          </span>
          <span className="text-[16px] text-[#9da3ad]">MXN</span>
          {savings > 0 && (
            <span className="text-[15px] text-[#8b919b]">
              <s>{formatPrice(course.regularPrice!)}</s>
              <span className="ml-2 rounded-md bg-[#3ccf7a]/15 px-2 py-0.5 text-[13px] font-semibold text-[#7ee2a8]">
                Ahorras {formatPrice(savings)}
              </span>
            </span>
          )}
        </div>
        <p className="mt-4 text-[15.5px] leading-[1.5] text-[#d5d8dd] sm:text-[16px]">
          o desde <strong className="font-semibold text-[#ffc66d]">{formatPrice(monthly)} al mes</strong> con hasta{" "}
          {MAX_INSTALLMENTS} meses sin intereses
        </p>

        {!timeLeft.isExpired && (
          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-[#ffc66d]/25 bg-[#ffc66d]/[0.06] px-4 py-3">
            <span className="text-[13.5px] text-[#ffc66d]">El precio especial termina en</span>
            <span className="flex gap-1.5 font-['JetBrains_Mono',ui-monospace,monospace] text-[14px] text-white tabular-nums">
              {[
                [timeLeft.days, "d"],
                [timeLeft.hours, "h"],
                [timeLeft.minutes, "m"],
                [timeLeft.seconds, "s"],
              ].map(([value, unit]) => (
                <span key={unit} className="rounded-md bg-black/30 px-1.5 py-0.5">
                  {formatNumber(value as number)}
                  {unit}
                </span>
              ))}
            </span>
          </div>
        )}

        {canCheckout ? (
          <button
            type="button"
            onClick={openCheckout}
            className={`${WS_CTA} ${WS_CTA_GLOW} mt-6 min-h-[52px] w-full justify-center gap-3 whitespace-nowrap rounded-xl px-5 text-[16px] sm:justify-between sm:py-2 sm:pl-5 sm:pr-2`}
          >
            Aparta tu lugar
            {/* En celular el precio ya está justo arriba: el botón queda en una línea. */}
            <ArrowRight className="h-4 w-4 sm:hidden" aria-hidden />
            <span className={`${WS_CTA_CAPSULE} hidden rounded-lg px-3.5 py-2.5 font-extrabold sm:inline`}>
              {formatPrice(price)} MXN →
            </span>
          </button>
        ) : (
          <a
            href={transferUrl}
            target={sameTab ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`${WS_CTA} ${WS_CTA_GLOW} mt-6 w-full justify-center gap-2 rounded-xl px-5 text-[16px]`}
          >
            Aparta tu lugar por WhatsApp
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        )}
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[13px] text-[#8b919b]">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>
            Pago seguro con Stripe<span className="hidden sm:inline"> · tarjeta de crédito o débito</span>
          </span>
        </p>
        <p className="mt-2 text-center">
          <a
            href={transferUrl}
            target={sameTab ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`${WS_CTA_LINK} inline-flex min-h-[44px] items-center text-[14.5px]`}
          >
            ¿Sin tarjeta? Paga por transferencia →
          </a>
        </p>
      </div>

      <div className="border-t border-white/[0.07] bg-[#0e1014] p-5 sm:p-8 md:border-l md:border-t-0">
        <p className="text-[15px] font-semibold text-white">Incluye</p>
        <ul className="mt-4 space-y-3 text-[15px] text-[#d5d8dd]">
          {includes.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ffc66d]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border border-white/[0.07] p-4 text-[14px] leading-[1.55] text-[#9da3ad]">
          <p className="font-medium text-[#d5d8dd]">¿Cómo funcionan los meses sin intereses?</p>
          <p className="mt-1">
            En el pago con tarjeta de crédito eliges 3, 6, 9 o {MAX_INSTALLMENTS} meses, según tu banco. Pagas lo
            mismo que de contado, repartido en mensualidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePriceCard;
