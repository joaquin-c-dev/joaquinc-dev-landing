/**
 * Fotos reales de clases en Zoom para el home: capturas de la galería de Zoom tal cual
 * (ya traen los cuadros y nombres, así que no llevan texto encima). Para cambiarlas, copia
 * el archivo a `public/images/clases/` (WebP, ~1200 px de ancho) y pon aquí su `src`: el
 * archivo debe existir, porque la página es HTML estático y no tiene marcador de respaldo.
 * Usa solo capturas donde los alumnos que salen hayan dado permiso de publicarlas.
 */
export interface ClassPhoto {
  src: string;
  alt: string;
  /** Pie de foto, p. ej. "Fin de clase con el grupo". */
  caption: string;
}

export const CLASS_PHOTOS: ClassPhoto[] = [
  {
    src: "/images/clases/clase-1.webp",
    alt: "Captura de Zoom: Joaquín y dos alumnos se despiden sonriendo al terminar la clase",
    caption: "Fin de clase con el grupo",
  },
  {
    src: "/images/clases/clase-2.webp",
    alt: "Pantalla de inicio de sesión de Miniform, la app de formularios que se construye en clase",
    caption: "El proyecto que construyes: Miniform",
  },
  {
    src: "/images/clases/clase-3.webp",
    alt: "IntelliJ y Docker Desktop levantando la API de Spring Boot con MySQL y RabbitMQ",
    caption: "Levantando la API con Docker",
  },
];
