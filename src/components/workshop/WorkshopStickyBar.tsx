import { useEffect, useState, type RefObject } from "react";
import { WS_CONTAINER, WS_CTA } from "./workshop-styles";

interface WorkshopStickyBarProps {
  /** Tarjeta de compra del hero: la barra aparece cuando sale por arriba. */
  targetRef: RefObject<HTMLElement | null>;
  title: string;
  /** Va aparte del título para que en móvil se trunque el título, nunca el precio. */
  priceLabel: string;
  subtitle?: string;
  onCheckout?: () => void;
}

const STICKY_ATTR = "workshopStickyBar";

/**
 * Sube el botón flotante de WhatsApp (y su ventana) mientras la barra está visible,
 * usando su atributo `data-whatsapp-button`, sin tocar el componente.
 */
const WHATSAPP_OFFSET_CSS = `
  html[data-workshop-sticky-bar="visible"] [data-whatsapp-button] { bottom: 88px; }
  html[data-workshop-sticky-bar="visible"] [data-whatsapp-button] + div { bottom: 152px; }
`;

const WorkshopStickyBar = ({ targetRef, title, priceLabel, subtitle, onCheckout }: WorkshopStickyBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef]);

  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.dataset[STICKY_ATTR] = "visible";
    else delete root.dataset[STICKY_ATTR];
    return () => {
      delete root.dataset[STICKY_ATTR];
    };
  }, [visible]);

  if (!onCheckout) return null;

  return (
    <>
      <style>{WHATSAPP_OFFSET_CSS}</style>
      <div
        aria-hidden={!visible}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.09] bg-[rgba(18,21,26,0.94)] backdrop-blur-[12px] transition-transform duration-300 ${
          visible ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        <div className={`${WS_CONTAINER} flex items-center justify-between gap-4 py-3`}>
          <div className="flex min-w-0 flex-col">
            <span className="flex min-w-0 text-[15px] font-semibold">
              <span className="truncate">{title}</span>
              <span className="shrink-0 whitespace-nowrap">&nbsp;· {priceLabel} MXN</span>
            </span>
            {subtitle && <span className="truncate text-[13px] text-[#9aa3ae]">{subtitle}</span>}
          </div>
          <button
            type="button"
            onClick={onCheckout}
            tabIndex={visible ? 0 : -1}
            className={`${WS_CTA} shrink-0 rounded-[9px] px-5 py-3`}
          >
            Inscribirme
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkshopStickyBar;
