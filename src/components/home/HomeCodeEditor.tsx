import type { CSSProperties } from "react";
import { DEFAULT_SNIPPET, highlightCode, type CodeSnippet, type CodeTokenKind } from "@/lib/code-snippets";

/** Colores del tema oscuro de IntelliJ IDEA (los mismos de la ventana del taller). */
const TOKEN_CLASS: Record<CodeTokenKind, string> = {
  plain: "text-[#BCBEC4]",
  keyword: "text-[#CF8E6D]",
  annotation: "text-[#B3AE60]",
  method: "text-[#56A8F5]",
  string: "text-[#6AAB73]",
  comment: "italic text-[#8C8F96]",
  heading: "font-semibold text-[#CF8E6D]",
};

interface HomeCodeEditorProps {
  /** Código a mostrar; por defecto, el controlador de Spring Boot del inicio. */
  snippet?: CodeSnippet;
}

/**
 * Editor estilo IntelliJ con código real de clase. Las líneas aparecen una tras otra al
 * cargar con una animación de CSS (`home-code-line` en index.css), sin JavaScript; con
 * "reducir movimiento" se muestran de inmediato.
 */
const HomeCodeEditor = ({ snippet = DEFAULT_SNIPPET }: HomeCodeEditorProps) => {
  const lines = highlightCode(snippet);
  return (
    <div className="overflow-hidden rounded-xl border border-[#393B40] bg-[#1E1F22] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
      <div className="flex h-[38px] items-center gap-2 border-b border-black/30 bg-[#2B2D30] px-3.5">
        <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
        <span className="ml-2.5 truncate text-[12.5px] text-[#9DA0A8]">
          {snippet.project} — {snippet.fileName}
        </span>
      </div>
      <div className="flex h-9 border-b border-[#393B40]">
        <div className="flex items-center gap-2 border-b-2 border-[#3574F0] px-3.5 text-[13px] text-[#DFE1E5]">
          <FileIcon fileName={snippet.fileName} />
          {snippet.fileName}
        </div>
        {snippet.secondaryFile && (
          <div className="hidden items-center gap-2 px-3.5 text-[13px] text-[#8C8F96] sm:flex">
            <FileIcon fileName={snippet.secondaryFile} muted />
            {snippet.secondaryFile}
          </div>
        )}
      </div>
      <div
        className="overflow-x-auto py-4 pr-4 font-['JetBrains_Mono',ui-monospace,monospace] text-[12px] leading-[1.75] sm:text-[13px] [@media(min-width:1024px)_and_(max-height:760px)]:py-3 [@media(min-width:1024px)_and_(max-height:760px)]:text-[12.5px] [@media(min-width:1024px)_and_(max-height:760px)]:leading-[1.5] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="img"
        aria-label={snippet.ariaLabel}
      >
        {lines.map((line, index) => (
          <div key={index} className="home-code-line flex whitespace-pre" style={{ "--line": index } as CSSProperties}>
            <span className="w-10 shrink-0 select-none pr-4 text-right text-[#4B5059]">{index + 1}</span>
            <span>
              {line.map(([text, kind], tokenIndex) => (
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

/** Ícono del archivo como en IntelliJ: "C" azul para clases Java, "TS" para TypeScript, "M" para Markdown. */
const FileIcon = ({ fileName, muted = false }: { fileName: string; muted?: boolean }) => {
  const extension = fileName.split(".").pop();
  const label = extension === "ts" ? "TS" : extension === "md" ? "M" : extension === "json" ? "{}" : "C";
  const color =
    extension === "ts" ? "bg-[#3178C6]" : extension === "md" || extension === "json" ? "bg-[#6F737A]" : "bg-[#3574F0]";
  return (
    <span
      aria-hidden
      className={`flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-0.5 text-[8.5px] font-bold text-white ${color} ${muted ? "opacity-55" : ""}`}
    >
      {label}
    </span>
  );
};

export default HomeCodeEditor;
