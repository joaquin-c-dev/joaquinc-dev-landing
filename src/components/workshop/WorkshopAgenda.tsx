import { sortCurriculumSections } from "@/lib/course-mapper";
import { COURSE_CURRICULUM_SECTION_ID, type Course } from "@/lib/course-types";
import { formatAgendaHour, formatWeekday, getCdmxHour } from "@/lib/workshop-format";
import { WS_CONTAINER, WS_EYEBROW, WS_FONT_MONO, WS_H2 } from "./workshop-styles";

interface WorkshopAgendaProps {
  sections: NonNullable<Course["sections"]>;
  startsAt?: string;
}

const plural = (n: number, singular: string, pluralForm: string) =>
  `${n} ${n === 1 ? singular : pluralForm}`;

/**
 * Temario como agenda del día. La hora de cada módulo = hora de inicio del agendado
 * + suma de `hoursPerSection` de los módulos anteriores.
 */
const WorkshopAgenda = ({ sections, startsAt }: WorkshopAgendaProps) => {
  const sorted = sortCurriculumSections(sections);
  const totalHours = sorted.reduce((sum, s) => sum + s.hoursPerSection, 0);
  const startHour = startsAt ? getCdmxHour(startsAt) : undefined;

  let hoursBefore = 0;
  const rows = sorted.map((section, index) => {
    const hour =
      startHour != null ? formatAgendaHour(startHour, hoursBefore) : undefined;
    hoursBefore += section.hoursPerSection;
    return { section, hour, number: String(index + 1).padStart(2, "0") };
  });

  const eyebrow = `TEMARIO · ${plural(sorted.length, "MÓDULO", "MÓDULOS")} · ${plural(totalHours, "HORA", "HORAS")}`;

  return (
    <section
      id={COURSE_CURRICULUM_SECTION_ID}
      data-section={COURSE_CURRICULUM_SECTION_ID}
      className={`${WS_CONTAINER} py-[88px]`}
    >
      <div className="mb-10 flex max-w-[640px] flex-col gap-3.5">
        <span className={WS_EYEBROW}>{eyebrow}</span>
        <h2 className={WS_H2}>
          {startsAt ? `Así va el ${formatWeekday(startsAt)}` : "Así va el taller"}
        </h2>
        {startHour != null && (
          <p className="text-[#9aa3ae]">Horario aproximado, hora del centro de México.</p>
        )}
      </div>

      <div className="border-t border-white/[0.08]">
        {rows.map(({ section, hour, number }) => (
          <div
            key={`${section.order}-${section.title}`}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-3 border-b border-white/[0.08] py-7"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`${WS_FONT_MONO} text-[13px] text-[#ffc66d]`}>
                {hour ? `${hour} — ${number}` : number}
              </span>
              <span className="text-xl font-semibold tracking-[-0.01em]">
                {section.title}
              </span>
            </div>
            <ul className="flex flex-col gap-2 text-[15px] leading-[1.5] text-[#aab2bc]">
              {section.specificTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkshopAgenda;
