import { ArrowRight, Check, Mail, MessageCircle, Users, Video } from "lucide-react";
import PurchaseHeader from "@/components/purchase/PurchaseHeader";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_MUTED, rise } from "@/components/home/home-theme";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
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
    icon: Users,
    title: "Antes del inicio te contactamos",
    text: "Te damos acceso a los materiales del curso y al grupo de estudiantes antes de la primera clase.",
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
    <PurchaseHeader secureNote={false} />
    <main id="contenido" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(60,207,122,0.12),transparent_70%)]"
      />
      <div className={`${HOME_CONTAINER} relative max-w-[760px] py-16 text-center md:py-24`}>
        <div {...rise(0)} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3ccf7a]/15 ring-1 ring-[#3ccf7a]/40">
          <Check className="h-8 w-8 text-[#7ee2a8]" strokeWidth={2.5} aria-hidden />
        </div>
        <p {...rise(60)} className={`${HOME_EYEBROW} mt-6`}>
          {"// pago confirmado"}
        </p>
        <h1
          {...rise(100)}
          className="mt-4 text-[clamp(34px,7vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]"
        >
          ¡Listo, ya tienes tu lugar!
        </h1>
        <p {...rise(140)} className={`mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] ${HOME_MUTED}`}>
          Tu inscripción quedó registrada. Gracias por tu confianza: me da mucho gusto tenerte en el grupo.
        </p>

        <ol {...rise(180)} className="mt-12 space-y-3 text-left">
          {NEXT_STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="flex gap-4 rounded-[16px] border border-white/[0.08] bg-[#12151a] p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffc66d]/10 text-[#ffc66d]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-['JetBrains_Mono',ui-monospace,monospace] text-[12px] text-[#8b919b]">
                  paso {index + 1}
                </span>
                <span className="mt-0.5 block text-[17px] font-semibold text-white">{title}</span>
                <span className={`mt-1 block text-[15px] leading-[1.55] ${HOME_MUTED}`}>{text}</span>
              </span>
            </li>
          ))}
        </ol>

        <div {...rise(220)} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
