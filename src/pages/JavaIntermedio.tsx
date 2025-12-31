import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Boxes,
  TestTube,
  Layers,
  Shield,
  Database,
  MessageSquare,
  FileText,
  Container,
  CheckCircle2,
  Clock,
  Code2,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DiscountBanner from "@/components/DiscountBanner";
import Footer from "@/components/Footer";
import { useCountdown } from "@/contexts/CountdownContext";
import { useBanner } from "@/contexts/BannerContext";
import { useIsMobile } from "@/hooks/use-mobile";

const curriculumModules = [
  {
    icon: Boxes,
    title: "Patrones de Diseño y Arquitectura",
    duration: "5 hrs",
    topics: [
      "Principios SOLID aplicados a proyectos reales",
      "Patrones más usados en backend (Strategy, Factory, Template Method, Decorator)",
      "Separación de capas y responsabilidades",
      "Arquitectura por capas vs arquitectura orientada a dominios",
      "Buenas prácticas para código mantenible y escalable"
    ],
    color: "tech-purple"
  },
  {
    icon: TestTube,
    title: "Testing Profesional: JUnit, Mockito y TDD",
    duration: "5 hrs",
    topics: [
      "Fundamentos de testing unitario y buenas prácticas",
      "JUnit 5: estructura, anotaciones y assertions",
      "Uso de Mockito para mocks, stubs y spies",
      "Introducción a TDD (Test Driven Development)",
      "Testing de servicios y lógica de negocio"
    ],
    color: "tech-green"
  },
  {
    icon: Layers,
    title: "Programación Orientada a Aspectos (AOP)",
    duration: "5 hrs",
    topics: [
      "¿Qué es AOP y cuándo usarlo?",
      "Creación de aspectos con Spring AOP",
      "Pointcuts, advice y join points",
      "Manejo de logs, validaciones y métricas con AOP",
      "Casos de uso reales en aplicaciones backend"
    ],
    color: "tech-blue"
  },
  {
    icon: Shield,
    title: "Seguridad: JWT con Spring Security",
    duration: "5 hrs",
    topics: [
      "Fundamentos de autenticación y autorización",
      "Configuración de Spring Security",
      "Implementación de JWT (login, filtros y validación)",
      "Protección de endpoints y roles de usuario",
      "Manejo de errores y seguridad básica en APIs REST"
    ],
    color: "tech-red"
  },
  {
    icon: Database,
    title: "Persistencia de datos con Spring Data JPA (MySQL)",
    duration: "5 hrs",
    topics: [
      "Configuración de JPA con MySQL",
      "Entidades, repositorios y relaciones",
      "Queries con métodos derivados y JPQL",
      "Paginación y ordenamiento",
      "Buenas prácticas de acceso a datos"
    ],
    color: "tech-orange"
  },
  {
    icon: MessageSquare,
    title: "Asincronía: RabbitMQ y Cron Jobs",
    duration: "5 hrs",
    topics: [
      "Conceptos de mensajería y procesamiento asíncrono",
      "Introducción a RabbitMQ y colas",
      "Productores y consumidores con Spring AMQP",
      "Manejo de tareas programadas con Cron Jobs",
      "Casos de uso reales (emails, procesos en background)"
    ],
    color: "tech-cyan"
  },
  {
    icon: FileText,
    title: "Documentación con Swagger / OpenAPI",
    duration: "5 hrs",
    topics: [
      "Importancia de documentar APIs",
      "Configuración de Swagger en Spring Boot",
      "Uso de anotaciones OpenAPI",
      "Documentación de endpoints, parámetros y respuestas",
      "Buenas prácticas para APIs consumibles"
    ],
    color: "course-blue"
  },
  {
    icon: Container,
    title: "Docker para desarrollo",
    duration: "5 hrs",
    topics: [
      "¿Qué es Docker y por qué usarlo?",
      "Creación de Dockerfiles para aplicaciones Java",
      "Uso de imágenes y contenedores",
      "Docker Compose para entornos locales",
      "Flujo de desarrollo con Docker"
    ],
    color: "tech-purple"
  }
];

const JavaIntermedio = () => {
  const { isBannerVisible } = useBanner();
  const { timeLeft } = useCountdown();
  const isMobile = useIsMobile();
  
  // Calculate if banner should actually be shown (visible and not expired)
  const shouldShowBanner = isBannerVisible && !timeLeft.isExpired;
  
  const totalHours = curriculumModules.reduce((total, module) => {
    return total + parseInt(module.duration.split(' ')[0]);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Navigation />
      
      <main className={`${shouldShowBanner ? 'pt-[104px]' : 'pt-16'}`}>
        <section className="py-16 bg-course-dark relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-purple/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-course-blue/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-glow opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-course-blue/5 to-transparent"></div>
          
          <div className="relative z-10 container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Java{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Intermedio
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Curso intermedio de 40 horas para llevar tus conocimientos de Java y Spring al siguiente nivel, creando aplicaciones backend robustas, seguras y listas para producción. 🚀
              </p>
              
              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Duración</h3>
                    <p className="text-sm text-muted-foreground">40 horas</p>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <Boxes className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Módulos</h3>
                    <p className="text-sm text-muted-foreground">{curriculumModules.length} módulos</p>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <Code2 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Modalidad</h3>
                    <p className="text-sm text-muted-foreground">100% Práctico</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {curriculumModules.map((module, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg shadow-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <module.icon className="w-6 h-6 text-primary-foreground" />
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
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional Info */}
            <div className="mt-16 text-center">
              <Card className="p-8 bg-gradient-card border-primary/20 max-w-3xl mx-auto">
                <div className="mb-6">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Metodología{" "}
                    <span className="bg-gradient-accent bg-clip-text text-transparent">
                      Práctica
                    </span>
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">📋 Teoría Aplicada</h4>
                    <p className="text-sm text-muted-foreground">
                      Cada concepto se explica con ejemplos reales de mi experiencia en producción.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">🛠️ Práctica Inmediata</h4>
                    <p className="text-sm text-muted-foreground">
                      Construimos aplicaciones completas aplicando lo aprendido al instante.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">🚀 Proyectos Reales</h4>
                    <p className="text-sm text-muted-foreground">
                      Desarrollamos sistemas que realmente se usan en empresas Fortune 500.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <Button 
                  size="lg"
                  className="relative bg-gradient-accent text-white text-base px-8 py-4 transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30"
                  onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Inscribirme al Curso
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JavaIntermedio;