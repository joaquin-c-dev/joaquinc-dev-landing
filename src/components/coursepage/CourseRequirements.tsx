import { ArrowRight, BookOpen, Laptop, Wifi } from "lucide-react";
import type { CoursePrerequisites } from "@/lib/course-types";
import { INTERNET_REQUIREMENT } from "@/lib/workshop-content";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "@/components/home/home-theme";

interface CourseRequirementsProps {
  prerequisites: CoursePrerequisites;
}

/** "Antes de comenzar": conocimientos y equipo en dos columnas, con el curso previo si aplica. */
const CourseRequirements = ({ prerequisites }: CourseRequirementsProps) => {
  const { items, equipment, prerequisiteCourseLink, noExperienceNote } = prerequisites;
  const columns = [
    { icon: BookOpen, title: "Conocimientos previos", list: items },
    { icon: Laptop, title: "Equipo recomendado", list: equipment },
  ].filter((column) => column.list.length > 0);
  return (
    <section className="py-24 md:py-28">
      <div className={HOME_CONTAINER}>
        <p {...reveal(0)} className={HOME_EYEBROW}>
          {"// antes de comenzar"}
        </p>
        <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
          Lo que necesitas
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {columns.map(({ icon: Icon, title, list }, index) => (
            <div key={title} {...reveal(index * 80)} className="rounded-[16px] border border-white/[0.08] bg-[#12151a] p-6">
              <h3 className="flex items-center gap-2.5 text-[18px] font-semibold text-white">
                <Icon className="h-5 w-5 text-[#ffc66d]" aria-hidden />
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-[#d5d8dd]">
                {list.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="text-[#6AAB73]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
                {title === "Equipo recomendado" && (
                  <li className="flex gap-2.5">
                    <Wifi className="mt-0.5 h-4 w-4 shrink-0 text-[#6AAB73]" aria-hidden />
                    {INTERNET_REQUIREMENT}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {(prerequisiteCourseLink || noExperienceNote) && (
          <div {...reveal(160)} className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] ${HOME_MUTED}`}>
            {noExperienceNote && <span>{noExperienceNote}</span>}
            {prerequisiteCourseLink && (
              <a
                href={`/${prerequisiteCourseLink.courseSlug}`}
                className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-[#ffc66d] transition-colors hover:text-[#ffd899]"
              >
                {prerequisiteCourseLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseRequirements;
