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
    title: "Introducción a Java",
    duration: "4 horas",
    topics: [
      "¿Qué es Java y cómo trabaja?",
      "Java Virtual Machine (JVM)",
      "JDK y JRE",
      "Comandos java, javac",
      "Java ES, Java EE, Jakarta",
      "Empaquetado de aplicaciones (JAR y WAR)",
      "Versiones en Java",
      "Instalación del JDK y variable de entorno"
    ],
    color: "tech-blue"
  },
  {
    icon: Code2,
    title: "Fundamentos de Java",
    duration: "8 horas",
    topics: [
      "Estructura de un programa en Java",
      "Variables y tipos de datos",
      "Palabra reservada 'var' y 'final'",
      "Bases Hexadecimal, Octal, Binario",
      "Conversión de tipos y manejo de cadenas",
      "Operadores (asignación, aritméticos, relacionales, lógicos)",
      "Sentencias de control (if, else, switch)",
      "Ciclos (while, do-while, for, forEach)",
      "Métodos y sobrecarga",
      "Arreglos y uso de paquetes"
    ],
    color: "tech-green"
  },
  {
    icon: Boxes,
    title: "Programación Orientada a Objetos",
    duration: "8 horas",
    topics: [
      "Abstracción, clases y objetos",
      "Métodos y atributos",
      "Constructor y sobrecarga de constructor",
      "Palabras reservadas 'this' y 'super'",
      "Contexto estático",
      "Encapsulamiento y operadores de visibilidad",
      "Setter y getters",
      "Herencia y palabra reservada 'extends'",
      "Sobreescritura de métodos (@Override)",
      "Polimorfismo, clases abstractas e interfaces"
    ],
    color: "tech-purple"
  },
  {
    icon: Settings,
    title: "Enumerables, Genericos y Collections",
    duration: "4 horas",
    topics: [
      "Enumerables y sus atributos/métodos",
      "Genericos y convenciones",
      "Collections API",
      "Listas (ArrayList, LinkedList)",
      "Set (HashSet, TreeSet)",
      "Map (HashMap, TreeMap)"
    ],
    color: "tech-orange"
  },
  {
    icon: Shield,
    title: "Excepciones y Programación Funcional",
    duration: "6 horas",
    topics: [
      "Checked y Unchecked Exceptions",
      "Throwable, Exception, RunTimeException",
      "try, catch, finally",
      "Throw y Throws",
      "¿Qué es la programación funcional?",
      "Expresiones Lambda y sintaxis",
      "Interfaces funcionales",
      "Métodos referenciados",
      "Stream API y pipeline",
      "Operaciones intermedias y terminales"
    ],
    color: "tech-red"
  },
  {
    icon: Globe,
    title: "Introducción al Desarrollo Web",
    duration: "4 horas",
    topics: [
      "¿Qué es el desarrollo web?",
      "Arquitectura Cliente-Servidor",
      "HTTP: protocolo de comunicación",
      "Métodos HTTP (GET, POST, PUT, DELETE)",
      "Estructura de una URL",
      "Códigos de estado HTTP (200, 404, 500)",
      "APIs y servicios REST"
    ],
    color: "tech-cyan"
  },
  {
    icon: Database,
    title: "Spring Framework y MongoDB",
    duration: "6 horas",
    topics: [
      "Introducción al ecosistema Spring",
      "¿Qué es Spring Framework y Spring Boot?",
      "Inversión de Control (IoC) y Dependency Injection (DI)",
      "Creación y gestión de Beans (@Component, @Service, @Repository)",
      "Controladores REST (@RestController, @GetMapping, @PostMapping)",
      "Manejo de parámetros y excepciones (@ExceptionHandler)",
      "Introducción a MongoDB",
      "Creación de documentos con @Document",
      "Uso de MongoTemplate",
      "Inserción y búsqueda de documentos"
    ],
    color: "course-blue"
  }
];

const CurriculumSection = () => {
  const totalHours = curriculumModules.reduce((total, module) => {
    return total + parseInt(module.duration.split(' ')[0]);
  }, 0);

  return (
    <section id="curriculum" className="py-24 bg-course-dark relative overflow-hidden">
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