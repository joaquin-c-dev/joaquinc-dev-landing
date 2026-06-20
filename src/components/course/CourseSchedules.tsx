import { Card } from "@/components/ui/card";
import { Calendar, Clock, BookOpen } from "lucide-react";
import type { Course } from "@/lib/course-types";

interface CourseSchedulesProps {
  schedules: NonNullable<Course["schedules"]>;
}

const CourseSchedules = ({ schedules }: CourseSchedulesProps) => (
  <section
    className={`py-16 bg-background relative ${
      schedules.fullHeight ? "min-h-screen flex items-center bg-gradient-hero overflow-hidden" : ""
    }`}
  >
    {schedules.fullHeight && (
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
    )}
    <div className="relative z-10 container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Próximos Inicios
          </span>
        </h2>
        {schedules.subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {schedules.subtitle}
          </p>
        )}
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">
        {schedules.items.map((item) => (
          <Card
            key={item.id}
            className="p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.modality}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">{item.schedule}</div>
                  <div className="text-sm text-muted-foreground">{item.hours}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">{item.dateRange}</div>
                  <div className="text-sm text-muted-foreground">{item.duration}</div>
                  {item.note && (
                    <div className="text-sm text-[hsl(var(--urgency-red))] mt-1">
                      {item.note}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Clases en vivo</div>
                  <div className="text-sm text-muted-foreground">
                    Con grabaciones incluidas
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default CourseSchedules;
