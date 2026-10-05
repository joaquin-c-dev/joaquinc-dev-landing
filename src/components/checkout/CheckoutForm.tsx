import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Pencil } from "lucide-react";
import {
  CheckoutError,
  JAVA_EXPERIENCE_OPTIONS,
  OCCUPATION_OPTIONS,
  PHONE_COUNTRY_CODES,
  SENIORITY_OPTIONS,
  createCheckoutSession,
  loadCheckoutProfile,
  saveCheckoutProfile,
  trackCheckoutFunnel,
  type CheckoutProfile,
  type CheckoutQuestions,
} from "@/lib/checkout";
import { PRIVACY_CONTACT, PRIVACY_SECTIONS } from "@/lib/privacy-policy";

interface CheckoutFormProps {
  apiBaseUrl: string;
  courseSlug: string;
  /** Precio que se cobra; solo para el valor de los eventos del píxel. */
  price: number;
  /** Enlace de pago de siempre: si la API falla, se manda ahí para no perder la venta. */
  fallbackUrl?: string;
  /** Viene de "Corrígelo aquí" en Stripe: muestra los datos guardados ya editables. */
  startInEditMode?: boolean;
  /** Preguntas que se activaron en el panel para este curso (correo y aviso siempre van). */
  questions: CheckoutQuestions;
  /** En el diálogo la X de cerrar vive arriba a la derecha: la barra de progreso le deja lugar. */
  reserveCloseButtonSpace?: boolean;
}

/** Una pregunta por pantalla, en este orden; `consent` es la última, con el botón de pago. */
const ALL_STEPS = ["name", "email", "phoneNumber", "javaExperience", "occupation", "seniority", "consent"] as const;
type Step = (typeof ALL_STEPS)[number];
/** Pregunta → bandera del panel que la activa; las que no aparecen siempre se hacen. */
const STEP_FLAG: Partial<Record<Step, keyof CheckoutQuestions>> = {
  name: "askName",
  phoneNumber: "askPhone",
  javaExperience: "askJavaExperience",
  occupation: "askOccupation",
  seniority: "askSeniority",
};

const buildSteps = (questions: CheckoutQuestions): readonly Step[] =>
  ALL_STEPS.filter((step) => {
    const flag = STEP_FLAG[step];
    return flag ? questions[flag] : true;
  });
type FieldErrors = Partial<Record<Step, string>>;

