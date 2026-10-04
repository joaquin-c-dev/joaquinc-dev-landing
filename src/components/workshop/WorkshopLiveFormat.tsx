import { Download, MessageCircleQuestion, RefreshCw, Video, type LucideIcon } from "lucide-react";
import { WS_CARD, WS_CONTAINER, WS_EYEBROW, WS_H2 } from "./workshop-styles";

interface WorkshopLiveFormatProps {
  /** Versión de esta edición ("Spring Boot 4"); sin ella el punto queda genérico. */
  stackLabel?: string;
}

interface LiveFormatItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * "No es un curso grabado": lo que diferencia al taller de Udemy/YouTube, justo después
 * de la compra para quien duda en la primera pantalla.
 */
const WorkshopLiveFormat = ({ stackLabel }: WorkshopLiveFormatProps) => {
  const items: LiveFormatItem[] = [
    {
      Icon: Video,
      title: "En vivo, no grabado",
      description: "Programas conmigo en tiempo real, paso a paso, en la misma sesión.",
    },
    {
      Icon: MessageCircleQuestion,
      title: "Preguntas al momento",
      description: "Resolvemos tus dudas mientras construimos la API, no días después.",
    },
    {
      Icon: Download,
      title: "La grabación es tuya",
      description: "Al terminar la descargas y te la quedas de por vida para repasar.",
    },
    {
      Icon: RefreshCw,
      title: "Versiones actuales",
      description: stackLabel
        ? `Siempre las últimas versiones estables: en este taller, ${stackLabel}.`
        : "Siempre las últimas versiones estables publicadas.",
    },
  ];

  return (
    <section className={`${WS_CONTAINER} pb-14 md:pb-[88px]`}>
      <div className="mb-6 flex flex-col gap-3.5 md:mb-8">
        <span className={WS_EYEBROW}>100% EN VIVO</span>
        <h2 className={WS_H2}>No es un curso grabado</h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {items.map(({ Icon, title, description }) => (
          <li key={title} className={`${WS_CARD} flex items-start gap-3.5 p-5`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[rgba(255,198,109,0.12)] text-[#ffc66d]">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{title}</span>
              <span className="text-[15px] leading-[1.5] text-[#9aa3ae]">{description}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorkshopLiveFormat;
