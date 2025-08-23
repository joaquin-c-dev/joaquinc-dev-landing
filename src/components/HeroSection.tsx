import { Button } from "@/components/ui/button";
import { Code, Coffee, Zap } from "lucide-react";
import javaHeroImage from "@/assets/java-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-java-orange/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <Coffee className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
                Aprende Java desde Cero
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Domina{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Java
              </span>
              <br />
              Como un Pro
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Aprende programación en Java desde los fundamentos hasta conceptos avanzados. 
              Curso práctico con proyectos reales y mentorías personalizadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="shadow-glow hover:shadow-glow-lg transition-glow bg-gradient-primary hover:bg-gradient-primary/90 text-lg px-8 py-4">
                <Zap className="w-5 h-5 mr-2" />
                Comenzar Ahora
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/50 text-lg px-8 py-4">
                <Code className="w-5 h-5 mr-2" />
                Ver Contenido
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Horas de Contenido</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Proyectos Prácticos</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte</div>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow-lg">
              <img 
                src={javaHeroImage} 
                alt="Java Programming Course" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-java-dark/80 via-transparent to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-lg shadow-accent flex items-center justify-center animate-bounce">
              <Coffee className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-card border border-primary/20 rounded-xl shadow-card flex items-center justify-center">
              <Code className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;