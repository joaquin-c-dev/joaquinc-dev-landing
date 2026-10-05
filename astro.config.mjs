import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchCoursesFromApi } from "./src/lib/course-api.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE = "https://joaquincoronado.dev";

const apiCourses = await fetchCoursesFromApi().catch(() => []);
const COURSE_SLUGS = apiCourses
  .filter((course) => course.status === "ACTIVE" && course.slug?.trim())
  .map((course) => course.slug);

// Paginas que no deben indexarse (coinciden con noindex en cada pagina).
const NOINDEX_PATHS = ["/gracias-por-tu-compra", "/politicas-de-privacidad", "/pagar/"];

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
      // Sin "/" final, igual que el canonical de cada página (señales consistentes).
      serialize: (item) => {
        const url = new URL(item.url);
        if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
        return { ...item, url: url.href };
      },
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
