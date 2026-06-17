import { Button } from "@/components/ui/button";
import { Code, GraduationCap, Rocket, ArrowRight, Play } from "lucide-react";
import joaquinProfile from "@/assets/joaquin-profile.jpg";
import { useNavigate } from "@/lib/router";

const HomeHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 pb-16">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-tech-purple/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 animate-fade-in">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Cursos en vivo y en línea</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in">
            <span className="text-foreground">Conviértete en</span>
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Java Developer
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Aprende Java desde cero hasta nivel profesional con cursos en vivo, 
            proyectos reales y mentoría directa. Domina Spring Boot, APIs REST y 
            las tecnologías más demandadas del mercado.
          </p>

          {/* Instructor info */}
          <div className="flex items-center justify-center gap-4 animate-fade-in">
            <img 
              src={joaquinProfile}
              alt="Joaquín Coronado Ramírez"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
            />
            <div className="text-left">
              <div className="font-semibold text-foreground">Joaquín Coronado</div>
              <div className="text-sm text-muted-foreground">Head of Backend • +9 años de experiencia</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Button 
                size="lg"
                className="relative bg-gradient-accent text-white text-lg px-8 py-6 transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30"
                onClick={() => {
                  const section = document.querySelector('[data-section="courses"]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Explorar Cursos
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 hover:border-primary/50 text-lg px-8 py-6 hover:bg-primary/5 hover:text-primary"
              onClick={() => navigate('/acerca-de-mi')}
            >
              Conocer al Instructor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">+9</div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">3</div>
              <div className="text-sm text-muted-foreground">Cursos disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">100%</div>
              <div className="text-sm text-muted-foreground">Clases en vivo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
