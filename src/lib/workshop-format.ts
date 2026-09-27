/**
 * Formateo de fechas, horas y precios para la página de talleres.
 * Todo se deriva de `startsAt` / `endsAt` (ISO con zona de CDMX) del agendado más
 * próximo, así cualquier taller nuevo muestra su fecha sin tocar código.
 */

const CDMX_TIME_ZONE = "America/Mexico_City";

function formatPart(iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString("es-MX", {
    ...options,
    timeZone: CDMX_TIME_ZONE,
  });
}

/** Hora (0-23) en CDMX. `startsAt`/`endsAt` ya vienen con offset de CDMX. */
export function getCdmxHour(iso: string): number {
  return Number(iso.slice(11, 13));
}

/** "9:00–14:00" */
export function formatHourRange(startsAt: string, endsAt: string): string {
  return `${getCdmxHour(startsAt)}:00–${getCdmxHour(endsAt)}:00`;
}

/** "sábado" */
export function formatWeekday(startsAt: string): string {
  return formatPart(startsAt, { weekday: "long" });
}

/** Badge del hero: "SÁB 3 OCT · 9:00–14:00 CDMX" */
export function formatWorkshopBadgeDate(startsAt: string, endsAt: string): string {
  const weekday = formatPart(startsAt, { weekday: "short" });
  const day = formatPart(startsAt, { day: "numeric" });
  const month = formatPart(startsAt, { month: "short" });
  return `${weekday} ${day} ${month} · ${formatHourRange(startsAt, endsAt)} CDMX`.toUpperCase();
}

/** Encabezado del CTA final: "SÁBADO 3 DE OCTUBRE · 9:00–14:00 CDMX" */
export function formatWorkshopLongDate(startsAt: string, endsAt: string): string {
  const weekday = formatPart(startsAt, { weekday: "long" });
  const day = formatPart(startsAt, { day: "numeric" });
  const month = formatPart(startsAt, { month: "long" });
  return `${weekday} ${day} de ${month} · ${formatHourRange(startsAt, endsAt)} CDMX`.toUpperCase();
}

/** Texto corrido: "sábado 3 de octubre" (p. ej. para mensajes de WhatsApp). */
export function formatWorkshopDay(startsAt: string): string {
  const weekday = formatPart(startsAt, { weekday: "long" });
  const day = formatPart(startsAt, { day: "numeric" });
  const month = formatPart(startsAt, { month: "long" });
  return `${weekday} ${day} de ${month}`;
}

/** Barra fija: "Sáb 3 oct · 9:00 CDMX · en vivo" */
export function formatWorkshopShortDate(startsAt: string): string {
  const weekday = formatPart(startsAt, { weekday: "short" });
  const day = formatPart(startsAt, { day: "numeric" });
  const month = formatPart(startsAt, { month: "short" });
  const weekdayLabel = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${weekdayLabel} ${day} ${month} · ${getCdmxHour(startsAt)}:00 CDMX · en vivo`;
}

/** Hora de inicio de un módulo del temario: "09:00", "10:00"… */
export function formatAgendaHour(startHour: number, hoursBefore: number): string {
  const hour = startHour + hoursBefore;
  return `${String(hour).padStart(2, "0")}:00`;
}

/** "$599" */
export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
