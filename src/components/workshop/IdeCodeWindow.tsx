import type { CodeTokenKind, WorkshopCodeShowcase } from "@/lib/workshop-content";
import { WS_FONT_CODE } from "./workshop-styles";

/** Colores del tema Dark (New UI) de IntelliJ IDEA. */
const TOKEN_CLASS: Record<CodeTokenKind, string> = {
  plain: "",
  keyword: "text-[#CF8E6D]",
  annotation: "text-[#B3AE60]",
  method: "text-[#56A8F5]",
  string: "text-[#6AAB73]",
  constant: "text-[#C77DBB] italic",
};

const ClassIcon = ({ dimmed = false }: { dimmed?: boolean }) => (
  <span
    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3574F0] text-[9px] font-bold text-white ${dimmed ? "opacity-[0.55]" : ""}`}
  >
    C
  </span>
);

/**
 * Ventana de editor estilo IntelliJ. El código viene ya separado en tokens, así no
 * hace falta una librería de resaltado de sintaxis.
 */
const IdeCodeWindow = ({ showcase }: { showcase: WorkshopCodeShowcase }) => {
  const [activeFile, ...otherFiles] = showcase.fileNames;

  return (
    <div className="overflow-hidden rounded-xl border border-[#393B40] bg-[#1E1F22] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex h-[38px] items-center gap-2 border-b border-[#1E1F22] bg-[#2B2D30] px-3.5">
        <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
        <span className="ml-2.5 truncate text-[12.5px] text-[#9DA0A8]">
          {showcase.projectName} — {activeFile}
        </span>
      </div>

      <div className="flex h-9 border-b border-[#393B40] bg-[#1E1F22]">
        <div className="flex items-center gap-2 border-b-2 border-[#3574F0] px-3.5 text-[13px] text-[#DFE1E5]">
          <ClassIcon />
          {activeFile}
        </div>
        {otherFiles.map((file) => (
          <div
            key={file}
            className="flex items-center gap-2 px-3.5 text-[13px] text-[#8C8F96]"
          >
            <ClassIcon dimmed />
            {file}
          </div>
        ))}
      </div>

      {/* La barra de scroll se oculta (como en un editor real, que corta la línea en el
          borde), pero se puede seguir desplazando con trackpad o arrastrando en móvil. */}
      <div
        className={`${WS_FONT_CODE} overflow-x-auto pb-[18px] pr-[18px] pt-4 text-[13px] leading-[1.75] text-[#BCBEC4] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {showcase.lines.map((line, index) => (
          <div key={index} className="flex whitespace-pre">
            <span className="w-11 shrink-0 select-none pr-[18px] text-right text-[#4B5059]">
              {index + 1}
            </span>
            <span>
              {line.map(([text, kind = "plain"], tokenIndex) => (
                <span key={tokenIndex} className={TOKEN_CLASS[kind]}>
                  {text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeCodeWindow;
