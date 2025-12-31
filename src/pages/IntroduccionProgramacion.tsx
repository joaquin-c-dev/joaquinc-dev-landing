import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Terminal
} from "lucide-react";
import Navigation from "@/components/Navigation";
import DiscountBanner from "@/components/DiscountBanner";
import Footer from "@/components/Footer";
import HeroSectionIntroduccion from "@/components/HeroSectionIntroduccion";
import CurriculumSectionIntroduccion from "@/components/CurriculumSectionIntroduccion";
import ProximosIniciosSectionIntroduccion from "@/components/ProximosIniciosSectionIntroduccion";

const IntroduccionProgramacion = () => {
  const totalHours = 30;
  const totalModules = 9;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <DiscountBanner />
      <Navigation />
      <HeroSectionIntroduccion />
      <CurriculumSectionIntroduccion />
      <ProximosIniciosSectionIntroduccion />
      
      {/* Pricing Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
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

      <Footer />
    </div>
  );
};

export default IntroduccionProgramacion;