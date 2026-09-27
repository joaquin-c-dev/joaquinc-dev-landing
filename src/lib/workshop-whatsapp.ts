/**
 * Enlaces de WhatsApp con mensaje prellenado para la página de talleres.
 * Todo se arma con datos del curso, así cada taller genera su propio mensaje.
 */
import { WHATSAPP_NUMBER } from "@/lib/workshop-content";
import { formatPrice, formatWorkshopDay } from "@/lib/workshop-format";

/** "Taller de X" -> "taller de X", para usarlo a mitad de una frase. */
function toWorkshopName(title: string): string {
  return /^taller\s/i.test(title)
    ? `${title.charAt(0).toLowerCase()}${title.slice(1)}`
    : `taller ${title}`;
}

function toWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Pedir los datos bancarios. Mismo patrón que el "plan sin tarjeta" de los cursos: se
 * piden por WhatsApp para saber quién pagó y registrarlo (correo para el Zoom, Meta CAPI).
 * Incluye taller, fecha y monto para identificar la cohorte desde el primer mensaje.
 */
export function getTransferWhatsappUrl(
  title: string,
  price: number,
  startsAt?: string,
): string {
  const cohort = startsAt ? ` del ${formatWorkshopDay(startsAt)}` : "";
  return toWhatsappUrl(
    `Hola, quiero inscribirme al ${toWorkshopName(title)}${cohort} pagando por transferencia. Por favor envíame los datos bancarios para realizar el pago de ${formatPrice(price)} MXN.`,
  );
}

/** "Hola, tengo una duda sobre el taller de X": link del FAQ y chat flotante. */
export function getQuestionWhatsappMessage(title: string): string {
  return `Hola, tengo una duda sobre el ${toWorkshopName(title)}`;
}

export function getQuestionWhatsappUrl(title: string): string {
  return toWhatsappUrl(getQuestionWhatsappMessage(title));
}
