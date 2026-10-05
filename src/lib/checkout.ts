/**
 * Checkout con formulario: antes de pagar, la persona deja sus datos y responde 3 preguntas; la API
 * guarda el prospecto (aunque no pague) y crea la sesión de Stripe con el precio ya aplicado y su
 * correo prellenado. Aquí vive todo lo del navegador: la llamada a la API, los datos de atribución
 * (UTMs y cookies de Meta), el perfil recordado y los eventos del píxel.
 */

export const JAVA_EXPERIENCE_OPTIONS = [
  { value: "STARTING", label: "Estoy empezando" },
  { value: "LESS_THAN_ONE_YEAR", label: "Menos de 1 año" },
  { value: "ONE_TO_THREE_YEARS", label: "1 a 3 años" },
  { value: "MORE_THAN_THREE_YEARS", label: "Más de 3 años" },
] as const;

export const OCCUPATION_OPTIONS = [
  { value: "STUDENT", label: "Estudiante" },
  { value: "JAVA_DEVELOPER", label: "Trabajo como programador Java" },
  { value: "IT_NOT_JAVA", label: "Trabajo en TI, pero no con Java" },
  { value: "STUDY_AND_WORK_IN_IT", label: "Estudio y trabajo en TI" },
] as const;

export const SENIORITY_OPTIONS = [
  { value: "JUNIOR", label: "Junior" },
  { value: "MID", label: "Mid" },
  { value: "SENIOR", label: "Senior" },
  { value: "NOT_WORKING_AS_DEVELOPER", label: "Aún no trabajo como programador" },
] as const;

