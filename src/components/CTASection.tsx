import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Flame, CheckCircle, Shield, CreditCard, Lock } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const CTASection = () => {
  return (
    <section data-section="cta" className="py-8 bg-course-darker relative overflow-hidden min-h-screen flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-tech-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-course-blue/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 w-full">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 lg:p-8 bg-gradient-card border-primary/20 shadow-glow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-tech-cyan/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-center">
              {/* Urgency Message */}
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-bold text-lg">¡Tiempo limitado! Esta oportunidad termina en:</span>
                </div>
                <div className="flex justify-center">
                  <CountdownTimer textColor="text-red-400" />
                </div>
                <p className="text-red-300/80 text-sm mt-2">Quedan pocas horas para inscribirte con descuento</p>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                ¿Listo para dar el salto a{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Java Developer?
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Te acompaño personalmente en vivo durante tu transformación profesional. 
                Clases online en tiempo real donde mi experiencia de 9+ años en backend 
                es tu garantía de aprendizaje efectivo.
              </p>
              
              {/* Benefits list */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Clases en vivo</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Grabaciones incluidas</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Mentoría directa</span>
                </div>
              </div>

              {/* Course Schedule */}
              <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <h3 className="text-lg font-semibold mb-3 text-primary">📅 Próximo Inicio</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Inicio</div>
                    <div className="font-semibold text-foreground">1 de Noviembre</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Modalidad</div>
                    <div className="font-semibold text-foreground">Sabatina 9am - 2pm</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Finalización</div>
                    <div className="font-semibold text-foreground">20 de Diciembre</div>
                  </div>
                </div>
              </div>
              
              {/* Optimized Pricing Section */}
              <div className="mb-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-center">
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
              </div>
              
              {/* Enhanced CTA Button */}
              <div className="mb-6">
                <Button 
                  size="lg"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-xl py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
                  onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
                >
                  🔥 Quiero mi lugar con descuento
                </Button>
              </div>
              
              {/* Trust signals */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-green-400" />
                  <span>Todas las tarjetas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Datos protegidos</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                🎯 Política de Satisfacción: Si no quedas satisfecho, puedes retomar el curso una vez más sin costo adicional
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;