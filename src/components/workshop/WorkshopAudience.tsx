import { ArrowRight } from "lucide-react";
import type { CoursePrerequisites } from "@/lib/course-types";
import { WS_CARD, WS_CONTAINER, WS_LINK } from "./workshop-styles";

interface WorkshopAudienceProps {
  audience?: string[];
  prerequisites?: CoursePrerequisites;
}

const ArrowList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-2.5 text-[15px] text-[#c3c9d1]">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5">
        <ArrowRight className="mt-[3px] h-4 w-4 shrink-0 text-[#45c8ff]" />
        {item}
      </li>
    ))}
  </ul>
);

/** "Es para ti si…" (contenido del taller) + requisitos (vienen del curso). */
const WorkshopAudience = ({ audience, prerequisites }: WorkshopAudienceProps) => {
  const hasAudience = Boolean(audience?.length);
  const hasPrerequisites = Boolean(prerequisites?.items?.length);
  if (!hasAudience && !hasPrerequisites) return null;

  const courseLink = prerequisites?.prerequisiteCourseLink;

  return (
    <section className={`${WS_CONTAINER} pb-[88px]`}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
        {hasAudience && (
          <div className={`${WS_CARD} flex flex-col gap-4 p-7`}>
            <h3 className="text-[17px] font-semibold">Es para ti si…</h3>
            <ArrowList items={audience!} />
          </div>
        )}
        {hasPrerequisites && (
          <div className={`${WS_CARD} flex flex-col gap-4 p-7`}>
            <h3 className="text-[17px] font-semibold">Lo que necesitas saber antes</h3>
            <ArrowList items={prerequisites!.items} />
            <p className="text-sm text-[#8a929c]">
              {prerequisites!.noExperienceNote ?? "No necesitas ser experto."}
              {courseLink && (
                <>
                  {" "}¿Aún no llegas ahí?{" "}
                  <a href={`/${courseLink.courseSlug}`} className={WS_LINK}>
                    {courseLink.label} →
                  </a>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkshopAudience;
