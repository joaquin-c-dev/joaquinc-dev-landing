import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, ArrowRight, Monitor, Wifi, Info } from "lucide-react";
import { Link } from "@/lib/router";

const PrerequisitosIntermedio = () => {
  const prerequisites = [
    "Java Basics",
    "POO (Programación Orientada a Objetos)",
    "Nociones de Spring y Spring Boot",
    "Desarrollo de API REST"
  ];

  const equipmentRequirements = [
    "8 GB de RAM (mínimo)",
    "2.5 GB de espacio en disco",
    "Procesador multicore",
    "Resolución mínima 1024x768"
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-tech-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-tech-cyan/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Antes de{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Comenzar
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Para aprovechar al máximo este curso, te recomendamos cumplir con los siguientes requisitos
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Equipment Card */}
          <Card className="p-6 bg-gradient-card border-primary/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Monitor className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Equipo Recomendado</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Requisitos mínimos para IntelliJ IDEA:
            </p>
            
            <div className="space-y-2 mb-4">
              {equipmentRequirements.map((req, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-background/50 border border-border/50"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{req}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-tech-cyan/10 border border-tech-cyan/20 mb-4">
              <Wifi className="w-4 h-4 text-tech-cyan flex-shrink-0" />
              <span className="text-sm text-foreground">Conexión a internet por cable (recomendado)</span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/30">
              <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Puedes tomar el curso sin cumplir estos requisitos, pero te recomendamos tenerlos para aprovecharlo al 100%.
              </p>
            </div>
          </Card>

          {/* Prerequisites Card */}
          <Card className="p-6 bg-gradient-card border-primary/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Conocimientos Previos</h3>
            </div>
            
            <div className="space-y-2 mb-4">
              {prerequisites.map((prereq, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-background/50 border border-border/50"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{prereq}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground italic mb-4">
              No es necesario ser experto, solo tener nociones básicas.
            </p>
            
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">
                ¿Aún no tienes estos conocimientos?
              </p>
              <Link to="/java-desde-cero">
                <Button variant="outline" size="sm" className="group w-full">
                  Comienza con Java desde Cero
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrerequisitosIntermedio;
