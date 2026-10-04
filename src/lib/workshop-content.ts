/**
 * Contenido de la página de talleres que TODAVÍA NO EXISTE en el modelo `Course`.
 *
 * Es temporal: cada bloque de `WorkshopContent` está pensado para convertirse en un
 * campo del curso en la API/panel. Cuando exista, `getWorkshopContent` leerá del curso
 * y los componentes no cambian. Lo que ya viene de la API (título, descripción, precio,
 * temario, requisitos, fecha) NO se repite aquí.
 */
import { ASSETS } from "@/lib/assets";

export type CodeTokenKind =
  | "plain"
  | "keyword"
  | "annotation"
  | "method"
  | "string"
  | "constant";

/** Una línea de código ya coloreada: pares [texto, tipo]. */
export type CodeLine = Array<[string, CodeTokenKind?]>;

export interface WorkshopCodeShowcase {
  /** Nombre del proyecto que se ve en la barra de título del IDE. */
  projectName: string;
  /** Archivos como pestañas; el primero es el activo. */
  fileNames: string[];
  lines: CodeLine[];
}

export interface WorkshopTakeaway {
  title: string;
  description: string;
}

export interface WorkshopFaqItem {
  question: string;
  answer: string;
}

export interface WorkshopTestimonial {
  quote: string;
  /** Nombre según el permiso del alumno (completo o iniciales). */
  name: string;
  /** Curso que tomó el alumno; va en la etiqueta azul de la tarjeta. */
  course: string;
  /** Recomendación 0–10 de la encuesta. Las estrellas son nps / 2. */
  nps: number;
  /** Mes de la reseña, p. ej. "sep 2026". */
  date: string;
  /** Color del avatar, el mismo que usan tus historias "Referencias". */
  avatarColor: string;
}

export interface WorkshopContent {
  takeaways: WorkshopTakeaway[];
  codeShowcase?: WorkshopCodeShowcase;
  /** "Es para ti si…". Si está vacío se oculta la tarjeta. */
  audience?: string[];
  /** Preguntas propias del taller; las de lugar, equipo y pago se generan solas. */
  faq?: WorkshopFaqItem[];
  finalCtaHeadline?: string;
  /** Solo testimonios reales. Si está vacío se oculta la sección. */
  testimonials?: WorkshopTestimonial[];
}

/** Perfil del instructor. Hoy el sitio no tiene modelo de instructor: vive aquí. */
export const INSTRUCTOR_PROFILE = {
  name: "Joaquín Coronado",
  photo: ASSETS.joaquinProfile,
  tagline: "Head of Backend · +10 años en backend Java",
  bio: "Head of Backend con más de 10 años construyendo sistemas en Java. En el taller te enseño lo que uso en producción, no solo lo que dice la documentación.",
  linkedinUrl: "https://www.linkedin.com/in/joaquincr/",
} as const;

export const WHATSAPP_NUMBER = "5213331071527";

/** Texto fijo del sitio, el mismo que usa CoursePrerequisites. */
export const INTERNET_REQUIREMENT = "Conexión a internet estable (recomendado por cable)";

/**
 * Testimonios reales de exalumnos (encuesta de experiencia, sep 2026; second brain:
 * OUTPUTS/2026-09-26-encuesta-experiencia-alumnos.md). Frases TEXTUALES, sin corregir.
 * El nombre respeta el permiso de cada alumno: "con mi nombre" = completo,
 * "solo mi inicial" = iniciales. Juan E. no dejó frase ni permiso: no se publica.
 * Son de los cursos que tomaron (no de un taller), por eso la tarjeta muestra el curso.
 */
