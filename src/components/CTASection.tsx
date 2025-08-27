import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle, Code } from "lucide-react";

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
              {/* Reviews */}
              <div className="flex items-center justify-center gap-1 mb-3">
                <span className="ml-2 text-muted-foreground">
                  <strong className="text-foreground">Metodología comprobada</strong> en la industria
                </span>
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
              
              {/* Pricing */}
              <div className="mb-6">
                <div className="text-center">
                  <div className="text-muted-foreground line-through text-xl mb-1">$8,500 MXN</div>
                  <div className="text-4xl font-bold text-primary mb-1">$6,500 <span className="text-xl">MXN</span></div>
                  <div className="text-muted-foreground text-sm mb-2">Oferta por tiempo limitado</div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    <span className="text-primary font-semibold text-sm">💳 3 meses sin intereses</span>
                    <span className="text-muted-foreground text-xs">o $2,167 MXN/mes</span>
                  </div>
                </div>
              </div>
              
              {/* Modern CTA Button */}
              <div className="flex justify-center">
                <div className="group relative">
                  <div className="absolute -inset-3 bg-gradient-accent rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-15 group-hover:opacity-25 transition-opacity duration-500"></div>
                  <Button 
                    size="lg"
                    className="relative bg-gradient-primary text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-primary/30"
                    onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
                  >
                    <span className="font-black">
                      INSCRIBIRME AHORA
                    </span>
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
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