const EMPTY_PROFILE: CheckoutProfile = {
  name: "",
  email: "",
  phoneCountryCode: "+52",
  phoneNumber: "",
  whatsappContactAccepted: true,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Pausa tras tocar una opción, para que se vea marcada antes de pasar a la siguiente. */
const AUTO_ADVANCE_MS = 280;

/** Mismas reglas que la API, para avisar en el paso correcto antes de enviar. */
function validateStep(step: Step, profile: CheckoutProfile, privacyAccepted: boolean): string | undefined {
  const phoneDigits = profile.phoneNumber.replace(/\D/g, "");
  if (step === "name" && profile.name.trim().length < 2) return "Escribe tu nombre";
  if (step === "email" && !EMAIL_PATTERN.test(profile.email.trim())) return "Revisa tu correo";
  if (step === "phoneNumber" && (phoneDigits.length < 7 || phoneDigits.length > 13)) return "Revisa tu número";
  if (step === "javaExperience" && !profile.javaExperience) return "Elige una opción";
  if (step === "occupation" && !profile.occupation) return "Elige una opción";
  if (step === "seniority" && !profile.seniority) return "Elige una opción";
  if (step === "consent" && !privacyAccepted) return "Necesitamos tu aceptación para continuar";
  return undefined;
}

const firstInvalidStep = (
  steps: readonly Step[],
  profile: CheckoutProfile,
  privacyAccepted: boolean,
): Step | undefined => steps.find((step) => validateStep(step, profile, privacyAccepted));

/** Campo de la API (`invalid_<campo>`) → paso del formulario. */
const API_FIELD_TO_STEP: Record<string, Step> = {
  name: "name",
  email: "email",
  phone: "phoneNumber",
  javaExperience: "javaExperience",
  occupation: "occupation",
  seniority: "seniority",
  privacyAccepted: "consent",
};

const fieldBaseClass =
  "h-12 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-[17px] text-white placeholder:text-white/30 outline-none transition focus:border-[#ffc66d] focus:ring-2 focus:ring-[#ffc66d]/30";

const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";

/**
 * Formulario previo al pago al estilo Typeform: una pregunta por pantalla para no saturar. Si la
 * persona ya lo llenó en este dispositivo, solo ve sus datos para confirmar. Al enviar, la API
 * guarda el prospecto y devuelve la página de pago de Stripe con su correo ya puesto.
 */
const CheckoutForm = ({
  apiBaseUrl,
  courseSlug,
  price,
  fallbackUrl,
  startInEditMode = false,
  questions,
  reserveCloseButtonSpace = false,
}: CheckoutFormProps) => {
  const { askName, askPhone, askJavaExperience, askOccupation, askSeniority } = questions;
  const STEPS = useMemo(
    () => buildSteps({ askName, askPhone, askJavaExperience, askOccupation, askSeniority }),
    [askName, askPhone, askJavaExperience, askOccupation, askSeniority],
  );
  const [profile, setProfile] = useState<CheckoutProfile>(EMPTY_PROFILE);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  // El aviso se muestra encima del formulario: un enlace a otra página haría perder lo llenado
  // (los navegadores de Instagram/Facebook abren "pestañas nuevas" en la misma vista).
  const [showPrivacy, setShowPrivacy] = useState(false);
  const autoAdvance = useRef<ReturnType<typeof setTimeout>>();

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  // El perfil guardado vive en localStorage: solo existe en el cliente, ya montado.
  useEffect(() => {
    const saved = loadCheckoutProfile();
    if (!saved) return;
    const restored = { ...EMPTY_PROFILE, ...saved };
    setProfile(restored);
    // Le falta alguna respuesta (p. ej. llenó antes un curso de IA y ahora uno de Java): se le
    // lleva directo a la primera pregunta pendiente, con lo demás ya puesto.
    const missing = firstInvalidStep(STEPS, restored, true);
    if (missing) {
      setStepIndex(STEPS.indexOf(missing));
      return;
    }
    setPrivacyAccepted(true);
    setConfirming(!startInEditMode);
  }, [startInEditMode, STEPS]);

  useEffect(() => () => clearTimeout(autoAdvance.current), []);

  const update = <K extends keyof CheckoutProfile>(key: K, value: CheckoutProfile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setErrors({});
  };

  const goTo = (index: number) => {
    clearTimeout(autoAdvance.current);
    setErrors({});
    setGeneralError(undefined);
    setStepIndex(index);
  };

  const submit = async () => {
    const invalid = firstInvalidStep(STEPS, profile, privacyAccepted);
    if (invalid) {
      setConfirming(false);
      setStepIndex(STEPS.indexOf(invalid));
      setErrors({ [invalid]: validateStep(invalid, profile, privacyAccepted) });
      return;
    }

    setSubmitting(true);
    setGeneralError(undefined);
    try {
      const result = await createCheckoutSession(apiBaseUrl, courseSlug, profile);
      saveCheckoutProfile(profile);
      trackCheckoutFunnel(result, price);
      // Misma pestaña: tras un `await` el navegador bloquearía una pestaña nueva.
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setSubmitting(false);
      const field = error instanceof CheckoutError ? error.field : undefined;
      const fieldStep = field ? API_FIELD_TO_STEP[field] : undefined;
      if (fieldStep) {
        setConfirming(false);
        setStepIndex(STEPS.indexOf(fieldStep));
        setErrors({ [fieldStep]: "Revisa este dato" });
        return;
      }
      if (error instanceof CheckoutError && error.status === 429) {
        setGeneralError("Hiciste varios intentos seguidos. Espera unos minutos y vuelve a intentarlo.");
        return;
      }
      // Cualquier otra falla: la venta va primero, se usa el enlace de pago directo.
      if (fallbackUrl) {
        window.location.assign(fallbackUrl);
        return;
      }
      setGeneralError("No pudimos abrir el pago. Inténtalo de nuevo en un momento.");
    }
  };

  /** Enter o "Siguiente": valida solo la pregunta actual y avanza; en la última, paga. */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (confirming || isLastStep) {
      void submit();
      return;
    }
    const error = validateStep(step, profile, privacyAccepted);
    if (error) {
      setErrors({ [step]: error });
      return;
    }
    goTo(stepIndex + 1);
  };

  /** Preguntas de opción: un toque marca la respuesta y pasa sola a la siguiente. */
  const choose = <K extends "javaExperience" | "occupation" | "seniority">(key: K, value: CheckoutProfile[K]) => {
    update(key, value);
    clearTimeout(autoAdvance.current);
    autoAdvance.current = setTimeout(() => setStepIndex((index) => index + 1), AUTO_ADVANCE_MS);
  };

  const payButton = (
    <button
      type="submit"
      disabled={submitting}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-[15px] font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-90 disabled:opacity-70"
    >
      {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-4 w-4" />}
      {submitting ? "Abriendo pago seguro…" : "Continuar al pago"}
    </button>
  );

  const errorBanner = generalError && (
    <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
      {generalError}
    </p>
  );

  if (confirming) {
    return (
      <form onSubmit={handleSubmit} className={`relative flex h-full flex-col gap-5 ${reserveCloseButtonSpace ? "pt-9" : ""}`}>
        <div className="space-y-1 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-[15px]">
          {askName && profile.name && <p className="font-semibold text-white">{profile.name}</p>}
          <p className={askName && profile.name ? "text-white/70" : "font-semibold text-white"}>{profile.email}</p>
          {askPhone && profile.phoneNumber && (
            <p className="text-white/70">
              {profile.phoneCountryCode} {profile.phoneNumber}
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setConfirming(false);
              goTo(0);
            }}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#ffc66d] hover:text-[#ffd899]"
          >
            <Pencil className="h-3.5 w-3.5" /> Editar mis datos
          </button>
        </div>
        <div className="mt-auto space-y-3">
          {errorBanner}
          {payButton}
          <p className="text-center text-xs text-white/45">
            Pago seguro con Stripe. Tus datos se usan según nuestro{" "}
            <button type="button" onClick={() => setShowPrivacy(true)} className="underline">
              aviso de privacidad
            </button>
            .
          </p>
        </div>
        {showPrivacy && <PrivacyPanel onClose={() => setShowPrivacy(false)} />}
      </form>
    );
  }

  const name = firstName(profile.name);
  const error = errors[step];

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex h-full flex-col">
      <div className={`mb-6 flex shrink-0 items-center gap-3 ${reserveCloseButtonSpace ? "pr-9" : ""}`}>
        <button
          type="button"
          onClick={() => goTo(stepIndex - 1)}
          disabled={stepIndex === 0}
          aria-label="Pregunta anterior"
          className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:invisible"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-white/45">
          {stepIndex + 1}/{STEPS.length}
        </span>
      </div>

      {/* `key` reinicia la animación de entrada en cada pregunta. */}
      <div key={step} className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1 animate-in fade-in-0 slide-in-from-right-4 duration-200">
        {step === "name" && (
          <Question title="¿Cómo te llamas?" hint="Nombre y apellido, para tu inscripción." error={error}>
            <input
              autoFocus
              className={`${fieldBaseClass} w-full`}
              autoComplete="name"
              value={profile.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Escribe tu nombre"
            />
          </Question>
        )}
        {step === "email" && (
          <Question
            title={name ? `¿A qué correo te escribimos, ${name}?` : "¿A qué correo te escribimos?"}
            hint="Ahí te llega la confirmación y el acceso a la clase."
            error={error}
          >
            <input
              autoFocus
              className={`${fieldBaseClass} w-full`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={profile.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="tu@correo.com"
            />
          </Question>
        )}
        {step === "phoneNumber" && (
          <Question title="¿Cuál es tu WhatsApp?" hint="Para avisarte cualquier cambio de la clase en vivo." error={error}>
            <div className="flex gap-2">
              <select
                aria-label="Lada"
                className={`${fieldBaseClass} w-[108px] shrink-0 px-2 text-[15px]`}
                value={profile.phoneCountryCode}
                onChange={(e) => update("phoneCountryCode", e.target.value)}
              >
                {PHONE_COUNTRY_CODES.map((option) => (
                  <option key={option.code} value={option.code} className="bg-[#14171c]">
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                autoFocus
                className={`${fieldBaseClass} min-w-0 flex-1`}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={profile.phoneNumber}
                onChange={(e) => update("phoneNumber", e.target.value)}
                placeholder="10 dígitos"
              />
            </div>
          </Question>
        )}
        {step === "javaExperience" && (
          <Question title="¿Cuánto tiempo llevas con Java?" error={error}>
            <OptionList
              options={JAVA_EXPERIENCE_OPTIONS}
              value={profile.javaExperience}
              onChoose={(value) => choose("javaExperience", value)}
            />
          </Question>
        )}
        {step === "occupation" && (
          <Question title="¿Qué opción te describe mejor?" error={error}>
            <OptionList
              options={OCCUPATION_OPTIONS}
              value={profile.occupation}
              onChoose={(value) => choose("occupation", value)}
            />
          </Question>
        )}
        {step === "seniority" && (
          <Question title="¿Cómo te consideras?" error={error}>
            <OptionList
              options={SENIORITY_OPTIONS}
              value={profile.seniority}
              onChoose={(value) => choose("seniority", value)}
            />
          </Question>
        )}
        {step === "consent" && (
          <Question
            title={name ? `¡Listo, ${name}! Último paso` : "¡Listo! Último paso"}
            hint="Te llevamos a la página de pago segura de Stripe con tu correo ya escrito."
            error={error}
          >
            <div className="space-y-3 text-[15px] text-white/80">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#ffc66d]"
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked);
                    setErrors({});
                  }}
                />
                <span>
                  Acepto el{" "}
                  <button
                    type="button"
                    onClick={(event) => {
                      // Dentro del <label>: sin esto, abrir el aviso también marcaría la casilla.
                      event.preventDefault();
                      setShowPrivacy(true);
                    }}
                    className="text-[#ffc66d] underline hover:text-[#ffd899]"
                  >
                    aviso de privacidad
                  </button>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#ffc66d]"
                  checked={profile.whatsappContactAccepted}
                  onChange={(e) => update("whatsappContactAccepted", e.target.checked)}
                />
                <span>Quiero recibir los avisos por WhatsApp</span>
              </label>
            </div>
          </Question>
        )}
      </div>

      {/* Siempre en el mismo lugar, abajo, aunque el teclado del celular achique la pantalla. */}
      <div className="shrink-0 space-y-3 pt-4">
        {errorBanner}
        {isLastStep ? (
          payButton
        ) : (
          !isChoiceStep(step) && (
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-[15px] font-semibold text-[#0b0d10] transition hover:bg-white/90"
            >
              Siguiente <ArrowRight className="h-4 w-4" />
            </button>
          )
        )}
      </div>
      {showPrivacy && <PrivacyPanel onClose={() => setShowPrivacy(false)} />}
    </form>
  );
};

/** Aviso de privacidad encima del formulario, con su propio scroll y botón para volver. */
const PrivacyPanel = ({ onClose }: { onClose: () => void }) => (
  <div className="absolute inset-0 z-10 flex flex-col bg-[#101318] animate-in fade-in-0 duration-150">
    <div className="mb-4 flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onClose}
        aria-label="Volver al formulario"
        className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <h3 className="text-lg font-semibold text-white">Aviso de privacidad</h3>
    </div>
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm leading-relaxed text-white/70">
      {PRIVACY_SECTIONS.map((section, index) => (
        <section key={section.title}>
          <h4 className="mb-1 font-semibold text-white">
            {index + 1}. {section.title}
          </h4>
          <p>{section.text}</p>
          {section.items && (
            <ul className="mt-1.5 list-disc space-y-1 pl-5">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <section>
        <h4 className="mb-1 font-semibold text-white">
          {PRIVACY_SECTIONS.length + 1}. Contacto
        </h4>
        <p>{PRIVACY_CONTACT.intro}</p>
        <p className="mt-1.5">
          {PRIVACY_CONTACT.email} · {PRIVACY_CONTACT.phone}
        </p>
      </section>
    </div>
    <button
      type="button"
      onClick={onClose}
      className="mt-4 flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white text-[15px] font-semibold text-[#0b0d10] transition hover:bg-white/90"
    >
      <ArrowLeft className="h-4 w-4" /> Volver al formulario
    </button>
  </div>
);

const isChoiceStep = (step: Step) => step === "javaExperience" || step === "occupation" || step === "seniority";

interface QuestionProps {
  title: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

const Question = ({ title, hint, error, children }: QuestionProps) => (
  <div>
    <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">{title}</h3>
    {hint && <p className="mt-1.5 text-sm text-white/55">{hint}</p>}
    <div className="mt-5">{children}</div>
    {error && (
      <p role="alert" className="mt-2 text-sm text-red-300">
        {error}
      </p>
    )}
  </div>
);

interface OptionListProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value?: T;
  onChoose: (value: T) => void;
}

/** Opciones grandes, una por renglón y con letra (A, B, C…), como en Typeform. */
function OptionList<T extends string>({ options, value, onChoose }: OptionListProps<T>) {
  return (
    <div className="space-y-2.5">
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChoose(option.value)}
            className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[15px] transition ${
              selected
                ? "border-[#ffc66d] bg-[#ffc66d]/[0.12] text-white"
                : "border-white/15 bg-white/[0.03] text-white/85 hover:border-white/35 hover:bg-white/[0.06]"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${
                selected ? "border-[#ffc66d] bg-[#ffc66d] text-[#0b0d10]" : "border-white/25 text-white/60"
              }`}
            >
              {selected ? <Check className="h-3.5 w-3.5" /> : String.fromCharCode(65 + index)}
            </span>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default CheckoutForm;
