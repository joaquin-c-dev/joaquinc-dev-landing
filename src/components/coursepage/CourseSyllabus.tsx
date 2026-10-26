import { ChevronRight, Clock, FolderOpen } from "lucide-react";
import type { CurriculumModule } from "@/lib/course-types";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "@/components/home/home-theme";

interface CourseSyllabusProps {
  sections: CurriculumModule[];
  hours: number;
  summary?: string;
}

/** "Patrones de Diseño y Arquitectura" -> "patrones-de-diseno-y-arquitectura", como archivo del proyecto. */
const toFileName = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const METHOD = [
  { title: "Teoría aplicada", text: "Cada concepto se explica con ejemplos reales de producción." },
  { title: "Práctica inmediata", text: "Programas en clase lo que se acaba de ver, con dudas en vivo." },
  { title: "Proyecto real", text: "Terminas con una aplicación completa para tu portafolio." },
];

/**
 * Temario como el explorador de proyecto de IntelliJ: cada módulo es un archivo numerado que
 * se abre con `<details>` (sin JavaScript) para ver sus temas. A la izquierda, un resumen fijo.
 */
const CourseSyllabus = ({ sections, hours, summary }: CourseSyllabusProps) => {
  const modules = [...sections].sort((a, b) => a.order - b.order);
  return (
    <section id="temario" className="scroll-mt-24 py-24 md:py-32">
      <div className={`${HOME_CONTAINER} grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p {...reveal(0)} className={HOME_EYEBROW}>
            {"// temario"}
          </p>
          <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
            Lo que vas a aprender
          </h2>
          <p {...reveal(140)} className={`mt-4 text-[16px] leading-[1.6] ${HOME_MUTED}`}>
            {summary || `${modules.length} módulos y ${hours} horas de práctica en vivo.`}
          </p>
          <ul {...reveal(210)} className="mt-8 space-y-4 border-l border-white/10 pl-5">
            {METHOD.map((item) => (
              <li key={item.title}>
                <p className="text-[15px] font-semibold text-white">{item.title}</p>
                <p className={`mt-0.5 text-[14px] leading-[1.5] ${HOME_MUTED}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          {...reveal(100)}
          className="overflow-hidden rounded-xl border border-[#393B40] bg-[#1E1F22] font-['JetBrains_Mono',ui-monospace,monospace]"
        >
          <div className="flex items-center justify-between border-b border-black/30 bg-[#2B2D30] px-4 py-2.5 text-[12.5px] text-[#9DA0A8]">
            <span className="inline-flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-[#C9A26D]" aria-hidden />
              temario
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {hours} h · {modules.length} módulos
            </span>
          </div>
          <ol>
            {modules.map((module, index) => (
              <li key={module.order} className="border-b border-white/[0.05] last:border-b-0">
                <details className="group" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-[#6F737A] transition-transform group-open:rotate-90"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 font-['Geist',ui-sans-serif,system-ui,sans-serif]">
                      <span className="block text-[12px] text-[#8b919b]">
                        {String(index + 1).padStart(2, "0")}-{toFileName(module.title)}
                      </span>
                      <span className="mt-0.5 block text-[16px] font-semibold leading-snug text-[#eceef1]">
                        {module.title}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-md bg-white/[0.06] px-2 py-1 text-[12px] text-[#c9cdd3]">
                      {module.duration}
                    </span>
                  </summary>
                  <ul className="space-y-2 pb-4 pl-11 pr-4 font-['Geist',ui-sans-serif,system-ui,sans-serif] text-[14.5px] text-[#c9cdd3]">
                    {module.specificTopics.map((topic) => (
                      <li key={topic} className="flex gap-2.5">
                        <span aria-hidden className="text-[#6AAB73]">
                          ›
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default CourseSyllabus;
