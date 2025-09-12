import { Button } from "@/components/ui/button";
import { Code, Zap, Flame, CheckCircle, CreditCard, Lock } from "lucide-react";
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
            <div>Aprende{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Java
            </span></div>
            <div>desde Cero</div>
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
                  className="w-full max-w-lg lg:max-w-xl rounded-xl shadow-lg"
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
              Ver Contenido
            </Button>
          </div>
          
          {/* Optimized Pricing Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl max-w-md mx-auto">
            {/* Urgency Message */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-red-500" />
                <span className="text-red-400 font-bold text-lg">¡Tiempo limitado! Esta oportunidad termina en:</span>
              </div>
              <div className="flex justify-center">
                <CountdownTimer textColor="text-red-400" />
              </div>
              <p className="text-red-300/80 text-sm mt-2">Quedan pocas horas para inscribirte con descuento</p>
            </div>

            {/* Price Section */}
            <div className="text-center mb-4">
              {/* Original price crossed out */}
              <div className="text-neutral-400 line-through text-2xl mb-2">$8,500 MXN</div>
              
              {/* Current price highlighted */}
              <div className="text-5xl font-black text-white mb-4">
                $6,500 <span className="text-2xl font-normal">MXN</span>
              </div>
              
              {/* Combined benefit block */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
                <div className="text-green-400 font-bold text-lg mb-1">
                  💰 Con descuento + 3 meses sin intereses
                </div>
                <div className="text-green-300 text-2xl font-bold">
                  $2,167 / mes
                </div>
                <div className="text-green-200/70 text-sm mt-1">
                  Ahorras $2,000 y pagas cómodamente
                </div>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="mb-4">
              <Button 
                size="lg"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-xl py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
              >
                🔥 Quiero mi lugar con descuento
              </Button>
            </div>
            
            {/* Trust signals */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span>Pago seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-green-400" />
                <span>Todas las tarjetas</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-green-400" />
                <span>Datos protegidos</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;