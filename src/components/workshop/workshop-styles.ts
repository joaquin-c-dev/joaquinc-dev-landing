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
 * CTA primario (handoff "CTA 3a"): degradado azul→morado propio de la página, brillo
 * interior, hover con brillo y foco visible. Mínimo 44px de alto para el dedo.
 */
export const WS_CTA =
  "inline-flex min-h-[44px] items-center font-bold text-white " +
  "bg-[linear-gradient(100deg,#2A9DF4,#7B5CF0)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] " +
  "transition-[filter] duration-150 hover:brightness-110 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FC8FF]";

/** Sombra extra del CTA principal (tarjeta de precio y CTA final). */
export const WS_CTA_GLOW =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_28px_-10px_rgba(110,110,240,0.7)]";

/** Cápsula oscura dentro del botón con el precio. */
export const WS_CTA_CAPSULE = "bg-[rgba(10,12,20,0.35)]";

/** Link ámbar de los CTAs (transferencia). */
export const WS_CTA_LINK = "text-[#F2B84B] transition-colors hover:text-[#FFD27A]";
