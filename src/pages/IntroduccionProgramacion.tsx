import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Terminal, 
  Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import DiscountBanner from "@/components/DiscountBanner";
import Footer from "@/components/Footer";
import HeroSectionIntroduccion from "@/components/HeroSectionIntroduccion";
import CurriculumSectionIntroduccion from "@/components/CurriculumSectionIntroduccion";

const IntroduccionProgramacion = () => {
  const totalHours = 30;
  const totalModules = 9;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <DiscountBanner />
      <Navigation />
      <HeroSectionIntroduccion />
      <CurriculumSectionIntroduccion />
      
      <main className="pb-12">
        {/* Próximos Inicios */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Próximos Inicios
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-8">
                Elige la modalidad que mejor se adapte a tu horario y comienza tu aprendizaje
              </p>
              
              <div className="max-w-md mx-auto">
                <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Modalidad Entre Semana</h3>
                    <p className="text-muted-foreground">Introducción a la programación</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Lun - Jue 8:00 PM - 10:00 PM</div>
                        <div className="text-sm text-muted-foreground">30 horas totales</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-semibold">3 Nov - 26 Nov 2025</div>
                        <div className="text-sm text-muted-foreground">4 semanas de duración</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Clases en vivo</div>
                        <div className="text-sm text-muted-foreground">Con grabaciones incluidas</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="max-w-md mx-auto">
              <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Inversión del Curso</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <div className="mb-2">
                      <span className="text-lg text-muted-foreground line-through">$6,500 MXN</span>
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      $4,500 MXN
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-2">
                      <span>💸 Cupón aplicado: -$2,000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Curso completo de {totalHours} horas • Material incluido
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Code className="w-4 h-4" />
                      <span>{totalModules} módulos completos</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Terminal className="w-4 h-4" />
                      <span>Ejercicios prácticos incluidos</span>
                    </div>
                  </div>
                  
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <a 
                        href="https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04?prefilled_promo_code=INTRO"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button 
                          size="lg" 
                          className="relative bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300 text-lg font-semibold py-3 w-full border border-primary/30 hover:from-primary/90 hover:via-primary-glow/90 hover:to-primary/90"
                        >
                          Inscribirme Ahora
                        </Button>
                      </a>
                    </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Pago seguro con Stripe • Todas las tarjetas aceptadas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IntroduccionProgramacion;