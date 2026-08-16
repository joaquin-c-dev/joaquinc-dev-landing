declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
  }
}

interface CheckoutSessionSummary {
  amount: number;
  currency: string;
  scheduledCourseId?: string;
}

/**
 * El backend manda el mismo Purchase por la Conversions API usando el id de sesión de Stripe
 * como event_id. Mandar aquí ese mismo id en eventID es lo que permite a Meta reconocer que
 * ambos son la misma compra y contarla una sola vez.
 */
const STORAGE_PREFIX = "meta_purchase_sent:";

function alreadyTracked(sessionId: string): boolean {
  try {
    return sessionStorage.getItem(STORAGE_PREFIX + sessionId) !== null;
  } catch {
    // Modo privado o storage bloqueado: no es motivo para perder el evento
    return false;
  }
}

function markTracked(sessionId: string): void {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + sessionId, "1");
  } catch {
    // sin storage simplemente no se marca; Meta deduplica por eventID de todos modos
  }
}

async function fetchSessionSummary(
  apiBaseUrl: string,
  sessionId: string,
): Promise<CheckoutSessionSummary | null> {
  const response = await fetch(
    `${apiBaseUrl}/payment/v1/checkout-session/${encodeURIComponent(sessionId)}`,
  );
  if (!response.ok) return null;
  return (await response.json()) as CheckoutSessionSummary;
}

/**
 * Dispara el Purchase del pixel en la página de gracias.
 *
 * El monto se consulta al backend porque Stripe solo devuelve el id de sesión en la URL de
 * retorno. Sin el monto el evento del navegador podría ganarle al del servidor en la
 * deduplicación de Meta y dejar la compra registrada sin valor.
 */
export async function trackPurchaseFromStripeSession(apiBaseUrl: string): Promise<void> {
  if (typeof window === "undefined" || !window.fbq) return;

  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  if (!sessionId || alreadyTracked(sessionId)) return;

  const summary = await fetchSessionSummary(apiBaseUrl, sessionId);
  if (!summary) return;

  const params: Record<string, unknown> = {
    value: summary.amount,
    currency: summary.currency,
    content_type: "product",
  };
  if (summary.scheduledCourseId) {
    params.content_ids = [summary.scheduledCourseId];
  }

  window.fbq("track", "Purchase", params, { eventID: sessionId });
  markTracked(sessionId);
}
