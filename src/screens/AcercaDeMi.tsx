import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, Code, Users, Award, MapPin, Linkedin, ExternalLink } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AppShell from "@/components/app/AppShell";
import type { NavCourse } from "@/contexts/CoursesNavContext";

const AcercaDeMiContent = () => {
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
      company: "Formación Profesional",
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16 pb-16">
        <section className="relative py-20 bg-gradient-subtle overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-course-blue/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-tech-cyan/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 container mx-auto px-8 md:px-12 lg:px-16">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="flex items-center gap-2 mb-6 justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
                    Tu Instructor
                  </span>
                </div>
                
                {/* Instructor Name & LinkedIn */}
                <div className="mb-8">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <img 
                        src={ASSETS.joaquinProfile}
                        alt="Joaquín Coronado Ramírez - Java Instructor"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-elegant"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="bg-gradient-accent bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                      Joaquín Coronado Ramírez
                    </span>
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <p className="text-xl text-muted-foreground">
                      Head of Backend Development • Course Instructor
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary/30 hover:border-primary/50 text-primary hover:text-primary"
                      onClick={() => window.open('https://www.linkedin.com/in/joaquincr/', '_blank')}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Aprende con un{" "}
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
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
              <div className="text-center mb-12">
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

              {/* LinkedIn CTA */}
              <div className="text-center">
                <Card className="p-8 bg-gradient-subtle border-primary/20 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Linkedin className="w-8 h-8 text-[#0077B5]" />
                    <h3 className="text-2xl font-bold">Conecta Conmigo</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Sígueme en LinkedIn para ver más sobre mi experiencia profesional, 
                    proyectos actuales y contenido exclusivo sobre desarrollo backend.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-[#0077B5] hover:bg-[#005885] text-white"
                    onClick={() => window.open('https://www.linkedin.com/in/joaquincr/', '_blank')}
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    Ver Perfil de LinkedIn
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface AcercaDeMiProps {
  navCourses?: NavCourse[];
}

const AcercaDeMi = ({ navCourses = [] }: AcercaDeMiProps) => (
  <AppShell navCourses={navCourses}>
    <AcercaDeMiContent />
  </AppShell>
);

export default AcercaDeMi;