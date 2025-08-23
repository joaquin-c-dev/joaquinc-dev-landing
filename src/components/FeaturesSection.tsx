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
    title: "Desde Cero",
    description: "No necesitas experiencia previa. Comenzamos desde los conceptos más básicos."
  },
  {
    icon: Code2,
    title: "Proyectos Reales",
    description: "Construye aplicaciones completas que puedes añadir a tu portafolio."
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete a una comunidad de desarrolladores que te apoyará en tu aprendizaje."
  },
  {
    icon: Trophy,
    title: "Certificación",
    description: "Obtén un certificado reconocido al completar el curso exitosamente."
  },
  {
    icon: Lightbulb,
    title: "Metodología Práctica",
    description: "Aprende haciendo. Cada concepto se refuerza con ejercicios prácticos."
  },
  {
    icon: Rocket,
    title: "Actualizado 2024",
    description: "Contenido actualizado con las últimas versiones y mejores prácticas."
  },
  {
    icon: Clock,
    title: "A tu Ritmo",
    description: "Acceso de por vida. Estudia cuando quieras y a la velocidad que prefieras."
  },
  {
    icon: Award,
    title: "Instructor Experto",
    description: "Aprende de un desarrollador con más de 10 años de experiencia en Java."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-java-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Por qué elegir nuestro{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              curso?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Diseñado para llevarte de principiante a developer Java competente 
            con una metodología probada y herramientas modernas.
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