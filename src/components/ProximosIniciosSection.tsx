import { Card } from "@/components/ui/card";
import { Calendar, Clock, BookOpen } from "lucide-react";

const ProximosIniciosSection = () => {
  return (
    <section className="py-16 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Próximos Inicios
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige la modalidad que mejor se adapte a tu horario y comienza tu transformación profesional
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Modalidad Lunes a Jueves */}
          <Card className="p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modalidad Entre Semana</h3>
              <p className="text-muted-foreground">Java desde Cero</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Lunes a Jueves 7:00 PM - 9:00 PM</div>
                  <div className="text-sm text-muted-foreground">40 horas totales</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">3 Nov - 18 Dic 2025</div>
                  <div className="text-sm text-muted-foreground">7 semanas de duración</div>
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

          {/* Modalidad Sabatina */}
          <Card className="p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modalidad Sabatina</h3>
              <p className="text-muted-foreground">Java desde Cero</p>
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
                  <div className="font-semibold">1 Nov - 20 Dic 2025</div>
                  <div className="text-sm text-muted-foreground">8 semanas de duración</div>
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

export default ProximosIniciosSection;