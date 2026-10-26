import { WS_CTA } from "@/components/workshop/workshop-styles";
import { formatPrice } from "@/lib/workshop-format";

interface CourseStickyBarProps {
  price: number;
}

/**
 * Barra fija en celular con el CTA, visible cuando ya pasaste el hero y todavía no llegas a la
 * tarjeta de precio (`scripts/course-sticky.ts` la muestra y la esconde). Mientras se ve, el botón
 * de WhatsApp sube para quedar encima de ella (regla en index.css).
 */
const CourseStickyBar = ({ price }: CourseStickyBarProps) => (
  <div
    data-sticky-cta
    aria-hidden="true"
    className="pointer-events-none fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-white/10 bg-[#0b0d10]/95 px-4 py-3 opacity-0 backdrop-blur transition-[transform,opacity] duration-300 data-[visible=true]:pointer-events-auto data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 md:hidden"
  >
    <a href="#precio" tabIndex={-1} className={`${WS_CTA} w-full justify-between gap-2 rounded-xl px-4 text-[15px]`}>
      Aparta tu lugar
      <span className="font-extrabold">{formatPrice(price)} MXN</span>
    </a>
  </div>
);

export default CourseStickyBar;
