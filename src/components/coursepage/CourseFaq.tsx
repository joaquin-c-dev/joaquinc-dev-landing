import { ChevronDown, MessageCircle } from "lucide-react";
import type { CoursePrerequisites } from "@/lib/course-types";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "@/components/home/home-theme";

interface CourseFaqProps {
  prerequisites?: CoursePrerequisites;
  questionUrl: string;
}

/**
 * Preguntas frecuentes generales de los cursos, con `<details>` (sin JavaScript). La de
 * experiencia previa enlaza al curso recomendado cuando el curso tiene uno.
 */
const CourseFaq = ({ prerequisites, questionUrl }: CourseFaqProps) => {
  const previous = prerequisites?.prerequisiteCourseLink;
  const faq = [
    {
      question: "¿Las clases son en vivo o grabadas?",
      answer:
        "En vivo por Zoom, en el horario de tu grupo (hora del centro de México). Programas en clase y preguntas en el momento. Además, cada clase se graba para que puedas repasarla.",
    },
    {
      question: "¿Qué pasa si falto a una clase?",
      answer:
        "Te queda la grabación de esa clase y puedes resolver tus dudas en el grupo de WhatsApp del curso o al inicio de la siguiente clase.",
    },
    {
      question: "¿Necesito experiencia previa?",
      answer: previous
        ? `Revisa "Lo que necesitas" más arriba. Si todavía no tienes esas bases, te conviene empezar por el curso recomendado: ${previous.label.toLowerCase()}.`
        : 'Revisa "Lo que necesitas" más arriba: ahí está lo que conviene saber antes de empezar.',
    },
    {
      question: "¿Cómo puedo pagar?",
      answer:
        "Con tarjeta de crédito o débito en el formulario de pago (Stripe). Con tarjetas de crédito participantes puedes elegir meses sin intereses. También puedes pagar por transferencia: escríbeme por WhatsApp y te paso los datos.",
    },
    {
      question: "¿Qué necesito para tomar las clases?",
      answer:
        "Una computadora con el equipo recomendado, conexión a internet estable y Zoom instalado.",
    },
  ];
  return (
    <section className="py-24 md:py-28">
      <div className={`${HOME_CONTAINER} grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-16`}>
        <div>
          <p {...reveal(0)} className={HOME_EYEBROW}>
            {"// preguntas frecuentes"}
          </p>
          <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
            Antes de inscribirte
          </h2>
          <a
            {...reveal(140)}
            href={questionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-[#ffc66d] transition-colors hover:text-[#ffd899]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            ¿Otra duda? Escríbeme por WhatsApp
          </a>
        </div>
        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {faq.map((item, index) => (
            <details key={item.question} {...reveal(index * 60)} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[#8b919b] transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className={`pb-5 pr-8 text-[15.5px] leading-[1.65] ${HOME_MUTED}`}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFaq;
