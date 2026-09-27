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

/** Separa la descripción de la API en párrafos (vienen separados por línea en blanco). */
const toParagraphs = (text: string) =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const WorkshopHero = forwardRef<HTMLDivElement, WorkshopHeroProps>(
  ({ course, price, regularPrice, startsAt, endsAt, onCheckout, transferUrl }, cardRef) => (
    <section
      data-section="hero"
      className={`${WS_CONTAINER} grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-14 pb-16 pt-[72px]`}
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-wrap gap-2">
          <span className={`${BADGE} border-[rgba(69,200,255,0.5)] text-[#7dd8ff]`}>
            EN VIVO · ONLINE
          </span>
          {startsAt && endsAt && (
            <span className={`${BADGE} border-white/[0.12] text-[#c3c9d1]`}>
              {formatWorkshopBadgeDate(startsAt, endsAt)}
            </span>
          )}
        </div>

        <h1 className="text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]">
          {course.hero.titleLine1}
          {course.hero.titleHighlight && (
            <span className="text-[#45c8ff]"> {course.hero.titleHighlight}</span>
          )}
          {course.subtitle && (
            <span className="mt-3 block text-[#aab2bc]">{course.subtitle}</span>
          )}
        </h1>

        <div className="flex max-w-[540px] flex-col gap-4 text-lg leading-[1.6] text-[#aab2bc] [text-wrap:pretty]">
          {toParagraphs(course.description).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

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

      <WorkshopBuyCard
        ref={cardRef}
        price={price}
        regularPrice={regularPrice}
        durationInHours={course.durationInHours}
        startsAt={startsAt}
        onCheckout={onCheckout}
        transferUrl={transferUrl}
      />
    </section>
  ),
);

WorkshopHero.displayName = "WorkshopHero";

export default WorkshopHero;
