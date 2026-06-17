/**
 * Rutas publicas de assets estaticos.
 *
 * Los archivos viven en public/images/ para que funcionen igual en SSR,
 * hidratacion de islas React y en produccion, sin depender de como Vite
 * resuelve los imports de imagen (que en Astro pueden devolver un objeto
 * en lugar de un string URL).
 */
export const ASSETS = {
  joaquinProfile: "/images/joaquin-profile.jpg",
  whatsappLogo: "/images/whatsapp-logo.svg",
  intellijLogo: "/images/intellij-logo.png",
  stripeLogo: "/images/stripe-logo.png",
  paypalLogo: "/images/paypal-logo.png",
  javaHero: "/images/java-hero.jpg",
} as const;
