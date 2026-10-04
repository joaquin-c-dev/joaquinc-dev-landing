import { useEffect, useState } from "react";

/**
 * Navegadores internos de Instagram y Facebook (de ahí llega casi todo el tráfico de
 * Meta) y celulares en general. Ahí abrir pestañas nuevas falla o se ve mal: el
 * navegador interno bloquea `window.open` o la abre en una vista que no se puede cerrar.
 */
const IN_APP_OR_MOBILE_UA = /FBAN|FBAV|FB_IAB|Instagram|Android|iPhone|iPad|iPod/i;

/** Solo en el cliente: en el servidor no hay `navigator`. */
export function isMobileOrInAppBrowser(): boolean {
  if (typeof window === "undefined") return false;
  return (
    IN_APP_OR_MOBILE_UA.test(navigator.userAgent) ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/** En celular navega en la misma pestaña; en computadora abre una nueva. */
export function openExternal(url: string): void {
  if (isMobileOrInAppBrowser()) {
    window.location.assign(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Para los `<a>` externos: `false` en el servidor y en el primer render (sin desajuste
 * de hidratación) y `true` en celular ya en el cliente, para quitarles `target="_blank"`.
 */
export function useOpensInSameTab(): boolean {
  const [sameTab, setSameTab] = useState(false);
  useEffect(() => setSameTab(isMobileOrInAppBrowser()), []);
  return sameTab;
}
