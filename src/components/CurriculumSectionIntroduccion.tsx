import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code, 
  Terminal, 
  Type, 
  Calculator, 
  GitBranch, 
  RotateCcw, 
  Grid3X3, 
  Zap,
  Layers,
  CheckCircle2,
  Clock
} from "lucide-react";

const curriculumModules = [
  {
    icon: Code,
    title: "Introducción a la programación",
    duration: "3 hrs",
    topics: [
      "¿Qué es un algoritmo?",
      "¿Cómo descomponer un problema en pasos pequeños?",
      "Paradigmas de programación",
      "Lenguajes compilados e interpretados",
      "Lenguajes de alto nivel",
      "Pseudocódigo",
      "Diagramas de flujo"
    ],
    color: "blue"
  },
  {
    icon: Terminal,
    title: "Entradas y salidas (I/O)",
    duration: "3 hrs",
    topics: [
      "La Consola/Terminal",
      "Primer programa \"Hola mundo\"",
      "System.out.println (Output)",
      "Scanner (Input)"
    ],
    color: "green"
  },
  {
    icon: Type,
    title: "Variables y tipos de datos",
    duration: "4 hrs",
    topics: [
      "Declaración e inicialización",
      "Tipos primitivos",
      "int, boolean, char, float",
      "Tipos estructurados",
      "Arreglos, Cadenas de texto",
      "Constantes"
    ],
    color: "purple"
  },
  {
    icon: Calculator,
    title: "Operadores",
    duration: "2 hrs",
    topics: [
      "Aritméticos (+, -, *, /)",
      "Relacionales (>, <, !=, ==...)",
      "Lógicos (&&, ||)"
    ],
    color: "orange"
  },
  {
    icon: GitBranch,
    title: "Estructuras de control",
    duration: "4 hrs",
    topics: [
      "if",
      "else",
      "else - if",
      "Operador ternario",
      "Anidamiento de condiciones",
      "Estructura switch"
    ],
    color: "red"
  },
  {
    icon: RotateCcw,
    title: "Ciclos",
    duration: "4 hrs",
    topics: [
      "while",
      "do-while",
      "for",
      "Contadores y acumuladores"
    ],
    color: "indigo"
  },
  {
    icon: Grid3X3,
    title: "Arreglos",
    duration: "4 hrs",
    topics: [
      "Propiedades de los arreglos",
      "Arreglos: declaración, inicialización, recorrido",
      "Matrices: declaración, inicialización, recorrido"
    ],
    color: "teal"
  },
  {
    icon: Zap,
    title: "Funciones",
    duration: "3 hrs",
    topics: [
      "Definición y sintaxis",
      "Parámetros y retorno de valores",
      "Alcance de variables (local vs global)",
      "Paso de parámetros por valor y por referencia"
    ],
    color: "pink"
  },
  {
    icon: Layers,
    title: "Introducción a POO",
    duration: "3 hrs",
    topics: [
      "Abstracción: Clase y Objeto",
      "Encapsulamiento",
      "Herencia",
      "Polimorfismo"
    ],
    color: "cyan"
  }
];

const CurriculumSectionIntroduccion = () => {
  const totalHours = curriculumModules.reduce((total, module) => {
    return total + parseInt(module.duration.split(' ')[0]);
  }, 0);

  return (
    <section data-section="temario-introduccion" id="curriculum" className="py-24 bg-course-dark relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-purple/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-course-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-glow opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-course-blue/5 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
              Temario del Curso
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Temario del{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Curso
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Un programa estructurado de {totalHours} hrs que te llevará desde los fundamentos 
            de la programación hasta la introducción a la programación orientada a objetos.
          </p>
          
          {/* Course Stats */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Clock className="w-4 h-4 mr-2" />
              {totalHours} hrs de contenido
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Layers className="w-4 h-4 mr-2" />
              {curriculumModules.length} módulos especializados
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base border-primary/30">
              <Code className="w-4 h-4 mr-2" />
              100% Práctico
            </Badge>
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
                  Cada concepto se explica con ejemplos claros y fáciles de entender.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">🛠️ Práctica Inmediata</h4>
                <p className="text-sm text-muted-foreground">
                  Ejercicios prácticos después de cada tema para reforzar lo aprendido.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">🚀 Proyectos Reales</h4>
                <p className="text-sm text-muted-foreground">
                  Desarrollamos programas completos aplicando todos los conceptos.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSectionIntroduccion;