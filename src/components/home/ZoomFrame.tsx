import { Video } from "lucide-react";
import type { ClassPhoto } from "@/lib/class-photos";

interface ZoomFrameProps {
  photo: ClassPhoto;
  live?: boolean;
  /** Load immediately (above the fold) instead of lazily. */
  eager?: boolean;
  className?: string;
}

/**
 * Ventana estilo Zoom para las capturas reales de clase. La captura ya trae los cuadros y
 * nombres de Zoom, así que se muestra completa y el pie va debajo, no encima. Es HTML sin
 * JavaScript: el contenedor 16:9 reserva el espacio para que la página no brinque al cargar.
 */
const ZoomFrame = ({ photo, live = false, eager = false, className = "" }: ZoomFrameProps) => (
  <figure
    className={`overflow-hidden rounded-xl border border-white/10 bg-[#121417] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ${className}`}
  >
    <div className="flex items-center justify-between bg-[#1f2125] px-3 py-1.5 text-[11.5px] text-[#a6a8ad]">
      <span className="inline-flex items-center gap-1.5">
        <Video className="h-3.5 w-3.5 text-[#4a8cff]" aria-hidden />
        Zoom · Clase en vivo
      </span>
      {live && (
        <span className="inline-flex items-center gap-1 rounded bg-[#e5484d] px-1.5 py-px text-[10.5px] font-semibold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />
          EN VIVO
        </span>
      )}
    </div>
    <div className="aspect-video bg-[#121417]">
      <img
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={675}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-contain"
      />
    </div>
    <figcaption className="border-t border-white/[0.06] px-3 py-2 text-[12.5px] text-[#9da3ad]">{photo.caption}</figcaption>
  </figure>
);

export default ZoomFrame;
