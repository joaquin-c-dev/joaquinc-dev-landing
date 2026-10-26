import type { CSSProperties } from "react";

type TokenKind = "plain" | "keyword" | "annotation" | "method" | "string" | "type";
type Token = [string, TokenKind?];

/** Colores del tema oscuro de IntelliJ IDEA (los mismos de la ventana del taller). */
const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: "text-[#BCBEC4]",
  keyword: "text-[#CF8E6D]",
  annotation: "text-[#B3AE60]",
  method: "text-[#56A8F5]",
  string: "text-[#6AAB73]",
  type: "text-[#BCBEC4]",
};

/** Código real del tipo que se escribe en clase: una API REST con Spring Boot. */
const CODE: Token[][] = [
  [["@RestController", "annotation"]],
  [["@RequestMapping", "annotation"], ["("], ['"/api/courses"', "string"], [")"]],
  [["public class ", "keyword"], ["CourseController", "type"], [" {"]],
  [[""]],
  [["    private final ", "keyword"], ["CourseService courseService;"]],
  [[""]],
  [["    @GetMapping", "annotation"]],
  [["    public ", "keyword"], ["List<Course> "], ["list", "method"], ["() {"]],
  [["        return ", "keyword"], ["courseService."], ["listActive", "method"], ["();"]],
  [["    }"]],
  [[""]],
  [["    @PostMapping", "annotation"]],
  [["    @PreAuthorize", "annotation"], ["("], ['"hasRole(\'ADMIN\')"', "string"], [")"]],
  [["    public ", "keyword"], ["Course "], ["create", "method"], ["("], ["@Valid @RequestBody", "annotation"], [" Course course) {"]],
  [["        return ", "keyword"], ["courseService."], ["create", "method"], ["(course);"]],
  [["    }"]],
  [["}"]],
];

/**
 * Editor estilo IntelliJ con un controlador de Spring Boot. Las líneas aparecen una tras
 * otra al cargar con una animación de CSS (`home-code-line` en index.css), sin JavaScript;
 * con "reducir movimiento" se muestran de inmediato.
 */
const HomeCodeEditor = () => (
  <div className="overflow-hidden rounded-xl border border-[#393B40] bg-[#1E1F22] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
    <div className="flex h-[38px] items-center gap-2 border-b border-black/30 bg-[#2B2D30] px-3.5">
      <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
      <span className="ml-2.5 truncate text-[12.5px] text-[#9DA0A8]">academy-api — CourseController.java</span>
    </div>
    <div className="flex h-9 border-b border-[#393B40]">
      <div className="flex items-center gap-2 border-b-2 border-[#3574F0] px-3.5 text-[13px] text-[#DFE1E5]">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3574F0] text-[9px] font-bold text-white">C</span>
        CourseController.java
      </div>
      <div className="hidden items-center gap-2 px-3.5 text-[13px] text-[#8C8F96] sm:flex">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3574F0] text-[9px] font-bold text-white opacity-55">C</span>
        SecurityConfig.java
      </div>
    </div>
    <div
      className="overflow-x-auto py-4 pr-4 font-['JetBrains_Mono',ui-monospace,monospace] text-[12px] leading-[1.75] sm:text-[13px] [@media(min-width:1024px)_and_(max-height:760px)]:py-3 [@media(min-width:1024px)_and_(max-height:760px)]:text-[12.5px] [@media(min-width:1024px)_and_(max-height:760px)]:leading-[1.5] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="img"
      aria-label="Código de ejemplo: un controlador REST de Spring Boot que lista y crea cursos, protegido con Spring Security"
    >
      {CODE.map((line, index) => (
        <div
          key={index}
          className="home-code-line flex whitespace-pre"
          style={{ "--line": index } as CSSProperties}
        >
          <span className="w-10 shrink-0 select-none pr-4 text-right text-[#4B5059]">{index + 1}</span>
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

export default HomeCodeEditor;
