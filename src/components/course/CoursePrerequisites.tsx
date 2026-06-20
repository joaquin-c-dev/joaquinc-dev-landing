import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Monitor,
  Wifi,
  Info,
} from "lucide-react";
import { Link } from "@/lib/router";
import type { CoursePrerequisites } from "@/lib/course-types";

interface CoursePrerequisitesProps {
  prerequisites: CoursePrerequisites;
}

const PREREQUISITES_INTRO =
  "Para aprovechar al máximo este curso, te recomendamos cumplir con los siguientes requisitos";

const PREREQUISITES_FOOTER_NOTE =
  "Puedes tomar el curso sin cumplir estos requisitos, pero te recomendamos tenerlos para aprovecharlo al 100%.";

const CoursePrerequisites = ({ prerequisites }: CoursePrerequisitesProps) => {
  const courseLink = prerequisites.prerequisiteCourseLink;

  return (
  <section className="py-16 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-glow opacity-20" />
    <div className="relative z-10 container mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Antes de{" "}
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            Comenzar
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {PREREQUISITES_INTRO}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Monitor className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Equipo Recomendado</h3>
          </div>
          <div className="space-y-2 mb-4">
            {prerequisites.equipment.map((req, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-background/50 border border-border/50"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{req}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-tech-cyan/10 border border-tech-cyan/20">
            <Wifi className="w-4 h-4 text-tech-cyan flex-shrink-0" />
            <span className="text-sm text-foreground">
              Conexión a internet estable (recomendado por cable)
            </span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Conocimientos Previos</h3>
          </div>
          <div className="space-y-2 mb-4">
            {prerequisites.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-background/50 border border-border/50"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
          {prerequisites.noExperienceNote && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20 mb-4">
              <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{prerequisites.noExperienceNote}</p>
            </div>
          )}
          {courseLink && (
            <Link to={`/${courseLink.courseSlug}`}>
              <Button variant="outline" className="w-full mt-2">
                {courseLink.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </Card>
      </div>
      <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mt-8">
        {PREREQUISITES_FOOTER_NOTE}
      </p>
    </div>
  </section>
  );
};

export default CoursePrerequisites;
