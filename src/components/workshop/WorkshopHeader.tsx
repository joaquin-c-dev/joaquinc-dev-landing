import { WS_CONTAINER, WS_CTA, WS_CTA_CAPSULE, WS_FONT_CODE } from "./workshop-styles";

interface WorkshopHeaderProps {
  title: string;
  priceLabel: string;
  /** Fecha y hora corta del taller ("Sáb 10 oct · 9:00 CDMX"). */
  subtitle?: string;
  onCheckout?: () => void;
}

/**
 * Barra fija superior del taller (handoff "CTA 3a"): la fecha a la izquierda y el botón
 * de compra con el precio en una cápsula. Es el único CTA fijo de la página (casi todo
 * el tráfico llega en celular desde Instagram/Facebook).
 */
const WorkshopHeader = ({ title, priceLabel, subtitle, onCheckout }: WorkshopHeaderProps) => (
  <header className="sticky top-0 z-20 border-b border-[#22262C] bg-[rgba(14,16,19,0.94)] backdrop-blur-[12px]">
    <div className={`${WS_CONTAINER} flex items-center justify-between gap-4 py-3`}>
      <span className="min-w-0 truncate text-[13px] text-[#9AA0A8]">{subtitle ?? title}</span>
      {onCheckout && (
        <button
          type="button"
          onClick={onCheckout}
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
