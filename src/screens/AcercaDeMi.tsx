import { ArrowRight, Linkedin, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import HomeClasses from "@/components/home/HomeClasses";
import HomeReviews from "@/components/home/HomeReviews";
import ZoomFrame from "@/components/home/ZoomFrame";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal, rise } from "@/components/home/home-theme";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import { CoursesNavProvider, type NavCourse } from "@/contexts/CoursesNavContext";
import { ASSETS } from "@/lib/assets";
import { CLASS_PHOTOS } from "@/lib/class-photos";
import { INSTRUCTOR_PROFILE, getCourseTestimonials } from "@/lib/workshop-content";

interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  tag: string;
  highlights: string[];
}

const EXPERIENCES: Experience[] = [
  {
    company: "Avena Health",
    companyUrl: INSTRUCTOR_PROFILE.company.url,
    role: "Líder Técnico",
    period: "Mayo 2024 – Actual",
    location: "Guadalajara, México",
    current: true,
    tag: "Actual",
    highlights: [
      "Gestión de todos los proyectos backend de la empresa",
      "Arquitectura y consultoría técnica",
      "Optimización de costos de servidor y bases de datos",
      "Mentoring y crecimiento del equipo",
    ],
  },
  {
    company: "Formación Profesional",
    role: "Instructor de cursos",
    period: "Feb 2017 – Actual",
    location: "Guadalajara, México",
    current: true,
    tag: "Instructor",
    highlights: [
      "Más de 8 años formando desarrolladores Java",
      "Especialización en Spring Boot y Spring Security",
      "Experiencia con tecnologías cloud y microservicios",
    ],
  },
  {
    company: "Globant (CapitalOne)",
    role: "Java Developer",
    period: "Ago 2023 – Mayo 2024",
    location: "Nueva York, USA",
    tag: "Fortune 500",
    highlights: [
      "Reducción de vulnerabilidades en 60% de microservicios financieros",
      "Migración Java 8 → Java 17 y Spring Boot 2 → 3",
      "Liderazgo técnico en sistemas críticos financieros",
    ],
  },
  {
    company: "Globant (GoDaddy)",
    role: "DevOps Engineer",
    period: "Abr 2022 – Ago 2023",
    location: "Silicon Valley, USA",
    tag: "Fortune 500",
    highlights: [
      "Modernización de plataformas legacy a cloud",
      "Optimización de servicios Go, Java y PHP",
      "Implementación de seguridad a gran escala",
    ],
  },
];

const SKILLS = [
  "Java 25", "Spring Boot", "Spring Security", "Spring Cloud", "MongoDB", "MySQL", "GCP", "AWS",
  "Docker", "Microservicios", "API REST", "Maven", "Git", "React.js", "Go", "Claude Code",
];

const STATS = [
  { value: "Líder Técnico", label: "en Avena Health" },
  { value: "+10 años", label: "en backend Java" },
  { value: "+8 años", label: "formando desarrolladores" },
  { value: "Fortune 500", label: "CapitalOne y GoDaddy" },
];

interface AcercaDeMiProps {
  navCourses?: NavCourse[];
}

/**
 * "Acerca de mí" con el look del inicio: hero con foto y captura de clase, datos, experiencia
 * como historial de Git, tecnologías, cómo son las clases, reseñas y cierre. HTML sin hidratar.
 */
