import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Clock, Code2, Boxes, Zap } from "lucide-react";
import { getCourseIcon } from "@/lib/course-icons";
import type { Course } from "@/lib/course-types";

interface CourseCurriculumProps {
  curriculum: NonNullable<Course["curriculum"]>;
}

const CourseCurriculum = ({ curriculum }: CourseCurriculumProps) => {
  const totalHours = curriculum.modules.reduce(
    (total, m) => total + m.hoursPerSection,
    0,
  );
  const sectionId = curriculum.sectionId ?? "curriculum";

  return (
    <section
      id={sectionId}
      data-section={sectionId}
      className="py-24 bg-course-dark relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-purple/5 rounded-full blur-3xl animate-pulse" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Temario del{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Curso
            </span>
          </h2>
          {curriculum.summary && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {curriculum.summary.replace("{hours}", String(totalHours)) ||
                curriculum.summary}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Clock className="w-4 h-4 mr-2" />
              {totalHours} hrs de contenido
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Boxes className="w-4 h-4 mr-2" />
              {curriculum.modules.length} módulos
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {curriculum.modules.map((module, index) => {
            const Icon = getCourseIcon(module.icon);
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg shadow-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {module.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {curriculum.methodology && curriculum.methodology.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-card border-primary/20 max-w-3xl mx-auto">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Metodología{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Práctica
                </span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {curriculum.methodology.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-semibold mb-2 text-primary">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCurriculum;
