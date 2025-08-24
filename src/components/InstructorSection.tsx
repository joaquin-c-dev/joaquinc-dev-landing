import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, GraduationCap, Code, Users, Award, MapPin } from "lucide-react";

const InstructorSection = () => {
  const experiences = [
    {
      company: "Avena Health",
      role: "Head of Backend Development",
      period: "Mayo 2024 - Actual",
      location: "Guadalajara, México",
      type: "current",
      highlights: [
        "Gestión de todos los proyectos backend de la empresa",
        "Arquitectura y consultoría técnica",
        "Optimización de costos de servidor y bases de datos",
        "Mentoring y crecimiento del equipo"
      ]
    },
    {
      company: "Tec Gurus",
      role: "Course Instructor",
      period: "Feb 2017 - Actual (8+ años)",
      location: "Guadalajara, México",
      type: "teaching",
      highlights: [
        "Más de 8 años formando desarrolladores Java",
        "Especialización en Spring Boot, Spring Security",
        "Experiencia con tecnologías cloud y microservicios"
      ]
    },
    {
      company: "Globant (CapitalOne)",
      role: "Java Developer",
      period: "Ago 2023 - Mayo 2024",
      location: "Nueva York, USA",
      type: "enterprise",
      highlights: [
        "Reducción de vulnerabilidades en 60% de microservicios financieros",
        "Migración Java 8 → Java 17 y Spring Boot 2 → 3",
        "Liderazgo técnico en sistemas críticos financieros"
      ]
    },
    {
      company: "Globant (GoDaddy)",
      role: "DevOps Engineer",
      period: "Abr 2022 - Ago 2023",
      location: "Silicon Valley, USA",
      type: "enterprise",
      highlights: [
        "Modernización de plataformas legacy a cloud",
        "Optimización de servicios Go, Java y PHP",
        "Implementación de seguridad a gran escala"
      ]
    }
  ];

  const skills = [
    "Java 21", "Spring Boot", "Spring Security", "Spring Cloud",
    "MongoDB", "MySQL", "GCP", "AWS", "Docker", "Microservicios",
    "API REST", "Maven", "Git", "React.js", "Go"
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
                Tu Instructor
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Aprende con un{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Experto Real
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Más de 9 años desarrollando backend en empresas Fortune 500 y 8+ años 
              formando a la próxima generación de desarrolladores Java.
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-all">
              <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">Head of Backend</div>
              <div className="text-sm text-muted-foreground">Avena Health</div>
            </Card>
            <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-all">
              <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">8+ Años</div>
              <div className="text-sm text-muted-foreground">Enseñando Java</div>
            </Card>
            <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-all">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">Fortune 500</div>
              <div className="text-sm text-muted-foreground">CapitalOne, GoDaddy</div>
            </Card>
            <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-all">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">9+ Años</div>
              <div className="text-sm text-muted-foreground">Experiencia Total</div>
            </Card>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Experiencia Profesional</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-6 border-primary/10 hover:border-primary/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{exp.role}</h4>
                        {exp.type === 'current' && (
                          <Badge variant="default" className="bg-primary text-primary-foreground">Actual</Badge>
                        )}
                        {exp.type === 'teaching' && (
                          <Badge variant="secondary">Instructor</Badge>
                        )}
                        {exp.type === 'enterprise' && (
                          <Badge variant="outline">Fortune 500</Badge>
                        )}
                      </div>
                      <div className="text-primary font-medium mb-1">{exp.company}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{exp.period}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Code className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Tecnologías Dominadas</h3>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-4 py-2 text-sm border-primary/30 hover:border-primary/50 hover:text-primary transition-all"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;