import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, Users, Code, Rocket, Sparkles, BookOpen } from "lucide-react";
import { useNavigate } from "@/lib/router";

const CoursesSection = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: "introduccion",
      title: "Introducción a la Programación",
      subtitle: "Para principiantes absolutos",
      description: "Aprende los fundamentos de la programación desde cero. Ideal si nunca has escrito una línea de código.",
      duration: "30 horas",
      level: "Principiante",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      path: "/introduccion-programacion",
      features: ["Lógica de programación", "Primeros pasos en código", "Ejercicios prácticos"]
    },
    {
      id: "java-desde-cero",
      title: "Java desde Cero",
      subtitle: "Fundamentos hasta profesional",
      description: "Domina Java desde los fundamentos hasta nivel profesional. POO, colecciones, manejo de errores y más.",
      duration: "40 horas",
      level: "Principiante a Intermedio",
      icon: Code,
      color: "from-primary to-tech-cyan",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      path: "/java-desde-cero",
      featured: true,
      features: ["POO completo", "Colecciones y Streams", "MongoDB"]
    },
    {
      id: "java-intermedio",
      title: "Java Intermedio",
      subtitle: "Spring Boot Profesional",
      description: "Lleva tus habilidades al siguiente nivel con Spring Boot, APIs REST, seguridad y arquitectura empresarial.",
      duration: "40 horas",
      level: "Intermedio a Avanzado",
      icon: Rocket,
      color: "from-tech-purple to-pink-500",
      bgColor: "bg-tech-purple/10",
      borderColor: "border-tech-purple/20",
      path: "/java-intermedio",
      features: ["Spring Boot", "APIs REST", "Spring Security"]
    }
  ];

  return (
    <section data-section="courses" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ruta de aprendizaje</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Nuestros </span>
            <span className="bg-gradient-accent bg-clip-text text-transparent">Cursos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el curso que mejor se adapte a tu nivel y objetivos profesionales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card 
                key={course.id}
                className={`relative p-6 bg-gradient-card ${course.borderColor} shadow-glow hover:shadow-glow-lg transition-all duration-500 h-full flex flex-col group cursor-pointer hover:scale-[1.02] ${course.featured ? 'ring-2 ring-primary/50' : ''}`}
                onClick={() => navigate(course.path)}
              >
                {course.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      MÁS POPULAR
                    </div>
                  </div>
                )}

                <div className="flex-grow">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${course.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 text-foreground`} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{course.title}</h3>
                  <p className="text-sm text-primary mb-3">{course.subtitle}</p>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.level}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  className={`w-full bg-gradient-to-r ${course.color} text-white hover:opacity-90 transition-opacity`}
                >
                  Ver curso
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
