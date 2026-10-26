import { ArrowRight } from "lucide-react";
import type { Course, ScheduleItem } from "@/lib/course-types";
import { CLASS_PHOTOS } from "@/lib/class-photos";
import { getCourseSnippet } from "@/lib/code-snippets";
import { getCourseLogo } from "@/lib/course-offer";
import { formatDurationHours } from "@/lib/course-formatters";
import { WS_CTA, WS_CTA_GLOW } from "@/components/workshop/workshop-styles";
import HomeCodeEditor from "@/components/home/HomeCodeEditor";
import ZoomFrame from "@/components/home/ZoomFrame";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_MUTED, rise } from "@/components/home/home-theme";
import { startDateParts } from "@/components/home/home-course-utils";

interface CourseHeroProps {
  course: Course;
  /** Siguiente grupo que no ha empezado, si hay. */
  nextGroup?: ScheduleItem;
}

/**
 * Hero de la página de curso con el mismo esquema del inicio: a la izquierda qué es, cuándo
 * empieza y un solo CTA (baja a los planes); a la derecha el código del tema del curso, o el
 * video del curso si tiene uno. HTML sin hidratar.
 */
const CourseHero = ({ course, nextGroup }: CourseHeroProps) => {
  const date = nextGroup?.startsAt ? startDateParts(nextGroup.startsAt) : undefined;
  const video = course.hero.video;
  const logo = getCourseLogo(course.slug);
  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-12 lg:pt-28 [@media(min-width:1024px)_and_(max-height:760px)]:pb-6 [@media(min-width:1024px)_and_(max-height:760px)]:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(53,116,240,0.16),transparent_70%)]"
      />
      <div className={`${HOME_CONTAINER} relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14`}>
        <div className="min-w-0">
          {/* Logo de la tecnología junto a la etiqueta, para reconocer el curso de un vistazo. */}
          <p {...rise(0)} className={`${HOME_EYEBROW} flex items-center gap-3`}>
            {logo && (
              <span className="flex w-9 shrink-0 justify-start">
                <img src={logo} alt="" aria-hidden width={128} height={128} className="h-7 w-auto max-w-9 object-contain object-left" />
              </span>
            )}
            {`// curso en vivo por Zoom · ${formatDurationHours(course.durationInHours)}`}
          </p>
          <h1
            {...rise(60)}
            className="mt-5 text-[clamp(38px,10vw,54px)] font-bold leading-[1.06] tracking-[-0.03em] [text-wrap:balance] lg:text-[clamp(40px,min(4.2vw,7.4vh),60px)]"
          >
            {course.title}{" "}
            <span className="mt-[0.2em] block text-[0.6em] leading-[1.15] text-[#ffc66d]">
              {course.subtitle ?? "en vivo"}
            </span>
          </h1>
          {course.description && (
            <p {...rise(120)} className={`mt-6 max-w-[560px] text-[17px] leading-[1.6] ${HOME_MUTED}`}>
              {course.description}
            </p>
          )}

          <div {...rise(180)} className="mt-8 flex flex-col items-start gap-4">
            <a
              href="#grupos"
              className="group inline-flex min-h-[40px] items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-[13.5px] text-[#c9cdd3] transition-colors hover:border-white/25 hover:text-white"
            >
              {date ? (
                <>
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#3ccf7a] opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ccf7a]" />
                  </span>
                  <span>
                    Próximo inicio:{" "}
                    <strong className="font-semibold text-[#ffc66d]">
                      {date.weekday} {date.day} {date.month}
                    </strong>
                    <span className="text-[#8b919b]"> · {nextGroup!.schedule}</span>
                  </span>
                </>
              ) : (
                <span>Fecha del próximo grupo por anunciar</span>
              )}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#precio" className={`${WS_CTA} ${WS_CTA_GLOW} gap-2 rounded-xl px-6 text-[15.5px]`}>
                Aparta tu lugar
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#temario"
                className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-[#d5d8dd] underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Ver temario
              </a>
            </div>
          </div>
        </div>

        <div {...rise(150)} className="relative min-w-0">
          {video ? (
            <div className="overflow-hidden rounded-xl border border-[#393B40] bg-[#1E1F22] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
              <video
                className="aspect-video w-full bg-black"
                controls
                muted
                playsInline
                poster={video.poster}
                preload="none"
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
          ) : (
            <>
              <p className="mb-3 font-['JetBrains_Mono_Variable',ui-monospace,monospace] text-[12px] text-[#7d838d]">
                Lo que escribes en clase ↓
              </p>
              <HomeCodeEditor snippet={getCourseSnippet(course.slug)} />
              <div className="home-pop mx-auto mt-6 w-[88%] lg:absolute lg:-right-6 lg:top-2 lg:mt-0 lg:w-[44%]">
                <ZoomFrame photo={CLASS_PHOTOS[0]} live eager />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
