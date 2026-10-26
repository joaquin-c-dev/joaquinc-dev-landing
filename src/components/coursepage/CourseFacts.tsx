import { HOME_CONTAINER, HOME_MUTED, reveal } from "@/components/home/home-theme";

interface CourseFactsProps {
  hours: number;
  modules: number;
  /** "Sábados 9:00 AM - 2:00 PM" del siguiente grupo, si hay. */
  schedule?: string;
  rating: number;
}

/** Barra de datos del curso, con el mismo estilo de la del inicio. */
const CourseFacts = ({ hours, modules, schedule, rating }: CourseFactsProps) => {
  const facts = [
    { value: `${hours} h`, label: "de clases en vivo" },
    { value: modules, label: modules === 1 ? "módulo" : "módulos" },
    { value: schedule?.split(" ")[0] ?? "En vivo", label: schedule ? schedule.split(" ").slice(1).join(" ") : "por Zoom" },
    { value: `${rating.toFixed(1)}★`, label: "promedio de alumnos" },
  ];
  return (
    <section aria-label="Datos del curso" className="border-y border-white/[0.07] bg-[#0e1014]">
      <dl className={`${HOME_CONTAINER} grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12`}>
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            {...reveal(index * 70)}
            className="flex flex-col-reverse gap-1 px-2 md:border-l md:border-white/[0.07] md:px-6 md:first:border-l-0"
          >
            <dt className={`text-[13.5px] ${HOME_MUTED}`}>{fact.label}</dt>
            <dd className="text-[clamp(26px,3.2vw,38px)] font-bold tabular-nums tracking-[-0.03em] text-white">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default CourseFacts;
