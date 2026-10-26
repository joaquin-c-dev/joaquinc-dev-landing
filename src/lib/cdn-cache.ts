/**
 * Caché en el CDN de Netlify para páginas que solo dependen de los cursos de la API.
 *
 * Sin esto cada visita ejecuta la función SSR y llama a la API (~1.2 s de TTFB en celular).
 * Con esto el HTML sale del borde del CDN: se considera fresco 5 minutos y después se sigue
 * sirviendo mientras se regenera en segundo plano, así que un cambio en el panel tarda como
 * máximo unos minutos en verse. Cada deploy limpia el caché solo.
 *
 * No usar en páginas que dependen de la petición (`/pagar`, gracias con `session_id`).
 */
const CDN_CACHE = "public, durable, s-maxage=300, stale-while-revalidate=604800";

export function cacheOnCdn(headers: Headers): void {
  headers.set("Netlify-CDN-Cache-Control", CDN_CACHE);
  // El navegador siempre revalida: así nadie se queda con una versión vieja guardada.
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
}
