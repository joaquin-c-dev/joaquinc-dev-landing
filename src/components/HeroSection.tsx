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
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-5xl mx-auto">
          {/* Top badge and instructor info */}
          <div className="text-center mb-4">
            <div className="flex items-center gap-2 mb-2 justify-center opacity-70">
              <Coffee className="w-4 h-4 text-primary/70" />
              <span className="text-muted-foreground/80 uppercase tracking-wider text-xs font-medium">
                Aprende Java desde Cero
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-3 opacity-60">
              <img 
                src={joaquinProfile}
                alt="Joaquín Coronado Ramírez"
                className="w-6 h-6 rounded-full object-cover border border-primary/20"
              />
              <div className="text-xs text-muted-foreground/70">
                Con <span className="text-primary/80 font-medium">Joaquín Coronado</span> • Head of Backend
              </div>
            </div>

            {/* Main title and description */}
            <h1 className="text-2xl lg:text-4xl font-bold mb-3 leading-tight opacity-90">
              Aprende{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Java
              </span>
              <br />
              desde Cero
            </h1>
            
            <p className="text-base text-muted-foreground/80 mb-4 max-w-2xl mx-auto opacity-80">
              Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional. 
              Más de 9 años de experiencia en desarrollo backend me respaldan 
              para guiarte en tiempo real en cada paso de tu carrera como developer.
            </p>
          </div>

          {/* Video Section - Hero */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-accent rounded-2xl blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="relative bg-card/60 backdrop-blur-md border-2 border-primary/30 rounded-2xl p-3 shadow-2xl">
                <video 
                  className="w-full max-w-lg lg:max-w-2xl rounded-xl shadow-2xl"
                  controls
                  autoPlay
                  muted
                  poster="https://res.cloudinary.com/joaquin-test/image/upload/v1756607596/Screenshot_at_Aug_30_20-32-46_qgh3zx.png"
                  preload="metadata"
                >
                  <source src="https://res.cloudinary.com/joaquin-test/video/upload/v1756623620/joaquin%20c.%20dev/java%20desde%20cero/GMT20250831-012428_Recording.cutfile.20250831065554802_1920x1080_fhlezz.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          </div>

          {/* Remaining content */}
          <div className="text-center px-2 md:px-4">
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              {/* Primary CTA Button with glow effect */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <Button 
                  size="default"
                  className="relative bg-gradient-primary text-white text-base px-6 py-3 transition-all duration-300 hover:scale-105 shadow-elegant border border-primary/30"
                  onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Inscribirme Ahora
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="default" 
                className="border-primary/30 hover:border-primary/50 text-base px-6 py-3"
                onClick={() => {
                  const curriculumSection = document.getElementById('curriculum');
                  curriculumSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Code className="w-4 h-4 mr-2" />
                Ver Contenido
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">En Vivo</div>
                <div className="text-xs text-muted-foreground">Clases Online</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">9+</div>
                <div className="text-xs text-muted-foreground">Años Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">Directo</div>
                <div className="text-xs text-muted-foreground">Conmigo</div>
              </div>
            </div>
            
            {/* Subtle pricing info */}
            <div className="flex justify-center">
              <div className="inline-flex flex-col items-center gap-1 bg-primary/5 px-4 py-3 rounded-xl border border-primary/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">$8,500</span>
                  <span className="text-lg font-bold text-primary">$6,500 MXN</span>
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;