const AcercaDeMi = ({ navCourses = [] }: AcercaDeMiProps) => {
  const testimonials = getCourseTestimonials();
  const rating = testimonials.length
    ? testimonials.reduce((sum, testimonial) => sum + testimonial.nps / 2, 0) / testimonials.length
    : 0;
  return (
    <>
      <main id="contenido">
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-28 md:pb-24 md:pt-36 lg:pt-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(53,116,240,0.16),transparent_70%)]"
          />
          <div className={`${HOME_CONTAINER} relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
            <div className="min-w-0">
              <p {...rise(0)} className={HOME_EYEBROW}>
                {"// acerca de mí"}
              </p>
              <h1
                {...rise(60)}
                className="mt-5 text-[clamp(38px,9vw,64px)] font-bold leading-[1.04] tracking-[-0.03em] [text-wrap:balance]"
              >
                Joaquín Coronado{" "}
                <span className="mt-[0.25em] block text-[0.45em] leading-[1.2] text-[#ffc66d]">
                  Líder Técnico en Avena Health · Instructor
                </span>
              </h1>
              <p {...rise(120)} className={`mt-6 max-w-[560px] text-[17px] leading-[1.65] ${HOME_MUTED}`}>
                Más de 10 años desarrollando backend en empresas Fortune 500 y más de 8 años formando a la
                próxima generación de desarrolladores Java. En clase te enseño lo que uso en producción, no
                solo lo que dice la documentación.
              </p>
              <div {...rise(180)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="/#cursos" className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}>
                  Ver mis cursos
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={INSTRUCTOR_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-[#d5d8dd] transition-colors hover:text-[#ffc66d]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                  LinkedIn
                </a>
              </div>
            </div>

            <div {...rise(150)} className="relative mx-auto w-full max-w-[460px] lg:mr-0">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[28px] bg-[radial-gradient(closest-side,rgba(255,198,109,0.16),transparent)]"
              />
              <img
                src={ASSETS.joaquinProfile}
                alt="Joaquín Coronado"
                width={460}
                height={560}
                className="relative aspect-[46/56] w-[82%] rounded-[22px] border border-white/10 object-cover"
              />
              {/* Captura real de una clase en Zoom, encimada: enseña en vivo. */}
              <div className="home-pop absolute -bottom-6 right-0 w-[58%]">
                <ZoomFrame photo={CLASS_PHOTOS[0]} live eager />
              </div>
            </div>
          </div>
        </section>

        {/* Datos */}
        <section aria-label="Datos del instructor" className="border-y border-white/[0.07] bg-[#0e1014]">
          <dl className={`${HOME_CONTAINER} grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12`}>
            {STATS.map((stat, index) => (
              <div
                key={stat.value}
                {...reveal(index * 70)}
                className="flex flex-col-reverse gap-1 px-2 md:border-l md:border-white/[0.07] md:px-6 md:first:border-l-0"
              >
                <dt className={`text-[13.5px] ${HOME_MUTED}`}>{stat.label}</dt>
                <dd className="text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.02em] text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Experiencia como historial de Git */}
        <section className="py-24 md:py-32">
          <div className={`${HOME_CONTAINER} grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-16`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p {...reveal(0)} className={HOME_EYEBROW}>
                {"// git log --experiencia"}
              </p>
              <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
                Experiencia profesional
              </h2>
              <p {...reveal(140)} className={`mt-4 text-[16px] leading-[1.6] ${HOME_MUTED}`}>
                Lo que enseño viene de sistemas reales: fintech, plataformas cloud y salud digital.
              </p>
            </div>
            <ol className="relative border-l border-white/10 pl-8">
              {EXPERIENCES.map((experience, index) => (
                <li key={experience.company} {...reveal(index * 70)} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[#0b0d10] ${
                      experience.current ? "bg-[#3ccf7a]" : "bg-[#56A8F5]"
                    }`}
                  />
                  <p className="font-['JetBrains_Mono',ui-monospace,monospace] text-[12.5px] text-[#8b919b]">
                    {experience.period}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[20px] font-semibold tracking-[-0.015em] text-white">{experience.role}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${
                        experience.current
                          ? "bg-[#3ccf7a]/15 text-[#7ee2a8]"
                          : "border border-white/10 text-[#c9cdd3]"
                      }`}
                    >
                      {experience.tag}
                    </span>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14.5px]">
                    {experience.companyUrl ? (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#ffc66d] hover:underline"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      <span className="font-medium text-[#ffc66d]">{experience.company}</span>
                    )}
                    <span className={`inline-flex items-center gap-1 ${HOME_MUTED}`}>
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {experience.location}
                    </span>
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[15px] text-[#c9cdd3]">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5">
                        <span aria-hidden className="text-[#6AAB73]">
                          ›
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tecnologías */}
        <section className="border-t border-white/[0.07] py-20 md:py-24">
          <div className={HOME_CONTAINER}>
            <p {...reveal(0)} className={HOME_EYEBROW}>
              {"// stack"}
            </p>
            <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
              Tecnologías con las que trabajo
            </h2>
            <ul {...reveal(140)} className="mt-10 flex flex-wrap gap-2.5">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-['JetBrains_Mono',ui-monospace,monospace] text-[13.5px] text-[#d5d8dd]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <HomeClasses />
        <HomeReviews testimonials={testimonials} rating={rating} />

        {/* Cierre */}
        <section className="relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(123,92,240,0.18),transparent_70%)]"
          />
          <div className={`${HOME_CONTAINER} relative flex flex-col items-center text-center`}>
            <p {...reveal(0)} className={HOME_EYEBROW}>
              {"// aprendamos juntos"}
            </p>
            <h2 {...reveal(70)} className={`${HOME_H2} mt-4 max-w-[760px]`}>
              ¿Te gustaría aprender conmigo?
            </h2>
            <p {...reveal(140)} className={`mt-5 max-w-[560px] text-[17px] ${HOME_MUTED}`}>
              Revisa los cursos con fecha de inicio o conecta conmigo en LinkedIn.
            </p>
            <div {...reveal(210)} className="mt-9 flex flex-wrap justify-center gap-4">
              <a href="/#cursos" className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}>
                Ver mis cursos
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={INSTRUCTOR_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 px-6 text-[15px] text-[#d5d8dd] transition-colors hover:border-white/30 hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                Ver mi LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <CoursesNavProvider courses={navCourses}>
        <Footer />
      </CoursesNavProvider>
    </>
  );
};

export default AcercaDeMi;