/** Ladas más comunes del público; México primero. */
export const PHONE_COUNTRY_CODES = [
  { code: "+52", label: "🇲🇽 +52" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+57", label: "🇨🇴 +57" },
  { code: "+54", label: "🇦🇷 +54" },
  { code: "+51", label: "🇵🇪 +51" },
  { code: "+56", label: "🇨🇱 +56" },
  { code: "+502", label: "🇬🇹 +502" },
  { code: "+34", label: "🇪🇸 +34" },
] as const;

/** Preguntas opcionales del formulario; el correo y el aviso de privacidad siempre van. */
export interface CheckoutQuestions {
  askName: boolean;
  askPhone: boolean;
  askJavaExperience: boolean;
  askOccupation: boolean;
  askSeniority: boolean;
}

export interface ResolvedCheckoutSettings extends CheckoutQuestions {
  mode: "FORM" | "PAYMENT_LINK";
}

/**
 * Configuración de pago del curso (se edita en el panel). Sin configurar = liga directa de Stripe;
 * si se activa el formulario sin preguntas guardadas, va completo, con la pregunta de Java solo en
 * cursos de Java/Spring. Mismo criterio que el panel y la API.
 */
export function resolveCheckoutSettings(course: {
  slug: string;
  title: string;
  checkout?: {
    mode?: "FORM" | "PAYMENT_LINK" | null;
    askName?: boolean | null;
    askPhone?: boolean | null;
    askJavaExperience?: boolean | null;
    askOccupation?: boolean | null;
    askSeniority?: boolean | null;
  } | null;
}): ResolvedCheckoutSettings {
  const checkout = course.checkout ?? {};
  const isJavaCourse = /java|spring/i.test(`${course.slug} ${course.title}`);
  return {
    mode: checkout.mode ?? "PAYMENT_LINK",
    askName: checkout.askName ?? true,
    askPhone: checkout.askPhone ?? true,
    askJavaExperience: checkout.askJavaExperience ?? isJavaCourse,
    askOccupation: checkout.askOccupation ?? true,
    askSeniority: checkout.askSeniority ?? true,
  };
}

export type JavaExperience = (typeof JAVA_EXPERIENCE_OPTIONS)[number]["value"];
export type Occupation = (typeof OCCUPATION_OPTIONS)[number]["value"];
export type Seniority = (typeof SENIORITY_OPTIONS)[number]["value"];

/** Lo que la persona escribe en el formulario; se recuerda en su navegador para la próxima vez. */
export interface CheckoutProfile {
  name: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  javaExperience?: JavaExperience;
  occupation?: Occupation;
  seniority?: Seniority;
  whatsappContactAccepted: boolean;
}

export interface CheckoutSessionResult {
  leadId: string;
  checkoutUrl: string;
  leadEventId: string;
  checkoutEventId: string;
}

/** Error de la API: `field` indica qué campo rechazó cuando fue un 400 de validación. */
export class CheckoutError extends Error {
  constructor(
    readonly status: number,
    readonly field?: string,
  ) {
    super(`Checkout failed with status ${status}`);
  }
}

const PROFILE_KEY = "checkout_profile";
const ATTRIBUTION_KEY = "checkout_attribution";
const ATTRIBUTION_PARAMS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type Attribution = Partial<Record<(typeof ATTRIBUTION_PARAMS)[number], string>>;

/** localStorage puede no existir (modo privado, navegadores internos): nunca debe romper el pago. */
function readJson<T>(storage: Storage | undefined, key: string): T | null {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(storage: Storage | undefined, key: string, value: unknown): void {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // sin storage simplemente no se recuerda
  }
}

const safeLocalStorage = () => (typeof window !== "undefined" ? window.localStorage : undefined);
const safeSessionStorage = () => (typeof window !== "undefined" ? window.sessionStorage : undefined);

export function loadCheckoutProfile(): CheckoutProfile | null {
  return readJson<CheckoutProfile>(safeLocalStorage(), PROFILE_KEY);
}

export function saveCheckoutProfile(profile: CheckoutProfile): void {
  writeJson(safeLocalStorage(), PROFILE_KEY, profile);
}

/**
 * Guarda los UTMs y el fbclid con los que llegó la visita (primer toque de la sesión): cuando la
 * persona llena el formulario ya navegó y la URL ya no los trae.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }
  if (Object.keys(fromUrl).length === 0) return;
  writeJson(safeSessionStorage(), ATTRIBUTION_KEY, fromUrl);
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

/** Normaliza el número a E.164: solo dígitos después de la lada ("+52" + "3312345678"). */
export function toE164(countryCode: string, phoneNumber: string): string {
  return `${countryCode}${phoneNumber.replace(/\D/g, "")}`;
}

export async function createCheckoutSession(
  apiBaseUrl: string,
  courseSlug: string,
  profile: CheckoutProfile,
): Promise<CheckoutSessionResult> {
  const attribution = readJson<Attribution>(safeSessionStorage(), ATTRIBUTION_KEY) ?? {};
  const response = await fetch(`${apiBaseUrl}/checkout/v1/checkout-sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseSlug,
      email: profile.email,
      // Sin número (el curso no pide WhatsApp) no se manda solo la lada.
      phone: profile.phoneNumber.replace(/\D/g, "") ? toE164(profile.phoneCountryCode, profile.phoneNumber) : undefined,
      name: profile.name.trim() || undefined,
      javaExperience: profile.javaExperience,
      occupation: profile.occupation,
      seniority: profile.seniority,
      privacyAccepted: true,
      whatsappContactAccepted: profile.whatsappContactAccepted,
      tracking: {
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
        fbclid: attribution.fbclid,
        utmSource: attribution.utm_source,
        utmMedium: attribution.utm_medium,
        utmCampaign: attribution.utm_campaign,
        utmContent: attribution.utm_content,
        utmTerm: attribution.utm_term,
        landingUrl: window.location.href.split("?")[0],
      },
    }),
  });

  if (!response.ok) {
    let field: string | undefined;
    try {
      const problem = (await response.json()) as { title?: string };
      field = problem.title?.startsWith("invalid_") ? problem.title.slice("invalid_".length) : undefined;
    } catch {
      field = undefined;
    }
    throw new CheckoutError(response.status, field);
  }
  return (await response.json()) as CheckoutSessionResult;
}

/**
 * Lead e InitiateCheckout del píxel con los mismos eventID que la API manda por Conversions API:
 * Meta los cuenta una sola vez y los empareja mejor con el anuncio.
 */
export function trackCheckoutFunnel(result: CheckoutSessionResult, value: number): void {
  if (typeof window === "undefined" || !window.fbq) return;
  const params = { value, currency: "MXN" };
  window.fbq("track", "Lead", params, { eventID: result.leadEventId });
  window.fbq("track", "InitiateCheckout", params, { eventID: result.checkoutEventId });
}
