import { Button } from "@/components/ui/button";
import { Code, Coffee, Zap } from "lucide-react";
import joaquinProfile from "@/assets/joaquin-profile.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-8 md:px-12 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Text content */}
          <div className="px-4 md:px-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Coffee className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
                Aprende Java desde Cero
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Aprende{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Java
              </span>
              <br />
              desde Cero
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional. 
              Más de 9 años de experiencia en desarrollo backend me respaldan 
              para guiarte en tiempo real en cada paso de tu carrera como developer.
            </p>
            
            {/* Instructor Profile - Subtle */}
            <div className="flex items-center justify-center gap-3 mb-8 opacity-80">
              <img 
                src={joaquinProfile}
                alt="Joaquín Coronado Ramírez"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
              />
              <div className="text-sm text-muted-foreground">
                Con <span className="text-primary font-medium">Joaquín Coronado</span> • Head of Backend
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {/* Stripe Buy Button */}
              <div className="stripe-buy-button-container">
                <stripe-buy-button
                  buy-button-id="buy_btn_1RzR2zAyQjZdu8i7sqQCgWAl"
                  publishable-key="pk_test_51RzQPTAyQjZdu8i70FBAW5kc6JF0KXxpdPq7rO6rQrKPKtpFuuqLHJz6wLvbjQGuNr7fvj8uGd3MIUjaF0bocihO00zOLurAWP"
                >
                </stripe-buy-button>
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
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">En Vivo</div>
                <div className="text-sm text-muted-foreground">Clases Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">9+</div>
                <div className="text-sm text-muted-foreground">Años Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Directo</div>
                <div className="text-sm text-muted-foreground">Conmigo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;