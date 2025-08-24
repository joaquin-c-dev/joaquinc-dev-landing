import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code2, 
  Database, 
  Shield, 
  Cloud, 
  Boxes,
  Settings,
  TestTube,
  Zap,
  Globe,
  CheckCircle2,
  Clock
} from "lucide-react";

const curriculumModules = [
  {
    icon: BookOpen,
    title: "Fundamentos de Java",
    duration: "8 horas",
    topics: [
      "Sintaxis y estructura del lenguaje",
      "Programación orientada a objetos",
      "Collections y Streams",
      "Manejo de excepciones",
      "Generics y anotaciones"
    ],
    color: "tech-blue"
  },
  {
    icon: Code2,
    title: "Spring Framework Esencial",
    duration: "12 horas",
    topics: [
      "Inversión de control e inyección de dependencias",
      "Spring Boot configuración y estructura",
      "Profiles y configuraciones externas",
      "Spring Data JPA",
      "Validaciones con Bean Validation"
    ],
    color: "tech-green"
  },
  {
    icon: Globe,
    title: "API REST con Spring Boot",
    duration: "10 horas",
    topics: [
      "Construcción de APIs RESTful",
      "Controllers y Request Mapping",
      "Serialización y deserialización JSON",
      "Manejo de errores y excepciones",
      "Documentación con OpenAPI/Swagger"
    ],
    color: "tech-purple"
  },
  {
    icon: Database,
    title: "Persistencia de Datos",
    duration: "8 horas",
    topics: [
      "JPA y Hibernate avanzado",
      "Diseño de base de datos relacional",
      "Consultas JPQL y Criteria API",
      "Transacciones y optimización",
      "Migraciones con Flyway/Liquibase"
    ],
    color: "tech-orange"
  },
  {
    icon: Shield,
    title: "Seguridad con Spring Security",
    duration: "8 horas",
    topics: [
      "Autenticación y autorización",
      "JWT y OAuth2 implementación",
      "Seguridad de endpoints",
      "CORS y configuraciones de seguridad",
      "Mejores prácticas de seguridad"
    ],
    color: "tech-red"
  },
  {
    icon: TestTube,
    title: "Testing Profesional",
    duration: "6 horas",
    topics: [
      "Unit testing con JUnit 5",
      "Integration testing con TestContainers",
      "Mocking con Mockito",
      "Testing de APIs REST",
      "Code coverage y calidad de código"
    ],
    color: "tech-cyan"
  },
  {
    icon: Cloud,
    title: "Microservicios y Cloud",
    duration: "10 horas",
    topics: [
      "Arquitectura de microservicios",
      "Service Discovery con Eureka",
      "API Gateway con Spring Cloud Gateway",
      "Circuit Breaker y resilience patterns",
      "Deployment en AWS/GCP"
    ],
    color: "course-blue"
  },
  {
    icon: Boxes,
    title: "DevOps y Containerización",
    duration: "6 horas",
    topics: [
      "Docker y containerización",
      "Docker Compose para desarrollo",
      "CI/CD con GitHub Actions",
      "Monitoring y logging",
      "Performance optimization"
    ],
    color: "tech-yellow"
  }
];

const CurriculumSection = () => {
  const totalHours = curriculumModules.reduce((total, module) => {
    return total + parseInt(module.duration.split(' ')[0]);
  }, 0);

  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-course-blue/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
              Temario del Curso
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Curriculum{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Completo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Un programa estructurado de {totalHours} horas que te llevará desde los fundamentos 
            hasta implementaciones enterprise de Java y Spring Boot.
          </p>
          
          {/* Course Stats */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Clock className="w-4 h-4 mr-2" />
              {totalHours} horas de contenido
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Boxes className="w-4 h-4 mr-2" />
              {curriculumModules.length} módulos especializados
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Code2 className="w-4 h-4 mr-2" />
              Proyectos del mundo real
            </Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {curriculumModules.map((module, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-border/50"
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
      </div>
    </section>
  );
};

export default CurriculumSection;