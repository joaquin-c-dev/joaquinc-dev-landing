import { Button } from "@/components/ui/button";
import { Code, Zap } from "lucide-react";
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
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-4xl mx-auto text-center">
          

          {/* Main title */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Aprende{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Java
            </span>{" "}
            desde Cero
          </h1>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional. 
            Más de 9 años de experiencia en desarrollo backend me respaldan 
            para guiarte en tiempo real en cada paso de tu carrera como developer.
          </p>

              {/* Instructor info - subtle */}
          <div className="flex items-center justify-center gap-3 mb-6 opacity-70">
            <img 
              src={joaquinProfile}
              alt="Joaquín Coronado Ramírez"
              className="w-8 h-8 rounded-full object-cover border border-primary/20"
            />
            <div className="text-sm text-muted-foreground/80">
              Con <span className="text-primary font-medium">Joaquín Coronado</span> • Head of Backend
            </div>
          </div>

          {/* Video Section */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-accent rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative bg-card/50 backdrop-blur-md border border-primary/20 rounded-2xl p-4 shadow-xl">
                <video 
                  className="w-full max-w-md lg:max-w-lg rounded-xl shadow-lg"
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
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Button 
                size="lg"
                className="relative bg-gradient-primary text-white text-lg px-8 py-4 transition-all duration-300 hover:scale-105 shadow-elegant border border-primary/30"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Inscribirme Ahora
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 hover:border-primary/50 text-lg px-8 py-4 hover:bg-primary/5"
              onClick={() => {
                const curriculumSection = document.getElementById('curriculum');
                curriculumSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Code className="w-5 h-5 mr-2" />
              Ver Temario
            </Button>
          </div>
          
          {/* Pricing info with urgency */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-2xl max-w-md mx-auto">
            {/* Urgency Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/40 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold text-sm uppercase tracking-wide">
                  ¡OFERTA POR TIEMPO LIMITADO!
                </span>
              </div>
              
              {/* Countdown */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">La oferta termina en:</p>
                <div className="bg-black/20 px-4 py-2 rounded-lg border border-primary/20">
                  <CountdownTimer textColor="text-red-400 font-mono font-bold text-lg" />
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-xl text-muted-foreground line-through opacity-60">$8,500</span>
                <span className="text-4xl font-black text-white">$6,500</span>
                <span className="text-sm text-muted-foreground">MXN</span>
              </div>
              
              <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-500/40 mb-4">
                <span className="text-green-400 font-bold text-lg">¡Ahorras $2,000!</span>
              </div>
            </div>

            {/* Combined Benefits */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Con descuento + 3 meses sin intereses:</p>
                <p className="text-3xl font-black text-white mb-1">$2,167</p>
                <p className="text-primary font-bold">por mes</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">
                    23% DESCUENTO
                  </span>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                    3 MESES SIN INTERESES
                  </span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="text-center text-sm text-muted-foreground space-y-1 mb-4">
              <p className="text-green-400 font-semibold">✅ ¡Descuento + 3 meses sin intereses!</p>
            </div>

            {/* Offer CTA Button */}
            <div className="text-center">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg px-8 py-4 transition-all duration-300 hover:scale-105 shadow-xl border-0"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
              >
                <Zap className="w-5 h-5 mr-2" />
                ¡Aprovechar Oferta!
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;