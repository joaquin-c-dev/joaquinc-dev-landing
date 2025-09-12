import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Star, Clock } from "lucide-react";

const PricingSection = () => {
  return (
    <section data-section="pricing" className="py-16 bg-course-darker relative overflow-hidden min-h-screen flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Elige el <span className="bg-gradient-accent bg-clip-text text-transparent">Plan Perfecto</span> para Ti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferentes opciones de pago para que puedas comenzar tu carrera como Java Developer
          </p>
          
          {/* Toggle buttons */}
          <div className="flex justify-center mt-6">
            <div className="bg-secondary/50 p-1 rounded-xl border border-primary/20">
              <div className="flex">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                  Planes de Pago
                </button>
                <button className="px-4 py-2 rounded-lg text-muted-foreground text-sm font-medium hover:text-foreground">
                  Pago Único
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Plan 1 - Dos Pagos */}
          <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <div className="text-center">
              <div className="mb-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-tech-cyan" />
                <h3 className="text-xl font-bold text-foreground">Flexibilidad</h3>
                <p className="text-sm text-muted-foreground">Dos pagos cómodos</p>
              </div>
              
              {/* Popular badge */}
              <div className="inline-block bg-tech-cyan/10 text-tech-cyan px-3 py-1 rounded-full text-xs font-medium mb-4 border border-tech-cyan/20">
                💡 Más popular
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-black text-foreground mb-1">
                  $3,250 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                </div>
                <div className="text-lg text-muted-foreground">+ $3,250 al iniciar</div>
                <div className="text-xs text-green-400 mt-1">Con descuento de lanzamiento</div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">50% ahora, 50% al iniciar</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Acceso completo al curso</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Mentoría personalizada</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Grabaciones incluidas</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-tech-cyan hover:bg-tech-cyan-glow text-white"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
              >
                Elegir Plan
              </Button>
            </div>
          </Card>

          {/* Plan 2 - Destacado (Centro) */}
          <Card className="relative p-6 bg-gradient-primary border-2 border-primary shadow-glow-lg scale-105 hover:scale-[1.02] hover:shadow-glow-lg transition-all duration-300">
            {/* Most popular badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                MÁS ELEGIDO
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <Zap className="w-8 h-8 mx-auto mb-2 text-white" />
                <h3 className="text-xl font-bold text-white">Recomendado</h3>
                <p className="text-sm text-white/80">3 meses sin intereses</p>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-xs text-white/60 line-through">$8,500 MXN</div>
                <div className="text-4xl font-black text-white mb-1">
                  $2,167 <span className="text-sm font-normal text-white/80">/ mes</span>
                </div>
                <div className="text-lg text-white/90">Total: $6,500 MXN</div>
                <div className="text-xs text-green-300 mt-1">Ahorras $2,000</div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-sm text-white">3 meses sin intereses</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-sm text-white">Descuento de lanzamiento</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-sm text-white">Acceso completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-sm text-white">Soporte prioritario</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-white text-primary hover:bg-white/90 font-bold"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
              >
                🔥 Elegir Plan Estrella
              </Button>
            </div>
          </Card>

          {/* Plan 3 - Sin Descuento */}
          <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <div className="text-center">
              <div className="mb-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-tech-purple" />
                <h3 className="text-xl font-bold text-foreground">Flexibilidad Plus</h3>
                <p className="text-sm text-muted-foreground">Hasta 12 meses</p>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-black text-foreground mb-1">
                  $708 <span className="text-sm font-normal text-muted-foreground">/ mes</span>
                </div>
                <div className="text-lg text-muted-foreground">desde 12 meses</div>
                <div className="text-xs text-muted-foreground mt-1">
                  6 meses: $1,417/mes • 12 meses: $708/mes
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">6 a 12 meses sin intereses</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Precio completo: $8,500</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Acceso completo al curso</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Mentoría incluida</span>
                </li>
              </ul>
              
              <Button 
                variant="outline"
                className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01', '_blank')}
              >
                Elegir Plan
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Bottom info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>💳 Aceptamos todas las tarjetas • 🔒 Pago 100% seguro • 🎯 Garantía de satisfacción</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;