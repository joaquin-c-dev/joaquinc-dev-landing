import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PrerequisitosIntermedio = () => {
  const prerequisites = [
    "Java Basics",
    "Programación Orientada a Objetos (POO)",
    "Nociones de Spring y Spring Boot",
    "Desarrollo de API REST"
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-tech-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-tech-cyan/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prerrequisitos del{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Curso
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Para aprovechar al máximo este curso, te recomendamos tener conocimientos previos en:
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-card border-primary/20">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {prerequisites.map((prereq, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{prereq}</span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground italic">
                No es necesario ser experto en estos temas, solo tener nociones básicas.
              </p>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  ¿Aún no tienes estos conocimientos?
                </p>
                <Link to="/java-desde-cero">
                  <Button variant="outline" className="group">
                    Comienza con Java desde Cero
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrerequisitosIntermedio;
