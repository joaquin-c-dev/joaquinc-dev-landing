/**
 * Texto del aviso de privacidad en un solo lugar: lo usan la página /politicas-de-privacidad y el
 * formulario de pago (que lo muestra sin salir del formulario).
 */

export interface PrivacySection {
  title: string;
  /** Párrafo de la sección (o la introducción de la lista, si la hay). */
  text: string;
  items?: string[];
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: "Introducción",
    text: "Nos comprometemos a proteger la privacidad de nuestros estudiantes y a garantizar que su información personal sea tratada de manera segura y responsable. Esta política de privacidad describe cómo recopilamos, usamos y protegemos la información que obtenemos de nuestros estudiantes.",
  },
  {
    title: "Información que recopilamos",
    text: "Recopilamos información personal que nos proporcionas al registrarte para nuestros cursos, que puede incluir:",
    items: ["Nombre", "Correo electrónico", "Número de teléfono", "Información de pago (si aplica)"],
  },
  {
    title: "Uso de la información",
    text: "Utilizamos la información recopilada para:",
    items: [
      "Proporcionar acceso a nuestros cursos y materiales de aprendizaje.",
      "Enviar confirmaciones de registro y detalles sobre el curso.",
      "Comunicarte sobre futuras ofertas y eventos relacionados con nuestros cursos.",
      "Mejorar nuestros servicios y la experiencia del estudiante.",
    ],
  },
  {
    title: "Compartir información",
    text: "No compartimos tu información personal con terceros, excepto en los siguientes casos:",
    items: [
      "Con proveedores de servicios que nos ayudan a operar nuestro negocio (por ejemplo, procesadores de pagos).",
      "Cuando sea requerido por la ley o para proteger nuestros derechos.",
    ],
  },
  {
    title: "Seguridad de la información",
    text: "Implementamos medidas de seguridad adecuadas para proteger tu información personal contra el acceso no autorizado, la divulgación, la alteración o la destrucción.",
  },
  {
    title: "Derechos del usuario",
    text: "Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Si deseas ejercer estos derechos, contáctanos a través de la información proporcionada al final de esta política.",
  },
  {
    title: "Cambios en la política de privacidad",
    text: "Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cualquier cambio significativo a través de tu correo electrónico o mediante un aviso en nuestro sitio web.",
  },
];

export const PRIVACY_CONTACT = {
  intro:
    "Si tienes preguntas o inquietudes sobre nuestras políticas de privacidad, no dudes en contactarnos a través de:",
  email: "joaquincorram@gmail.com",
  phone: "3310881011",
};
