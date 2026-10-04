import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import type { Course } from "@/lib/course-types";
import { INTERNET_REQUIREMENT, type WorkshopFaqItem } from "@/lib/workshop-content";
import { useOpensInSameTab } from "@/lib/mobile-navigation";
import { formatPrice } from "@/lib/workshop-format";
import { getQuestionWhatsappUrl } from "@/lib/workshop-whatsapp";
import { WS_H2, WS_LINK } from "./workshop-styles";

interface WorkshopFaqProps {
  course: Course;
  price: number;
  /** WhatsApp para pedir los datos bancarios (el mismo que usa la tarjeta de compra). */
  transferUrl: string;
  extraFaq?: WorkshopFaqItem[];
}

interface FaqEntry {
  question: string;
  answer: ReactNode;
}

/** El mismo verde y logo del botón flotante de WhatsApp, para que se reconozca. */
const WHATSAPP_CTA =
  "inline-flex items-center gap-2 self-start rounded-[10px] px-4 py-2.5 text-[15px] font-semibold " +
  "text-white bg-[linear-gradient(135deg,#25D366,#128C7E)] transition-opacity hover:opacity-90";

/**
 * Las preguntas de lugar, equipo y pago se arman con datos del curso; las propias de
 * cada taller vienen del contenido del taller y van en medio.
 */
const WorkshopFaq = ({ course, price, transferUrl, extraFaq = [] }: WorkshopFaqProps) => {
  const equipment = course.prerequisites?.equipment ?? [];
  const priceLabel = `${formatPrice(price)} MXN`;
  const questionUrl = getQuestionWhatsappUrl(course.title);
  const sameTab = useOpensInSameTab();
  const linkTarget = sameTab ? undefined : "_blank";

  const entries: FaqEntry[] = [
    {
      question: "¿Dónde es el taller?",
      answer:
        "Es en línea y en vivo. Después de pagar recibes por correo el enlace de acceso.",
    },
    {
      question: "¿Puedo hacer preguntas durante el taller?",
      answer:
        "Sí, para eso es en vivo: preguntas en cualquier momento y resolvemos las dudas mientras programamos, no en un foro días después.",
    },
    {
      question: "¿Se graba el taller?",
      answer:
        "Sí. Al terminar te comparto la grabación para que la descargues y te la quedes de por vida para repasar. Descárgala en cuanto la recibas.",
    },
    ...(equipment.length
      ? [
          {
            question: "¿Qué equipo necesito?",
            answer: (
              <ul className="flex list-disc flex-col gap-1 pl-5">
                {[...equipment, INTERNET_REQUIREMENT].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...extraFaq,
    {
      question: "¿Cómo pago?",
      answer: (
        <div className="flex flex-col gap-4">
          <p>Tienes dos opciones, las dos en un solo pago de {priceLabel}, sin mensualidades:</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>
              <span className="font-medium text-[#d5dae0]">Con tarjeta</span> de crédito o débito
              a través de Stripe.
            </li>
            <li>
              <span className="font-medium text-[#d5dae0]">Por transferencia bancaria:</span>{" "}
              escríbeme por WhatsApp y te comparto los datos de la cuenta.
            </li>
          </ul>
          <a href={transferUrl} target={linkTarget} rel="noopener noreferrer" className={WHATSAPP_CTA}>
            <img src={ASSETS.whatsappLogo} alt="" className="h-5 w-5" />
            Pedir datos para transferir
          </a>
        </div>
      ),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-14 pt-6 md:pb-[88px] md:pt-10">
      <h2 className={`${WS_H2} mb-8`}>Preguntas frecuentes</h2>

      <AccordionPrimitive.Root type="multiple">
        {entries.map((entry) => (
          <AccordionPrimitive.Item
            key={entry.question}
            value={entry.question}
            className="border-b border-white/[0.08]"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-medium data-[state=open]:pb-[14px]">
                {entry.question}
                <Plus className="h-5 w-5 shrink-0 text-[#ffc66d] transition-transform duration-200 group-data-[state=open]:rotate-45" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            {/* forceMount: las respuestas van en el HTML aunque estén cerradas (Google y
                los buscadores de IA las leen); cerradas se ocultan con CSS. */}
            <AccordionPrimitive.Content
              forceMount
              className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down">
              <div className="pb-5 leading-[1.6] text-[#aab2bc]">{entry.answer}</div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>

      <p className="mt-8 text-[#9aa3ae]">
        ¿Otra duda?{" "}
        <a href={questionUrl} target={linkTarget} rel="noopener noreferrer" className={WS_LINK}>
          Escríbeme por WhatsApp →
        </a>
      </p>
    </section>
  );
};

export default WorkshopFaq;
