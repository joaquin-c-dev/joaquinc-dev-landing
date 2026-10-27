import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { getHomeCourseCard } from "@/lib/course-listings";
import { formatDurationHours } from "@/lib/course-formatters";
import { formatPrice } from "@/lib/workshop-format";
import {
  HOME_CONTAINER,
  HOME_EYEBROW,
  HOME_H2,
  HOME_MUTED,
  reveal,
} from "./home-theme";
import {
  courseKindLabel,
  currentPrice,
  formatNextStart,
} from "./home-course-utils";

interface HomeCourseCatalogProps {
  /** Cursos activos en la API, ya en el orden del home. */
  courses: Course[];
  /** Cursos y talleres con un grupo futuro, ordenados por fecha de inicio. */
  upcomingStarts: Course[];
}

interface CourseCardProps {
  course: Course;
  /** El curso con su grupo futuro, si tiene fecha de inicio. */
  upcoming?: Course;
  /** Retraso de la entrada en cascada, según su posición en la cuadrícula. */
  revealDelay: number;
}

const CourseCard = ({ course, upcoming, revealDelay }: CourseCardProps) => {
  const nextStart = formatNextStart(upcoming);
  const price = currentPrice(course);
  const hasDiscount =
    price != null && course.regularPrice != null && price < course.regularPrice;
  const features = getHomeCourseCard(course).features;
  const description = course.subtitle ?? course.seo?.description;
  return (
    // La entrada va en el contenedor y la elevación al pasar el mouse en el link: las dos usan
    // `transform` y así no se pisan.
    <div {...reveal(revealDelay)}>
      <a
        href={`/${course.slug}`}
        className={`group flex h-full flex-col rounded-[16px] border p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FC8FF] ${
          nextStart
            ? "border-[#ffc66d]/30 bg-[linear-gradient(160deg,rgba(255,198,109,0.07),#12151a_45%)] hover:border-[#ffc66d]/60"
            : "border-white/[0.08] bg-[#12151a] hover:border-white/25"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11.5px] font-medium text-[#c9cdd3]">
            {courseKindLabel(course)}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-[12.5px] ${HOME_MUTED}`}
          >
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {formatDurationHours(course.durationInHours)}
          </span>
        </div>

        <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-[-0.015em] text-white">
          {course.title}
        </h3>
        {description && (
          <p
            className={`mt-2 line-clamp-2 text-[14px] leading-[1.55] ${HOME_MUTED}`}
          >
            {description}
          </p>
        )}
        <ul className="mb-6 mt-4 flex flex-wrap gap-1.5">
          {features.map((feature) => (
            <li
              key={feature}
              className="rounded-md bg-white/[0.05] px-2 py-1 text-[12.5px] text-[#c9cdd3]"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-white/[0.07] pt-4">
          <p className="flex items-center gap-1.5 text-[13.5px]">
            <CalendarDays
              className={`h-4 w-4 ${nextStart ? "text-[#ffc66d]" : "text-[#6f7580]"}`}
              aria-hidden
            />
            {nextStart ? (
              <span className="text-[#d5d8dd]">
                Empieza el{" "}
                <strong className="font-semibold text-[#ffc66d]">
                  {nextStart.toLowerCase()}
                </strong>
              </span>
            ) : (
              <span className={HOME_MUTED}>Fecha por anunciar</span>
            )}
          </p>
          <div className="mt-3 flex items-end justify-between gap-3">
            {price != null && (
              <p className="text-[13px] text-[#8b919b]">
                <span className="text-[18px] font-semibold text-white">
                  {formatPrice(price)}
                </span>{" "}
                MXN
                {hasDiscount && (
                  <span className="ml-2 line-through">
                    {formatPrice(course.regularPrice!)}
                  </span>
                )}
              </p>
            )}
            <span
              className={`ml-auto inline-flex items-center gap-1 text-[14px] font-medium ${
                nextStart ? "text-[#ffc66d]" : "text-[#c9cdd3]"
              }`}
            >
              {nextStart ? "Ver curso" : "Ver temario"}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

/**
 * Catálogo completo del home, armado solo con los cursos activos de la API: si se desactiva
 * uno, desaparece; si se crea uno nuevo, aparece. Los que tienen grupo agendado muestran su
 * fecha de inicio (los próximos inicios también van destacados en su propia sección).
 */
const HomeCourseCatalog = ({
  courses,
  upcomingStarts,
}: HomeCourseCatalogProps) => {
  const upcomingBySlug = new Map(
    upcomingStarts.map((course) => [course.slug, course]),
  );
  return (
    <section id="cursos" className="scroll-mt-24 pb-24 pt-16 md:pb-32 md:pt-20">
      <div className={HOME_CONTAINER}>
        <div className="max-w-[880px]">
          <p {...reveal(0)} className={HOME_EYEBROW}>
            {"// catálogo"}
          </p>
          <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
            Todos los cursos y talleres{" "}
            <span
              aria-hidden
              className="ml-1 inline-block -translate-y-[0.35em] rounded-full bg-white/[0.07] px-3 py-1 align-middle text-[16px] font-medium leading-none tracking-normal text-[#c9cdd3]"
            >
              {courses.length}
            </span>
          </h2>
          <p
            {...reveal(140)}
            className={`mt-4 text-[17px] leading-[1.6] ${HOME_MUTED}`}
          >
            Todos son en vivo por Zoom y con grabación de cada clase. Entra a
            cualquiera para ver el temario completo.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              upcoming={upcomingBySlug.get(course.slug)}
              revealDelay={index * 70}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCourseCatalog;
