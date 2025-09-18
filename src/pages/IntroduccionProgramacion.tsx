import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Code, 
  Terminal, 
  Type, 
  Calculator, 
  GitBranch, 
  RotateCcw, 
  Grid3X3, 
  Zap,
  Layers
} from "lucide-react";
import Navigation from "@/components/Navigation";
import DiscountBanner from "@/components/DiscountBanner";
import Footer from "@/components/Footer";
import { useBanner } from "@/contexts/BannerContext";
import { useCountdown } from "@/contexts/CountdownContext";
import { useIsMobile } from "@/hooks/use-mobile";

const curriculumModules = [
  {
    icon: Code,
    title: "Introducción a la programación",
    duration: "3 horas",
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
    duration: "3 horas",
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
    duration: "4 horas",
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
    duration: "2 horas",
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
    duration: "4 horas",
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
    duration: "4 horas",
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
    duration: "4 horas",
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
    duration: "3 horas",
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
    duration: "3 horas",
    topics: [
      "Abstracción: Clase y Objeto",
      "Encapsulamiento",
      "Herencia",
      "Polimorfismo"
    ],
    color: "cyan"
  }
];

const IntroduccionProgramacion = () => {
  const { isBannerVisible } = useBanner();
  const { timeLeft } = useCountdown();
  const isMobile = useIsMobile();

  const totalHours = curriculumModules.reduce((acc, module) => 
    acc + parseInt(module.duration), 0
  );

  const shouldShowBanner = isBannerVisible && !timeLeft.isExpired;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation />
      {shouldShowBanner && <DiscountBanner />}
      
      <main className={`${shouldShowBanner ? 'pt-28' : 'pt-16'} pb-12`}>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Curso Completo</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Introducción a la Programación
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Aprende los fundamentos de la programación desde cero. Un curso completo que te llevará desde los conceptos básicos hasta la programación orientada a objetos.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalHours}h</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{curriculumModules.length}</div>
                  <div className="text-sm text-muted-foreground">Módulos</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Práctico</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Temario Completo
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Un programa estructurado que te llevará paso a paso desde los conceptos más básicos hasta la programación orientada a objetos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {curriculumModules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                            {module.title}
                          </CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {module.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Methodology Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-primary">
                    Metodología del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Teoría Aplicada</h3>
                      <p className="text-sm text-muted-foreground">
                        Conceptos explicados de forma clara con ejemplos prácticos inmediatos.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Terminal className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Práctica Inmediata</h3>
                      <p className="text-sm text-muted-foreground">
                        Cada tema incluye ejercicios prácticos para reforzar el aprendizaje.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Proyectos Reales</h3>
                      <p className="text-sm text-muted-foreground">
                        Construye proyectos que puedes agregar a tu portafolio profesional.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Section */}
            <div className="max-w-md mx-auto mb-16">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-primary">
                    Precio del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-primary mb-4">
                    $6,500 MXN
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Curso completo de {totalHours} horas
                  </p>
                  <a 
                    href="https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
                    >
                      Pagar Ahora
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <Link to="/?scroll=pricing">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  Inscribirme Ahora
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Comienza tu carrera en programación hoy mismo
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IntroduccionProgramacion;