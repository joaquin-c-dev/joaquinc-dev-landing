/**
 * Único JavaScript de las secciones del home: muestra cada `[data-reveal]` al entrar en
 * pantalla y anima los números `[data-count-to]` de la barra de datos. Con "reducir
 * movimiento" el CSS ya los deja visibles y los números se quedan con su valor final.
 */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function countUp(element: HTMLElement) {
  const target = Number(element.dataset.countTo);
  const decimals = Number(element.dataset.countDecimals ?? 0);
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / 1200, 1);
    element.textContent = (target * easeOut(progress)).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      element.classList.add("is-revealed");
      if (!reducedMotion) element.querySelectorAll<HTMLElement>("[data-count-to]").forEach(countUp);
      observer.unobserve(element);
    }
  },
  { rootMargin: "0px 0px -12% 0px" },
);

document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
