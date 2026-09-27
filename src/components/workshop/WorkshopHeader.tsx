import { useBanner } from "@/contexts/BannerContext";
import { WS_CONTAINER, WS_CTA } from "./workshop-styles";

interface WorkshopHeaderProps {
  priceLabel: string;
  onCheckout?: () => void;
  /** El contexto del banner arranca en "visible" aunque no se pinte ninguno. */
  hasPromoBanner?: boolean;
}

/**
 * Header del taller: más simple que `Navigation` (sin menú de cursos) para no
 * distraer de la compra, con el CTA siempre visible.
 */
const WorkshopHeader = ({ priceLabel, onCheckout, hasPromoBanner = false }: WorkshopHeaderProps) => {
  const { isBannerVisible } = useBanner();
  const offsetForBanner = hasPromoBanner && isBannerVisible;

  return (
    <header
      className={`sticky ${offsetForBanner ? "top-[40px]" : "top-0"} z-20 border-b border-white/[0.07] bg-[rgba(11,13,16,0.85)] backdrop-blur-[12px]`}
    >
      <div className={`${WS_CONTAINER} flex items-center justify-between py-3.5`}>
        <a href="/" className="text-[15px] font-semibold text-[#eceef1]">
          Joaquín Coronado
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="/" className="hidden text-[#9aa3ae] hover:text-[#eceef1] sm:inline">
            Inicio
          </a>
          <a
            href="/acerca-de-mi"
            className="hidden text-[#9aa3ae] hover:text-[#eceef1] sm:inline"
          >
            Acerca de mí
          </a>
          {onCheckout && (
            <button
              type="button"
              onClick={onCheckout}
              className={`${WS_CTA} rounded-lg px-3.5 py-2`}
            >
              Inscribirme · {priceLabel}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default WorkshopHeader;
