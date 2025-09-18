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
        <section className="pt-32 pb-12 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Code className="w-4 h-4 mr-2" />
              Curso Completo
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Introducción a la Programación
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aprende los fundamentos de la programación desde cero. Un curso completo que te llevará desde los conceptos básicos hasta la programación orientada a objetos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <Terminal className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Duración</h3>
                  <p className="text-sm text-muted-foreground">{totalHours} horas</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <Layers className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Módulos</h3>
                  <p className="text-sm text-muted-foreground">{curriculumModules.length} módulos</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Modalidad</h3>
                  <p className="text-sm text-muted-foreground">100% Práctico</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Curriculum */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Temario Completo</h2>
                <div className="grid gap-4">
                  {curriculumModules.map((module, index) => {
                    const IconComponent = module.icon;
                    return (
                      <Card key={index} className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                  {module.title}
                                </h3>
                                <Badge variant="secondary" className="text-xs">
                                  {module.duration}
                                </Badge>
                              </div>
                              <ul className="space-y-1">
                                {module.topics.slice(0, 3).map((topic, topicIndex) => (
                                  <li key={topicIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                                    {topic}
                                  </li>
                                ))}
                                {module.topics.length > 3 && (
                                  <li className="text-xs text-muted-foreground italic">
                                    +{module.topics.length - 3} temas más...
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Card */}
              <div className="lg:sticky lg:top-8 h-fit">
                <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/20">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Inversión del Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <div>
                      <div className="mb-2">
                        <span className="text-lg text-muted-foreground line-through">$6,500 MXN</span>
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">
                        $4,500 MXN
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-2">
                        <span>💸 Cupón aplicado: -$2,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Curso completo de {totalHours} horas • Material incluido
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Code className="w-4 h-4" />
                        <span>{curriculumModules.length} módulos completos</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Terminal className="w-4 h-4" />
                        <span>Ejercicios prácticos incluidos</span>
                      </div>
                    </div>
                    
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <a 
                        href="https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button 
                          size="lg" 
                          className="relative bg-gradient-primary text-primary-foreground text-lg font-semibold py-3 w-full transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30"
                        >
                          Pagar Ahora
                        </Button>
                      </a>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Pago seguro con Stripe • Todas las tarjetas aceptadas
                    </p>
                  </CardContent>
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

export default IntroduccionProgramacion;