/**
 * Enlaces de WhatsApp con mensaje prellenado para las páginas de curso (los de talleres viven
 * en `workshop-whatsapp.ts`). Incluyen el curso y el grupo para identificarlo desde el primer
 * mensaje.
 */
import { WHATSAPP_NUMBER } from "@/lib/workshop-content";
import { formatWorkshopDay } from "@/lib/workshop-format";

const toWhatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Pedir los datos bancarios para pagar por transferencia, en uno o dos pagos. */
export function getCourseTransferUrl(title: string, startsAt?: string): string {
  const cohort = startsAt ? ` del grupo que empieza el ${formatWorkshopDay(startsAt)}` : "";
  return toWhatsappUrl(
    `Hola, quiero inscribirme al curso ${title}${cohort} pagando por transferencia. Por favor envíame los datos bancarios.`,
  );
}

/** Pedir aviso cuando no hay grupo agendado. */
export function getCourseNotifyUrl(title: string): string {
  return toWhatsappUrl(`Hola, me interesa el curso ${title}. ¿Me avisas cuando abra el próximo grupo?`);
}

/** Dudas sobre el curso (FAQ y chat flotante). */
export function getCourseQuestionUrl(title: string): string {
  return toWhatsappUrl(`Hola, tengo una duda sobre el curso ${title}`);
}
