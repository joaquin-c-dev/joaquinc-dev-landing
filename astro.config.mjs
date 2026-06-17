import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE = "https://joaquinc.dev";

// Slugs de cursos servidos por la ruta dinamica [slug].astro. Como el sitio es
// SSR, estas URLs no se descubren solas en build, por eso se listan aqui.
const COURSE_SLUGS = [
  "introduccion-programacion",
  "java-desde-cero",
  "java-intermedio",
  "taller-poo",
];

// Paginas que no deben indexarse (coinciden con noindex en cada pagina).
const NOINDEX_PATHS = ["/gracias-por-tu-compra", "/politicas-de-privacidad"];

// https://astro.build/config
export default defineConfig({
  // SSR on-demand rendering so course data (and SEO/OG metadata) is read
  // per-request and changes are reflected immediately without a redeploy.
  output: "server",
  adapter: netlify(),
  site: SITE,
  integrations: [
    react(),
    sitemap({
      customPages: COURSE_SLUGS.map((slug) => `${SITE}/${slug}`),
      filter: (page) =>
        !NOINDEX_PATHS.some((path) => page.includes(path)),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
