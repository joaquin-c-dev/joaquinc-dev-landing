/**
 * Tokens del diseño de la página de talleres (handoff de Claude Design).
 * Están acotados a esta página a propósito: cambiar `--primary` global alteraría
 * el look de todas las páginas de cursos.
 */

export const WS_CONTAINER = "mx-auto w-full max-w-[1160px] px-6";

export const WS_FONT_UI = "font-['Geist',ui-sans-serif,system-ui,sans-serif]";
export const WS_FONT_MONO = "font-['Geist_Mono',ui-monospace,monospace]";
export const WS_FONT_CODE = "font-['JetBrains_Mono',ui-monospace,monospace]";

/** Banda alterna de sección. */
export const WS_BAND = "bg-[#0e1014] border-y border-white/[0.07]";

export const WS_CARD = "rounded-[14px] border border-white/[0.08] bg-[#12151a]";

export const WS_EYEBROW = `${WS_FONT_MONO} text-[12.5px] tracking-[0.04em] text-[#ffc66d]`;

export const WS_H2 =
  "text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.1] tracking-[-0.025em] [text-wrap:balance]";

export const WS_LINK = "text-[#ffc66d] transition-colors hover:text-[#ffd899]";

/**
 * CTA primario: el mismo degradado azul→morado (`--gradient-accent`) y hover de los
 * botones del resto del sitio, para que la marca sea consistente entre páginas.
 */
export const WS_CTA =
  "inline-flex items-center justify-center gap-2.5 font-semibold text-white " +
  "bg-gradient-accent hover:opacity-90 transition-opacity duration-200";
