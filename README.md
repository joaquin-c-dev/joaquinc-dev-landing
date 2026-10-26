# joaquinc-dev-landing

Sitio público de [joaquincoronado.dev](https://joaquincoronado.dev): cursos y talleres en vivo de Java, Spring Boot y Claude, con inscripción y pago.

## Stack

- **Astro** (SSR) con el adaptador de **Netlify**.
- **React** solo en islas pequeñas (menú, WhatsApp, tarjeta de precio, formulario de pago); el resto es HTML sin hidratar.
- **Tailwind CSS** y animaciones con CSS + `IntersectionObserver` (`src/scripts/`).
- Los cursos vienen de **academy-api** (`GET /course/v1/course/query?status=ACTIVE`); el pago crea una sesión de Stripe en la API.

## Correr en local

Requiere Node 24 y npm (Netlify instala con npm; no uses otro gestor).

```sh
npm install
COURSE_API_BASE_URL=http://localhost:8081 npm run dev
```

`COURSE_API_BASE_URL` apunta a la API de cursos. Sin ella se usa `http://localhost:8080`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | ESLint |

## Estructura

```
src/
├── pages/        # Rutas: home, /{curso}, /pagar/{curso}, gracias, acerca de mí, privacidad, 404
├── screens/      # Páginas completas en React renderizadas como HTML estático
├── components/   # home/, coursepage/, workshop/, purchase/, checkout/ y compartidos
├── lib/          # Cliente de la API, textos, reseñas, SEO / JSON-LD, utilidades
├── scripts/      # JS sin React: animaciones al hacer scroll, cuenta regresiva, confeti
└── layouts/      # BaseLayout con meta tags y SEO
```

## Deploy

Netlify despliega automáticamente al hacer merge a `main` (merge a `main` = producción). La URL de la API de producción está en `netlify.toml` (`COURSE_API_BASE_URL`).
