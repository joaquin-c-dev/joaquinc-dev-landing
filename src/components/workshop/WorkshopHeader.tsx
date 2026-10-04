import { WS_CONTAINER, WS_CTA } from "./workshop-styles";

interface WorkshopHeaderProps {
  title: string;
  priceLabel: string;
  /** Fecha y hora corta del taller ("Sáb 10 oct · 9:00 CDMX · en vivo"). */
  subtitle?: string;
  onCheckout?: () => void;
}

/**
 * Barra fija superior del taller: precio, fecha y botón de compra siempre a la vista.
 * Reemplaza al header con el nombre y a la barra inferior, para tener un solo CTA fijo
 * (casi todo el tráfico llega en celular desde Instagram/Facebook).
 *
 * También ajusta el botón flotante de WhatsApp en celular, más chico y pegado a la
 * orilla para que tape menos texto, usando su atributo `data-whatsapp-button`.
 */
const WHATSAPP_MOBILE_CSS = `
  @media (max-width: 767px) {
    [data-whatsapp-button] { width: 48px; height: 48px; right: 16px; bottom: 16px; }
  }
`;

const WorkshopHeader = ({ title, priceLabel, subtitle, onCheckout }: WorkshopHeaderProps) => (
  <header className="sticky top-0 z-20 border-b border-white/[0.09] bg-[rgba(18,21,26,0.94)] backdrop-blur-[12px]">
    {/* Como hijo de texto, el SSR escapa las comillas (&quot;) y la hidratación falla. */}
    <style dangerouslySetInnerHTML={{ __html: WHATSAPP_MOBILE_CSS }} />
    <div className={`${WS_CONTAINER} flex items-center justify-between gap-4 py-2.5`}>
      <div className="flex min-w-0 flex-col">
        {/* En celular el título no cabe: basta con el precio y la fecha. */}
        <span className="flex min-w-0 text-[15px] font-semibold">
          <span className="hidden truncate sm:inline">{title}&nbsp;·&nbsp;</span>
          <span className="shrink-0 whitespace-nowrap">{priceLabel} MXN</span>
        </span>
        {subtitle && <span className="truncate text-[13px] text-[#9aa3ae]">{subtitle}</span>}
      </div>
      {onCheckout && (
        <button
          type="button"
          onClick={onCheckout}
          className={`${WS_CTA} shrink-0 whitespace-nowrap rounded-[9px] px-5 py-2.5`}
        >
          Inscribirme
        </button>
      )}
    </div>
  </header>
);

export default WorkshopHeader;
