import { Lock } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { HOME_CONTAINER } from "@/components/home/home-theme";

/**
 * Encabezado mínimo de pago y confirmación: solo el logo (al inicio) y el aviso de pago seguro.
 * Sin menú, para no sacar a nadie del proceso de pago.
 */
const PurchaseHeader = ({ secureNote = true }: { secureNote?: boolean }) => (
  <header className="border-b border-white/[0.07]">
    <div className={`${HOME_CONTAINER} flex h-16 items-center justify-between`}>
      <a href="/" aria-label="joaquinc.dev, ir al inicio">
        <img src={ASSETS.brandLogo} alt="" width={54} height={48} className="h-11 w-auto" />
      </a>
      {secureNote && (
        <span className="inline-flex items-center gap-1.5 text-[13px] text-[#9da3ad]">
          <Lock className="h-3.5 w-3.5" aria-hidden />
          Pago seguro con Stripe
        </span>
      )}
    </div>
  </header>
);

export default PurchaseHeader;
