import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, BookOpen } from "lucide-react";

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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                  <div className="font-semibold">1 Nov - 20 Dic 2024</div>
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

            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
            >
              Inscribirme Modalidad Sabatina
            </Button>
          </Card>

          {/* Modalidad Entre Semana */}
          <Card className="p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-tech-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-tech-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modalidad Entre Semana</h3>
              <p className="text-muted-foreground">Java desde Cero</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-tech-cyan flex-shrink-0" />
                <div>
                  <div className="font-semibold">Lun - Jue 8:00 PM - 10:00 PM</div>
                  <div className="text-sm text-muted-foreground">40 horas totales</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-tech-cyan flex-shrink-0" />
                <div>
                  <div className="font-semibold">3 Nov - 4 Dic 2024</div>
                  <div className="text-sm text-muted-foreground">5 semanas de duración</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-tech-cyan flex-shrink-0" />
                <div>
                  <div className="font-semibold">Clases en vivo</div>
                  <div className="text-sm text-muted-foreground">Con grabaciones incluidas</div>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-tech-cyan text-tech-cyan hover:bg-tech-cyan hover:text-white"
              onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
            >
              Inscribirme Modalidad Entre Semana
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProximosIniciosSection;