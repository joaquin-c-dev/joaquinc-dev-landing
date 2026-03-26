import { Button } from "@/components/ui/button";
import { Code, Zap, Gift } from "lucide-react";
import joaquinProfile from "@/assets/joaquin-profile.jpg";
import intellijLogo from "@/assets/intellij-logo.png";

const HeroSectionIntermedio = () => {
  const scrollToTemario = () => {
    const temarioSection = document.querySelector('[data-section="temario-intermedio"]');
    if (temarioSection) {
      temarioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section data-section="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-32 md:pt-36 lg:pt-20 pb-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-purple/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16 flex items-center justify-center w-full">
        <div className="w-full max-w-7xl mx-auto">
          {/* Single Column Layout (change back to grid lg:grid-cols-2 when video is ready) */}
          <div className="flex flex-col items-center justify-center">
            {/* Left Column - Video (TEMPORARILY DISABLED - uncomment when video is ready)
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative group w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="absolute -inset-2 bg-gradient-accent rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-card/50 backdrop-blur-md border border-primary/20 rounded-2xl p-2 md:p-3 shadow-xl">
                  <video 
                    className="w-full rounded-xl shadow-lg"
                    controls
                    autoPlay
                    muted
                    playsInline
                    poster="https://res.cloudinary.com/joaquin-test/image/upload/v1756607596/Screenshot_at_Aug_30_20-32-46_qgh3zx.png"
                    preload="metadata"
                  >
                    <source src="YOUR_VIDEO_URL_HERE" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              </div>
            </div>
            */}

            {/* Right Column - Text and Buttons */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8 text-center max-w-2xl">
              {/* Main title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <div>Java{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Intermedio
                </span></div>
                <div>Spring Boot Profesional</div>
              </h1>
              
              {/* Description */}
              <p className="text-base lg:text-lg text-muted-foreground/90 leading-relaxed">
                Lleva tus conocimientos de Java al siguiente nivel. Aprende patrones de diseño, 
                testing profesional, seguridad con JWT, persistencia con JPA y mucho más 
                para crear aplicaciones backend robustas y listas para producción.
              </p>

              {/* Instructor info - subtle */}
              <div className="flex items-center justify-center gap-3 opacity-70">
                <img 
                  src={joaquinProfile}
                  alt="Joaquín Coronado Ramírez"
                  className="w-8 h-8 rounded-full object-cover border border-primary/20"
                />
                <div className="text-sm text-muted-foreground/80">
                  Con <span className="text-primary font-medium">Joaquín Coronado</span> • Head of Backend
                </div>
              </div>
              
              {/* IntelliJ Banner - TEMPORARILY DISABLED
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm sm:text-base font-medium">Incluye licencia gratis de</span>
                </div>
                <div className="flex items-center gap-2 bg-card/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-primary/20">
                  <img 
                    src={intellijLogo} 
                    alt="IntelliJ IDEA Ultimate" 
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-bold text-sm sm:text-base bg-gradient-accent bg-clip-text text-transparent">
                    IntelliJ IDEA Ultimate
                  </span>
                </div>
              </div>
              */}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <Button 
                    size="lg"
                    className="relative bg-gradient-accent text-white text-base px-6 py-3 transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30 min-w-[180px] h-[48px]"
                    onClick={() => window.open('https://buy.stripe.com/6oU4gB1mm91hgjLavab3q05?prefilled_promo_code=INTERMEDIO', '_blank')}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Inscribirme Ahora
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 hover:border-primary/50 text-base px-6 py-3 hover:bg-primary/5 hover:text-primary min-w-[180px] h-[48px]"
                  onClick={scrollToTemario}
                >
                  <Code className="w-5 h-5 mr-2" />
                  Ver Temario
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionIntermedio;
