import { forwardRef } from "react";
import type { Course } from "@/lib/course-types";
import { INSTRUCTOR_PROFILE } from "@/lib/workshop-content";
import { formatWorkshopBadgeDate } from "@/lib/workshop-format";
import WorkshopBuyCard from "./WorkshopBuyCard";
import { WS_CONTAINER, WS_FONT_MONO } from "./workshop-styles";

interface WorkshopHeroProps {
  course: Course;
  price: number;
  regularPrice?: number;
  startsAt?: string;
  endsAt?: string;
  onCheckout?: () => void;
  transferUrl?: string;
}

const BADGE = `${WS_FONT_MONO} whitespace-nowrap rounded-md border px-2.5 py-1.5 text-[12.5px]`;

const HERO_TEXT = "text-base leading-[1.6] text-[#aab2bc] [text-wrap:pretty] md:text-lg";

/** Separa la descripción de la API en párrafos (vienen separados por línea en blanco). */
const toParagraphs = (text: string) =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

/**
 * En celular el orden es: título → tarjeta de compra → resto del texto, para que el
 * precio y el botón se vean sin bajar (casi todo el tráfico de Meta llega en celular).
 * En escritorio el texto va completo a la izquierda y la tarjeta a la derecha.
 */
const WorkshopHero = forwardRef<HTMLDivElement, WorkshopHeroProps>(
  ({ course, price, regularPrice, startsAt, endsAt, onCheckout, transferUrl }, cardRef) => {
    const [leadParagraph, ...restParagraphs] = toParagraphs(course.description);

    return (
      <section
        data-section="hero"
        className={`${WS_CONTAINER} grid items-center gap-x-14 gap-y-6 pb-12 pt-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:pb-16 lg:pt-[72px]`}
      >
        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1 lg:gap-7 lg:self-end">
          <div className="flex flex-wrap gap-2">
            <span className={`${BADGE} border-[rgba(255,198,109,0.5)] text-[#ffc66d]`}>
              EN VIVO · ONLINE
            </span>
            {startsAt && endsAt && (
              <span className={`${BADGE} border-white/[0.12] text-[#c3c9d1]`}>
                {formatWorkshopBadgeDate(startsAt, endsAt)}
              </span>
            )}
          </div>

          <h1 className="text-[clamp(30px,5.2vw,60px)] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]">
            {course.hero.titleLine1}
            {course.hero.titleHighlight && (
              <span className="text-[#ffc66d]"> {course.hero.titleHighlight}</span>
            )}
            {course.subtitle && " "}
            {course.subtitle && (
              <span className="mt-2 block text-[0.8em] text-[#aab2bc] lg:mt-3 lg:text-[1em]">{course.subtitle}</span>
            )}
          </h1>

          {/* En celular el párrafo va después de la tarjeta (ver abajo). */}
          {leadParagraph && (
            <p className={`${HERO_TEXT} hidden max-w-[540px] lg:block`}>{leadParagraph}</p>
          )}
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <WorkshopBuyCard
            ref={cardRef}
            price={price}
            regularPrice={regularPrice}
            durationInHours={course.durationInHours}
            startsAt={startsAt}
            onCheckout={onCheckout}
            transferUrl={transferUrl}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2 lg:gap-7 lg:self-start">
          {(leadParagraph || restParagraphs.length > 0) && (
            <div className={`${HERO_TEXT} flex max-w-[540px] flex-col gap-4`}>
              {leadParagraph && <p className="lg:hidden">{leadParagraph}</p>}
              {restParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <img
              src={INSTRUCTOR_PROFILE.photo}
              alt={INSTRUCTOR_PROFILE.name}
              className="h-11 w-11 rounded-full border border-white/[0.09] object-cover"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">{INSTRUCTOR_PROFILE.name}</span>
              <span className="text-[#9aa3ae]">{INSTRUCTOR_PROFILE.tagline}</span>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

WorkshopHero.displayName = "WorkshopHero";

export default WorkshopHero;
