import { Button } from "@/components/ui/button";
import { Code, Coffee, Zap } from "lucide-react";
import joaquinProfile from "@/assets/joaquin-profile.jpg";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section data-section="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-8 md:px-12 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto">
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
                Aprende{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Java
                </span>
                <br />
                desde Cero
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl lg:max-w-none">
                Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional. 
                Más de 9 años de experiencia en desarrollo backend me respaldan 
                para guiarte en tiempo real en cada paso de tu carrera como developer.
              </p>
              
              {/* Instructor Profile - Subtle */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 opacity-80">
                <img 
                  src={joaquinProfile}
                  alt="Joaquín Coronado Ramírez"
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="text-sm text-muted-foreground">
                  Con <span className="text-primary font-medium">Joaquín Coronado</span> • Head of Backend
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                {/* Modern CTA Button */}
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-accent rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <Button 
                    size="lg"
                    className="relative bg-gradient-primary text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-primary/30"
                    onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
                  >
                    <span>Inscribirme Ahora</span>
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 hover:border-primary/50 text-lg px-8 py-4"
                  onClick={() => {
                    const curriculumSection = document.getElementById('curriculum');
                    curriculumSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Code className="w-5 h-5 mr-2" />
                  Ver Contenido
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary">En Vivo</div>
                  <div className="text-sm text-muted-foreground">Clases Online</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary">9+</div>
                  <div className="text-sm text-muted-foreground">Años Experiencia</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary">Directo</div>
                  <div className="text-sm text-muted-foreground">Conmigo</div>
                </div>
              </div>
              
              {/* Subtle pricing info */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <div className="inline-flex flex-col items-center gap-2 bg-primary/5 px-6 py-4 rounded-xl border border-primary/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground line-through">$8,500</span>
                    <span className="text-xl font-bold text-primary">$6,500 MXN</span>
                    <div className="px-2 py-1 bg-primary/20 text-xs font-semibold text-primary rounded-md">23% OFF</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">o desde</span>
                    <span className="font-semibold text-primary">$2,167/mes</span>
                    <span className="text-primary/70">sin intereses</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Oferta termina en:</span>
                    <CountdownTimer textColor="text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-accent rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-2xl">
                  <video 
                    className="w-full max-w-md rounded-xl shadow-lg"
                    controls
                    poster="/placeholder.svg"
                    preload="metadata"
                  >
                    <source src="https://storage.googleapis.com/avena-bot.appspot.com/img/landing/es/interview_es.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Conoce qué aprenderás en el curso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;