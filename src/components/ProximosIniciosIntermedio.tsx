import { Card } from "@/components/ui/card";
import { Calendar, Clock, BookOpen } from "lucide-react";

const ProximosIniciosIntermedio = () => {
  return (
    <section className="min-h-screen flex items-center py-16 bg-gradient-hero relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-tech-purple/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Próximos Inicios
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige la modalidad que mejor se adapte a tu horario y lleva tu carrera al siguiente nivel
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-6">
          {/* Modalidad Sabatina */}
          <Card className="p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modalidad Sabatina</h3>
              <p className="text-muted-foreground">Java Intermedio</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Sábados 9:00 AM - 2:00 PM</div>
                  <div className="text-sm text-muted-foreground">40 horas totales</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">18 Abr 2026 - 20 Jun 2026</div>
                  <div className="text-sm text-muted-foreground">8 semanas de duración</div>
                  <div className="text-sm text-yellow-500 mt-1">⚠️ No hay clases: 2 Mayo y 30 Mayo</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Clases en vivo</div>
                  <div className="text-sm text-muted-foreground">Con grabaciones incluidas</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProximosIniciosIntermedio;
