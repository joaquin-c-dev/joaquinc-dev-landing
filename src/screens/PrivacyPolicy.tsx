import { Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_MUTED, rise } from "@/components/home/home-theme";
import { CoursesNavProvider, type NavCourse } from "@/contexts/CoursesNavContext";
import { PRIVACY_CONTACT, PRIVACY_SECTIONS } from "@/lib/privacy-policy";

interface PrivacyPolicyProps {
  navCourses?: NavCourse[];
}

/** "Uso de la información" -> "uso-de-la-informacion", para los anclas del índice. */
const toAnchor = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Aviso de privacidad con el look del sitio, pensado para leerse: columna angosta, secciones
 * numeradas e índice fijo en escritorio. El texto vive en `lib/privacy-policy.ts` (también lo
 * usa el formulario de pago). HTML sin hidratar.
 */
const PrivacyPolicy = ({ navCourses = [] }: PrivacyPolicyProps) => (
  <>
    <main id="contenido" className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className={`${HOME_CONTAINER} grid gap-12 lg:grid-cols-[240px_minmax(0,720px)] lg:gap-16`}>
        <nav aria-label="Secciones" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9da3ad]">En esta página</p>
            <ol className="mt-4 space-y-1 border-l border-white/10">
              {[...PRIVACY_SECTIONS.map((section) => section.title), "Contacto"].map((title, index) => (
                <li key={title}>
                  <a
                    href={`#${toAnchor(title)}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[14px] text-[#9da3ad] transition-colors hover:border-[#ffc66d] hover:text-[#ffc66d]"
                  >
                    <span className="mr-2 font-['JetBrains_Mono',ui-monospace,monospace] text-[12px] text-[#8b919b]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0">
          <p {...rise(0)} className={HOME_EYEBROW}>
            {"// legal"}
          </p>
          <h1
            {...rise(60)}
            className="mt-4 text-[clamp(34px,6vw,52px)] font-bold leading-[1.06] tracking-[-0.03em]"
          >
            Políticas de privacidad
          </h1>
          <p {...rise(120)} className={`mt-5 text-[17px] leading-[1.65] ${HOME_MUTED}`}>
            Cómo recopilamos, usamos y protegemos tu información personal cuando te inscribes a un curso o
            taller.
          </p>

          <div className="mt-12 space-y-10">
            {PRIVACY_SECTIONS.map((section, index) => (
              <section key={section.title} id={toAnchor(section.title)} className="scroll-mt-28">
                <h2 className="flex items-baseline gap-3 text-[21px] font-semibold tracking-[-0.015em] text-white">
                  <span className="font-['JetBrains_Mono',ui-monospace,monospace] text-[13px] font-normal text-[#ffc66d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <p className="mt-3 text-[16.5px] leading-[1.75] text-[#c9cdd3]">{section.text}</p>
                {section.items && (
                  <ul className="mt-3 space-y-2 text-[16.5px] leading-[1.65] text-[#c9cdd3]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="text-[#6AAB73]">
                          ›
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id="contacto" className="scroll-mt-28 rounded-[16px] border border-white/[0.08] bg-[#12151a] p-6">
              <h2 className="flex items-baseline gap-3 text-[21px] font-semibold tracking-[-0.015em] text-white">
                <span className="font-['JetBrains_Mono',ui-monospace,monospace] text-[13px] font-normal text-[#ffc66d]">
                  {String(PRIVACY_SECTIONS.length + 1).padStart(2, "0")}
                </span>
                Contacto
              </h2>
              <p className={`mt-3 text-[16px] leading-[1.65] ${HOME_MUTED}`}>{PRIVACY_CONTACT.intro}</p>
              <ul className="mt-4 flex flex-col gap-1 sm:flex-row sm:gap-8">
                <li>
                  <a
                    href={`mailto:${PRIVACY_CONTACT.email}`}
                    className="inline-flex min-h-[44px] items-center gap-2 text-[15.5px] font-medium text-[#ffc66d] transition-colors hover:text-[#ffd899]"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {PRIVACY_CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:+52${PRIVACY_CONTACT.phone}`}
                    className="inline-flex min-h-[44px] items-center gap-2 text-[15.5px] font-medium text-[#ffc66d] transition-colors hover:text-[#ffd899]"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {PRIVACY_CONTACT.phone}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
    <CoursesNavProvider courses={navCourses}>
      <Footer />
    </CoursesNavProvider>
  </>
);

export default PrivacyPolicy;
