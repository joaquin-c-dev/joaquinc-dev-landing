import { ArrowRight, CalendarCheck, Check, Mail, MessageCircle, Video } from "lucide-react";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_MUTED, rise } from "@/components/home/home-theme";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import { ASSETS } from "@/lib/assets";
import { WHATSAPP_NUMBER } from "@/lib/workshop-content";

const QUESTION_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, acabo de inscribirme y tengo una duda",
)}`;

const NEXT_STEPS = [
  {
    icon: Mail,
    title: "Revisa tu correo",
    text: "Te enviamos los detalles del curso, las instrucciones de acceso y los siguientes pasos. Si no lo ves, revisa spam o promociones.",
  },
  {
    icon: CalendarCheck,
    title: "Aparta la fecha en tu agenda",
    text: "Anota el día y la hora de tu primera clase (hora del centro de México) para que no se te pase.",
  },
  {
    icon: Video,
    title: "Nos vemos en clase",
    text: "Las clases son en vivo por Zoom. Si tienes cualquier duda antes de empezar, escríbeme por WhatsApp.",
  },
];

/**
 * Confirmación después de pagar en Stripe. HTML sin hidratar: el evento de compra de Meta lo
 * manda un script en `gracias-por-tu-compra.astro`. La página no sabe qué curso se compró (Stripe
 * solo regresa el monto), por eso el texto es general.
 */
const GraciasPorTuCompra = () => (
  <>
    {/* Todo en una pantalla: contenido centrado en la altura de la ventana. */}
    <main id="contenido" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(60,207,122,0.12),transparent_70%)]"
      />
      <div className={`${HOME_CONTAINER} relative max-w-[1000px] py-10 text-center`}>
        {/* Logo de la marca con la palomita de "pago confirmado" como insignia; lleva al inicio. */}
        <a {...rise(0)} href="/" aria-label="joaquinc.dev, ir al inicio" className="relative mx-auto block w-fit">
          <img src={ASSETS.brandLogo} alt="" width={108} height={96} className="h-20 w-auto md:h-24" />
          <span className="absolute -right-2 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#163a26] ring-2 ring-[#0b0d10]">
            <Check className="h-5 w-5 text-[#7ee2a8]" strokeWidth={3} aria-hidden />
          </span>
        </a>
        <p {...rise(60)} className={`${HOME_EYEBROW} mt-4`}>
          {"// pago confirmado"}
        </p>
        <h1
          {...rise(100)}
          className="mt-3 text-[clamp(32px,6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]"
        >
          ¡Listo, ya tienes tu lugar!
        </h1>
        <p {...rise(140)} className={`mx-auto mt-4 max-w-[560px] text-[16.5px] leading-[1.55] ${HOME_MUTED}`}>
          Tu inscripción quedó registrada. Gracias por tu confianza: me da mucho gusto tenerte en el grupo.
        </p>

        <ol {...rise(180)} className="mt-9 grid gap-3 text-left md:grid-cols-3">
          {NEXT_STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="flex gap-4 rounded-[16px] border border-white/[0.08] bg-[#12151a] p-4 md:flex-col md:gap-3 md:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffc66d]/10 text-[#ffc66d]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-['JetBrains_Mono_Variable',ui-monospace,monospace] text-[12px] text-[#8b919b]">
                  paso {index + 1}
                </span>
                <span className="mt-0.5 block text-[16px] font-semibold text-white">{title}</span>
                <span className={`mt-1 block text-[14px] leading-[1.5] ${HOME_MUTED}`}>{text}</span>
              </span>
            </li>
          ))}
        </ol>

        <div {...rise(220)} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href={QUESTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Escríbeme por WhatsApp
          </a>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-[#d5d8dd] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </main>
  </>
);

export default GraciasPorTuCompra;
