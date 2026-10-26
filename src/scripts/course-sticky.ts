/**
 * Barra fija del celular en las páginas de curso: aparece cuando el hero ya salió de pantalla y
 * se esconde al llegar a la tarjeta de precio (ahí ya está el botón).
 */
const bar = document.querySelector<HTMLElement>("[data-sticky-cta]");
const hero = document.querySelector("main section");
const price = document.getElementById("precio");

if (bar && hero && price) {
  let heroVisible = true;
  let priceVisible = false;
  const update = () => {
    const visible = !heroVisible && !priceVisible;
    bar.dataset.visible = String(visible);
    // El botón flotante de WhatsApp sube mientras la barra está visible (ver index.css).
    document.documentElement.dataset.stickyCta = String(visible);
    bar.setAttribute("aria-hidden", String(!visible));
    bar.querySelector("a")?.setAttribute("tabindex", visible ? "0" : "-1");
  };
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    update();
  }).observe(hero);
  new IntersectionObserver(([entry]) => {
    priceVisible = entry.isIntersecting;
    update();
  }).observe(price);
}
