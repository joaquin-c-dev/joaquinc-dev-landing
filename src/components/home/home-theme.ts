/**
 * Tokens del home "IDE en vivo": la misma identidad del taller (fondo casi negro, acento
 * amarillo, Geist + JetBrains Mono) para que todo el sitio se sienta una sola marca.
 */
import type { CSSProperties } from "react";

export const HOME_BG = "bg-[#0b0d10]";
export const HOME_BAND = "bg-[#0e1014]";
export const HOME_TEXT = "text-[#eceef1]";
export const HOME_MUTED = "text-[#9da3ad]";
export const HOME_ACCENT = "text-[#ffc66d]";
export const HOME_CONTAINER = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

/** Etiqueta de sección estilo comentario de código: `// 01 — el problema`. */
export const HOME_EYEBROW =
  "font-['JetBrains_Mono',ui-monospace,monospace] text-[12.5px] tracking-[0.02em] text-[#ffc66d]";

export const HOME_H2 =
  "text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]";

/**
 * Entrada al hacer scroll sin JavaScript de React: el elemento lleva `data-reveal` y el script
 * del home (`home-reveal.ts`) le agrega `is-revealed` al entrar en pantalla; la transición vive
 * en `index.css`. `delayMs` arma la cascada (~70 ms entre elementos de una lista).
 */
export const reveal = (delayMs = 0) => ({
  "data-reveal": "",
  style: { "--reveal-delay": `${delayMs}ms` } as CSSProperties,
});

/**
 * Entrada del hero al cargar, solo con CSS (`[data-rise]` en index.css): no espera a ningún
 * script, para no retrasar el primer pintado del título (LCP).
 */
export const rise = (delayMs = 0) => ({
  "data-rise": "",
  style: { "--reveal-delay": `${delayMs}ms` } as CSSProperties,
});
