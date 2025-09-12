import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Star, Clock } from "lucide-react";
import { useState } from "react";
import PaymentInfoModal from "./PaymentInfoModal";
import { useCountdown } from "@/contexts/CountdownContext";

const PricingSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRecommendedModal, setShowRecommendedModal] = useState(false);
  const { timeLeft } = useCountdown();
  const isDiscountActive = !timeLeft.isExpired;

  const handleFlexibilityPlusClick = () => {
    setShowPaymentModal(true);
  };

  const handleRecommendedClick = () => {
    setShowRecommendedModal(true);
  };

  const handleContinueToPayment = () => {
    setShowPaymentModal(false);
    window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01', '_blank');
  };

  const handleContinueToRecommendedPayment = () => {
    setShowRecommendedModal(false);
    window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank');
  };

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
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Plan 1 - Dos Pagos */}
          <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
            <div className="text-center flex-grow flex flex-col">
              <div className="mb-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-tech-cyan" />
                <h3 className="text-xl font-bold text-foreground">Sin tarjeta</h3>
                <p className="text-sm text-muted-foreground">Dos pagos cómodos</p>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {isDiscountActive ? (
                  <>
                    <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground/60 line-through">$8,500</span>
                      $6,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                    </div>
                    <div className="text-sm text-green-400 mb-1">Ahorras $2,000</div>
                    <div className="text-xl font-semibold text-white mb-1">
                      $3,250 x 2 pagos
                    </div>
                    
                    {/* Countdown Timer */}
                    <div className="mt-3 mb-1 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <div className="text-xs text-orange-400 font-medium mb-1">⏰ Descuento termina en:</div>
                      <div className="flex justify-center gap-1 text-xs">
                        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                          {timeLeft.days.toString().padStart(2, '0')}d
                        </div>
                        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                          {timeLeft.hours.toString().padStart(2, '0')}h
                        </div>
                        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                          {timeLeft.minutes.toString().padStart(2, '0')}m
                        </div>
                        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                          {timeLeft.seconds.toString().padStart(2, '0')}s
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white mb-1">
                      $8,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                    </div>
                    <div className="text-xl font-semibold text-white mb-1">
                      $4,250 x 2 pagos
                    </div>
                  </>
                )}
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-6 text-left flex-grow">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">50% ahora, 50% al iniciar</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">No necesitas tarjeta de crédito</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Acceso completo al curso</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Grabaciones incluidas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Material bibliográfico</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Código del proyecto final</span>
                </li>
              </ul>
              
              <Button 
                variant="outline"
                className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary mt-auto"
                onClick={() => {
                  const message = isDiscountActive 
                    ? 'Hola%2C%20me%20interesa%20el%20plan%20sin%20tarjeta%20del%20curso%20de%20Java.%20Por%20favor%20envíame%20los%20datos%20bancarios%20para%20realizar%20la%20transferencia%20del%20primer%20pago%20de%20%243%2C250%20MXN.'
                    : 'Hola%2C%20me%20interesa%20el%20plan%20sin%20tarjeta%20del%20curso%20de%20Java.%20Por%20favor%20envíame%20los%20datos%20bancarios%20para%20realizar%20la%20transferencia%20del%20primer%20pago%20de%20%244%2C250%20MXN.';
                  window.open(`https://wa.me/523310881011?text=${message}`, '_blank');
                }}
              >
                Hacer pago sin tarjeta
              </Button>
            </div>
          </Card>

          {/* Center plan changes based on promotion */}
          {isDiscountActive ? (
            // Plan 2 - Destacado (Centro) when promotion is active
            <Card className="relative p-6 bg-gradient-card border-2 border-primary shadow-glow-lg hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              {/* Most popular badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  MÁS ELEGIDO
                </div>
              </div>
              
              <div className="text-center flex-grow flex flex-col">
                <div className="mb-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Preferente</h3>
                  <p className="text-sm text-muted-foreground">3 meses sin intereses</p>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground/60 line-through">$8,500</span>
                    $6,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                  </div>
                  <div className="text-sm text-green-400 mb-1">Ahorras $2,000</div>
                  <div className="text-xl font-semibold text-white mb-1">
                    $2,167 / mes x 3 meses
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">Sin intereses con tarjeta</div>
                  
                  {/* Countdown Timer */}
                  <div className="mt-3 mb-1 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="text-xs text-orange-400 font-medium mb-1">⏰ Descuento termina en:</div>
                    <div className="flex justify-center gap-1 text-xs">
                      <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                        {timeLeft.days.toString().padStart(2, '0')}d
                      </div>
                      <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                        {timeLeft.hours.toString().padStart(2, '0')}h
                      </div>
                      <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                        {timeLeft.minutes.toString().padStart(2, '0')}m
                      </div>
                      <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
                        {timeLeft.seconds.toString().padStart(2, '0')}s
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">3 meses sin intereses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Acceso completo al curso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Grabaciones incluidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Material bibliográfico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Código del proyecto final</span>
                  </li>
                </ul>
                
                <Button 
                  className="w-full bg-gradient-accent hover:opacity-90 text-white font-bold mt-auto transition-all duration-300"
                  onClick={handleRecommendedClick}
                >
                  🔥 Hacer pago preferente
                </Button>
              </div>
            </Card>
          ) : (
            // Plan Flexible in center when promotion expires
            <Card className="relative p-6 bg-gradient-card border-2 border-primary shadow-glow-lg hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              {/* Most popular badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  MÁS ELEGIDO
                </div>
              </div>
              
              <div className="text-center flex-grow flex flex-col">
                <div className="mb-4">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-tech-purple" />
                  <h3 className="text-xl font-bold text-foreground">Flexible</h3>
                  <p className="text-sm text-muted-foreground">Hasta 12 meses <span className="text-muted-foreground">sin intereses</span></p>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1">
                    $8,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Desde $708 / mes
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">6 MSI: $1,417/mes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">9 MSI: $944/mes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">12 MSI: $708/mes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Acceso completo al curso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Grabaciones incluidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Material bibliográfico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Código del proyecto final</span>
                  </li>
                </ul>
                
                <Button 
                  className="w-full bg-gradient-accent hover:opacity-90 text-white font-bold mt-auto transition-all duration-300"
                  onClick={handleFlexibilityPlusClick}
                >
                  🔥 Hacer pago Flexible
                </Button>
              </div>
            </Card>
          )}

          {/* Right plan changes based on promotion */}
          {isDiscountActive ? (
            // Plan 3 - Flexible (Right) when promotion is active
            <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              <div className="text-center flex-grow flex flex-col">
                <div className="mb-4">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-tech-purple" />
                  <h3 className="text-xl font-bold text-foreground">Flexible</h3>
                  <p className="text-sm text-muted-foreground">Hasta 12 meses <span className="text-muted-foreground">sin intereses</span></p>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1">
                    $8,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Desde $708 / mes
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">6 MSI: $1,417/mes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">9 MSI: $944/mes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">12 MSI: $708/mes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Acceso completo al curso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Grabaciones incluidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Material bibliográfico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Código del proyecto final</span>
                  </li>
                </ul>
                
                <Button 
                  variant="outline"
                  className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary mt-auto"
                  onClick={handleFlexibilityPlusClick}
                >
                  Hacer pago Flexible
                </Button>
              </div>
            </Card>
          ) : (
            // Plan Preferente (Right) when promotion expires
            <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              <div className="text-center flex-grow flex flex-col">
                <div className="mb-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Preferente</h3>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1">
                    $8,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Precio completo
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Acceso completo al curso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Grabaciones incluidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Material bibliográfico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Código del proyecto final</span>
                  </li>
                </ul>
                
                <Button 
                  variant="outline"
                  className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary mt-auto"
                  onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01', '_blank')}
                >
                  Hacer pago preferente
                </Button>
              </div>
            </Card>
          )}
        </div>
        
        {/* Bottom info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>💳 Aceptamos todas las tarjetas • 🔒 Pago 100% seguro • 🎯 Garantía de satisfacción</p>
        </div>
      </div>

      <PaymentInfoModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onContinue={handleContinueToPayment}
      />

      <PaymentInfoModal 
        isOpen={showRecommendedModal}
        onClose={() => setShowRecommendedModal(false)}
        onContinue={handleContinueToRecommendedPayment}
        imageUrl="/lovable-uploads/7b90d68c-d7a3-401a-85e0-61c099402133.png"
        title="Información Importante - Plan Recomendado"
        conditions={[
          "El cupón LANZAMIENTO debe estar activo",
          "Debes ingresar una tarjeta de crédito válida",
          "Da clic en la opción \"Pagar en cuotas (meses sin intereses)\""
        ]}
        note="Solo tienes la opción de 3 meses habilitada con este plan."
      />
    </section>
  );
};

export default PricingSection;