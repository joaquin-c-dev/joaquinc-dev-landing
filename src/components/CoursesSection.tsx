import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, Users, Sparkles } from "lucide-react";
import { getCourseIcon } from "@/lib/course-icons";
import { getHomeCourseCard } from "@/lib/course-listings";
import { formatDurationHours } from "@/lib/course-formatters";
import type { Course } from "@/lib/course-types";

interface CoursesSectionProps {
  courses: Course[];
}

const CoursesSection = ({ courses }: CoursesSectionProps) => {
  return (
    <section
      id="cursos"
      data-section="courses"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-10" />

      <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Ruta de aprendizaje
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Nuestros </span>
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Cursos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el curso o taller que mejor se adapte a tu nivel y
            objetivos profesionales
          </p>
        </div>

        {/* Flex en vez de grid para que la última fila incompleta quede centrada. */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {courses.map((course) => {
            const listing = getHomeCourseCard(course);
            const IconComponent = getCourseIcon(listing.icon);
            const path = `/${course.slug}`;

            return (
              // Link real (<a href>) para que buscadores y asistentes de IA lleguen al curso.
              <a
                key={course.slug}
                href={path}
                className="block w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
              >
                <Card
                  className={`relative p-6 bg-gradient-card ${listing.borderColor} shadow-glow hover:shadow-glow-lg transition-all duration-500 h-full flex flex-col group cursor-pointer hover:scale-[1.02] ${listing.featured ? "ring-2 ring-primary/50" : ""}`}
                >
                  {listing.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        MÁS POPULAR
                      </div>
                    </div>
                  )}

                  <div className="flex-grow">
                    <div
                      className={`w-14 h-14 ${listing.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-7 h-7 text-foreground" />
                    </div>

                    {course.type === "WORKSHOP" && (
                      <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                        Taller de un día
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {course.title}
                    </h3>
                    {course.subtitle && (
                      <p className="text-sm text-primary mb-3">
                        {course.subtitle}
                      </p>
                    )}

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {course.description || course.seo.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {listing.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {course.durationInHours > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDurationHours(course.durationInHours)}
                        </div>
                      )}
                      {course.level && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.level}
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    className={buttonVariants({
                      className: `w-full bg-gradient-to-r ${listing.color} text-white hover:opacity-90 transition-opacity`,
                    })}
                  >
                    Ver curso
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
