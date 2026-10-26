/**
 * JavaScript de la página de taller (sin React):
 * - Cuenta regresiva de `[data-countdown-to]`: actualiza cada segundo y se oculta al empezar.
 * - Links externos con `data-same-tab-mobile`: en celular y en los navegadores de Instagram y
 *   Facebook se abren en la misma pestaña (ahí las pestañas nuevas fallan).
 */
import { isMobileOrInAppBrowser } from "@/lib/mobile-navigation";

const UNIT_MS = { days: 86_400_000, hours: 3_600_000, minutes: 60_000, seconds: 1_000 } as const;
const UNIT_MOD = { days: Infinity, hours: 24, minutes: 60, seconds: 60 } as const;
const pad = (value: number) => String(value).padStart(2, "0");

for (const countdown of document.querySelectorAll<HTMLElement>("[data-countdown-to]")) {
  const target = new Date(countdown.dataset.countdownTo!).getTime();
  const render = () => {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      countdown.hidden = true;
      return false;
    }
    for (const cell of countdown.querySelectorAll<HTMLElement>("[data-unit]")) {
      const unit = cell.dataset.unit as keyof typeof UNIT_MS;
      cell.textContent = pad(Math.floor(remaining / UNIT_MS[unit]) % UNIT_MOD[unit]);
    }
    return true;
  };
  if (render()) {
    const timer = window.setInterval(() => {
      if (!render()) window.clearInterval(timer);
    }, 1000);
  }
}

if (isMobileOrInAppBrowser()) {
  for (const link of document.querySelectorAll<HTMLAnchorElement>("a[data-same-tab-mobile]")) {
    link.removeAttribute("target");
  }
}
