import { Button } from "@/components/ui/button";
import { Code, Zap, Flame, CheckCircle, CreditCard, Lock } from "lucide-react";
import joaquinProfile from "@/assets/joaquin-profile.jpg";
import CountdownTimer from "./CountdownTimer";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section data-section="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-center min-h-full pt-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Main title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            <div>Aprende{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Java
            </span></div>
            <div>desde Cero</div>
          </h1>
          
          {/* Description */}
          <p className="text-base lg:text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional. 
            Más de 9 años de experiencia en desarrollo backend me respaldan 
            para guiarte en tiempo real en cada paso de tu carrera como developer.
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

          {/* Video Section */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-accent rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative bg-card/50 backdrop-blur-md border border-primary/20 rounded-2xl p-3 shadow-xl">
                <video 
                  className="w-full max-w-md lg:max-w-lg rounded-xl shadow-lg"
                  controls
                  autoPlay
                  muted
                  playsInline
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Button 
                size="lg"
                className="relative bg-gradient-accent text-white text-base px-6 py-3 transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30 min-w-[180px] h-[48px]"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Inscribirme Ahora
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 hover:border-primary/50 text-base px-6 py-3 hover:bg-primary/5 hover:text-primary min-w-[180px] h-[48px]"
              onClick={() => navigate('/temario')}
            >
              <Code className="w-5 h-5 mr-2" />
              Ver Temario
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;