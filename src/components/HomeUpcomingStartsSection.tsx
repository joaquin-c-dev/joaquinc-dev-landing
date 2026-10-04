import { ArrowRight, CalendarDays, Clock, Radio } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { formatDurationHours } from "@/lib/course-formatters";
import { formatHourRange, formatPrice, formatWorkshopDay } from "@/lib/workshop-format";

interface HomeUpcomingStartsSectionProps {
  /** Cursos y talleres con un grupo futuro, ya ordenados por fecha de inicio. */
  courses: Course[];
}

/** El precio con descuento si es menor, igual que en las páginas de cada curso. */
const currentPrice = (course: Course) =>
  course.discountPrice != null &&
  course.regularPrice != null &&
  course.discountPrice < course.regularPrice
    ? course.discountPrice
    : course.regularPrice;

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * "Próximos inicios": la fecha del siguiente grupo de cada curso o taller, ordenados del
 * más cercano al más lejano. Se arma solo con los agendados de la API; si no hay ningún
 * grupo futuro, la sección no aparece. Cada tarjeta es un link real (`<a href>`).
 */
const HomeUpcomingStartsSection = ({ courses }: HomeUpcomingStartsSectionProps) => {
  if (!courses.length) return null;

  return (
    <section data-section="upcoming" className="relative py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="mb-10 text-center md:mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Calendario</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
            <span className="text-foreground">Próximos </span>
            <span className="bg-gradient-accent bg-clip-text text-transparent">inicios</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Los siguientes grupos en vivo. Aparta tu lugar en el que mejor te quede.
          </p>
        </div>

        {/* Flex en vez de grid para que la última fila incompleta quede centrada. */}
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
          {courses.map((course) => {
            const next = course.schedules?.items[0];
            const price = currentPrice(course);
            const isWorkshop = course.type === "WORKSHOP";
            return (
              <a
                key={course.slug}
                href={`/${course.slug}`}
                className="group flex w-full flex-col gap-5 rounded-2xl border border-primary/30 bg-gradient-card p-6 shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-primary/20 md:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Radio className="h-3.5 w-3.5" />
                  {isWorkshop ? "Taller en vivo" : "Curso en vivo"}
                </span>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold text-foreground">{course.title}</h3>
                  {course.subtitle && (
                    <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                  )}
                </div>

                {next?.startsAt && (
                  <ul className="flex flex-col gap-2 text-sm text-foreground">
                    <li className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                      {isWorkshop
                        ? capitalize(formatWorkshopDay(next.startsAt))
                        : `Inicia el ${formatWorkshopDay(next.startsAt)}`}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-primary" />
                      {/* Un taller es un solo día: su horario, no el de los cursos ("Sábados…"). */}
                      {isWorkshop && next.endsAt
                        ? `${formatHourRange(next.startsAt, next.endsAt)} CDMX · ${formatDurationHours(course.durationInHours)}`
                        : `${next.schedule} · ${next.hours}`}
                    </li>
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-5">
                  {price != null && (
                    <span className="text-2xl font-bold text-foreground">
                      {formatPrice(price)}
                      <span className="ml-1.5 text-sm font-normal text-muted-foreground">MXN</span>
                    </span>
                  )}
                  <span className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                    Ver detalles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeUpcomingStartsSection;