export const ALUMNI_TESTIMONIALS = {
  eduardo: {
    quote:
      "El curso de Spring Boot intermedio de Joaquín es una de las mejores opciones que puedes tomar para comprender el framework, pero sobre todo ganas confianza y perder ese miedo, sacar el máximo provecho y avanzar en tu trabajo. Lo recomiendo ampliamente.",
    name: "Eduardo Rey Heredia Velázquez",
    course: "Java Intermedio",
    nps: 10,
    date: "sep 2026",
    avatarColor: "#1a73e8",
  },
  marco: {
    quote:
      "La experiencia y conocimiento compartido con metodología y paciencia siempre nos brinda mejores herramientas a título personal en nuestro ámbito profesional.",
    name: "Marco Antonio González Serrano",
    course: "Java Intermedio · Claude Code",
    nps: 9,
    date: "sep 2026",
    avatarColor: "#e8710a",
  },
  mario: {
    quote: "Confianza, certeza y dominio del tema.",
    name: "Mario Lara Pérez",
    course: "Desarrollo Guiado por IA con Claude Code",
    nps: 10,
    date: "sep 2026",
    avatarColor: "#188038",
  },
  angel: {
    quote:
      "Excelente para quienes quieren incursionar en el desarrollo backend con Spring Boot.",
    name: "Á. L.",
    course: "Java desde Cero",
    nps: 9,
    date: "sep 2026",
    avatarColor: "#9334e6",
  },
  edgar: {
    quote:
      "Curso muy recomendable, el instructor está actualizado y responde todas las dudas que se le plantearon. En la medida de lo posible seguiré tomando sus cursos.",
    name: "Edgar García Aguilar",
    course: "Java desde Cero · Java Intermedio",
    nps: 9,
    date: "sep 2026",
    avatarColor: "#d93025",
  },
} satisfies Record<string, WorkshopTestimonial>;

/** Se usa cuando un taller aún no tiene contenido propio. */
const DEFAULT_TAKEAWAYS: WorkshopTakeaway[] = [
  {
    title: "Teoría al grano",
    description: "Solo los conceptos que necesitas, con ejemplos reales de producción.",
  },
  {
    title: "Programas desde el primer bloque",
    description: "Construimos juntos, paso a paso, y resolvemos tus dudas en el momento.",
  },
  {
    title: "Un proyecto funcionando",
    description: "Terminas con un proyecto que puedes seguir extendiendo o llevar a tu trabajo.",
  },
];

const WORKSHOP_CONTENT_BY_SLUG: Record<string, Partial<WorkshopContent>> = {
  "taller-spring-security-jwt": {
    takeaways: [
      DEFAULT_TAKEAWAYS[0],
      {
        title: "Programas desde el primer bloque",
        description:
          "Construimos la API juntos, paso a paso, y resolvemos tus dudas en el momento.",
      },
      {
        title: "Un proyecto funcionando",
        description:
          "Terminas con una API protegida que puedes seguir extendiendo o llevar a tu trabajo.",
      },
    ],
    codeShowcase: {
      projectName: "taller-jwt",
      fileNames: ["SecurityConfig.java", "JwtFilter.java"],
      lines: [
        [["@Bean", "annotation"]],
        [["public", "keyword"], [" SecurityFilterChain "], ["filterChain", "method"], ["(HttpSecurity http) {"]],
        [["    "], ["return", "keyword"], [" http"]],
        [["        .csrf(c -> c.disable())"]],
        [["        .sessionManagement(s -> s"]],
        [["            .sessionCreationPolicy(SessionCreationPolicy."], ["STATELESS", "constant"], ["))"]],
        [["        .authorizeHttpRequests(a -> a"]],
        [["            .requestMatchers("], ['"/auth/**"', "string"], [").permitAll()"]],
        [["            .requestMatchers("], ['"/admin/**"', "string"], [").hasRole("], ['"ADMIN"', "string"], [")"]],
        [["            .anyRequest().authenticated())"]],
        [["        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter."], ["class", "keyword"], [")"]],
        [["        .build();"]],
        [["}"]],
      ],
    },
    audience: [
      "Ya hiciste una API REST con Spring Boot y no sabes cómo protegerla bien",
      "Eres dev junior o estudiante y quieres dominar un tema que piden en entrevistas",
      "Eres mid/senior y quieres entender de verdad la cadena de filtros de Spring Security",
    ],
    faq: [
      {
        question: "¿Puedo tomarlo si no cumplo los conocimientos previos?",
        answer:
          "Sí, pero lo vas a aprovechar mucho más si ya hiciste una API REST con Spring Boot.",
      },
    ],
    finalCtaHeadline: "Aparta tu lugar y protege tu API este sábado.",
    // Los de Spring Boot primero (los mismos del banner de Meta) + Mario, que habla del
    // dominio del instructor aunque su curso fue Claude Code.
    testimonials: [
      ALUMNI_TESTIMONIALS.eduardo,
      ALUMNI_TESTIMONIALS.marco,
      ALUMNI_TESTIMONIALS.mario,
      ALUMNI_TESTIMONIALS.angel,
      ALUMNI_TESTIMONIALS.edgar,
    ],
  },
};

export function getWorkshopContent(slug: string): WorkshopContent {
  const custom = WORKSHOP_CONTENT_BY_SLUG[slug] ?? {};
  return { takeaways: DEFAULT_TAKEAWAYS, ...custom };
}
