import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Code2, 
  Users, 
  Trophy, 
  Lightbulb, 
  Rocket,
  Clock,
  Award
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Metodología Probada",
    description: "Sistema de enseñanza desarrollado a partir de años formando developers exitosos."
  },
  {
    icon: Code2,
    title: "Proyectos del Mundo Real",
    description: "Construye aplicaciones que realmente se usan en la industria tecnológica."
  },
  {
    icon: Users,
    title: "Mentoría Personal",
    description: "Acceso directo conmigo para resolver dudas y guiar tu progreso profesional."
  },
  {
    icon: Trophy,
    title: "Certificado Respaldado",
    description: "Certificación que avala tu conocimiento basada en mi experiencia profesional."
  },
  {
    icon: Lightbulb,
    title: "Enfoque Práctico",
    description: "Cada concepto se enseña con ejemplos reales de mi experiencia en la industria."
  },
  {
    icon: Rocket,
    title: "Tecnologías Actuales",
    description: "Te enseño las herramientas y frameworks que uso actualmente en producción."
  },
  {
    icon: Clock,
    title: "Flexibilidad Total",
    description: "Estudia a tu ritmo con acceso permanente al contenido y actualizaciones."
  },
  {
    icon: Award,
    title: "Experiencia Comprobada",
    description: "Más de 9 años desarrollando sistemas backend escalables con Java."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-course-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Por qué aprender{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              conmigo?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mi experiencia de 9+ años en desarrollo backend me permite enseñarte 
            no solo la teoría, sino cómo se aplica Java en proyectos reales de la industria.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg shadow-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;