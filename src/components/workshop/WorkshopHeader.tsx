import { ASSETS } from "@/lib/assets";
import { WS_CONTAINER, WS_CTA, WS_CTA_CAPSULE, WS_FONT_CODE } from "./workshop-styles";

interface WorkshopHeaderProps {
  title: string;
  priceLabel: string;
  /** Fecha y hora corta del taller ("Sáb 10 oct · 9:00 CDMX"). */
  subtitle?: string;
  /** Si hay forma de pagar: el botón abre el formulario (ver `CheckoutTrigger`). */
  canCheckout?: boolean;
}

/**
 * Barra fija superior del taller (handoff "CTA 3a"): la fecha a la izquierda y el botón
 * de compra con el precio en una cápsula. El logo lleva al inicio del sitio. Es el único CTA fijo de la página (casi todo
 * el tráfico llega en celular desde Instagram/Facebook).
 */
const WorkshopHeader = ({ title, priceLabel, subtitle, canCheckout = false }: WorkshopHeaderProps) => (
  <header className="sticky top-0 z-20 border-b border-[#22262C] bg-[rgba(14,16,19,0.94)] backdrop-blur-[12px]">
    <div className={`${WS_CONTAINER} flex items-center justify-between gap-4 py-3`}>
      <div className="flex min-w-0 items-center gap-3">
        <a href="/" aria-label="joaquinc.dev, ir al inicio" className="shrink-0">
          <img src={ASSETS.brandLogo} alt="" width={54} height={48} className="h-10 w-auto" />
        </a>
        <span className="min-w-0 truncate text-[13px] text-[#9AA0A8]">{subtitle ?? title}</span>
      </div>
      {canCheckout && (
        <button
          type="button"
          data-checkout-trigger
          className={`${WS_CTA} shrink-0 gap-2.5 whitespace-nowrap rounded-[10px] py-1.5 pl-3.5 pr-1.5 text-sm`}
        >
          Inscribirme
          <span
            className={`${WS_CTA_CAPSULE} ${WS_FONT_CODE} rounded-md px-[9px] py-1 text-xs font-medium`}
          >
            {priceLabel}
          </span>
        </button>
      )}
    </div>
  </header>
);

export default WorkshopHeader;
