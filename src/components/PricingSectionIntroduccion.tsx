import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Star, Clock } from "lucide-react";
import { useState } from "react";
import PaymentInfoModal from "./PaymentInfoModal";
import { useCountdownIntroduccion } from "@/contexts/CountdownIntroduccionContext";

const PricingSectionIntroduccion = () => {
  const { timeLeft } = useCountdownIntroduccion();
  const isDiscountActive = !timeLeft.isExpired;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRecommendedModal, setShowRecommendedModal] = useState(false);

  const handleFlexibilityPlusClick = () => {
    setShowPaymentModal(true);
  };

  const handleRecommendedClick = () => {
    setShowRecommendedModal(true);
  };

  const handleContinueToPayment = () => {
    setShowPaymentModal(false);
    window.open("https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04", "_blank");
  };

  const handleContinueToRecommendedPayment = () => {
    setShowRecommendedModal(false);
    window.open("https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04?prefilled_promo_code=INTRO", "_blank");
  };

  return (
    <section
      data-section="pricing"
      className="py-16 bg-course-darker relative overflow-hidden min-h-screen flex items-center"
    >
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
            Diferentes opciones de pago para que puedas comenzar tu camino en la programación
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Plan 1 - Dos Pagos */}
          <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
            {/* Discount Ribbon Container - Only show when discount is active */}
            {isDiscountActive && (
              <div className="absolute top-0 left-0 w-32 h-16 overflow-hidden z-10">
                <div className="bg-red-600 text-white px-8 py-1.5 text-xs font-bold transform -rotate-45 absolute -left-8 top-4 shadow-xl border border-red-700">
                  $2,000 OFF
                </div>
              </div>
            )}

            <div className="text-center flex-grow flex flex-col pt-2">
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
                      <span className="text-sm text-muted-foreground/60 line-through">$6,500</span>
                      $4,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                    </div>
                    <div className="text-sm text-green-400 mb-1">Ahorras $2,000</div>
                    <div className="text-xl font-semibold text-white mb-1">$2,250 x 2 pagos</div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white mb-1">
                      $6,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                    </div>
                    <div className="text-xl font-semibold text-white mb-1">$3,250 x 2 pagos</div>
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
                  <span className="text-sm">Ejercicios prácticos</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary mt-auto"
                onClick={() => {
                  const price = isDiscountActive ? "$2,250" : "$3,250";
                  const message = `Hola%2C%20me%20interesa%20el%20plan%20sin%20tarjeta%20del%20curso%20de%20Introducción%20a%20la%20Programación.%20Por%20favor%20envíame%20los%20datos%20bancarios%20para%20realizar%20la%20transferencia%20del%20primer%20pago%20de%20${price}%20MXN.`;
                  window.open(`https://wa.me/5213331071527?text=${message}`, "_blank");
                }}
              >
                Hacer pago sin tarjeta
              </Button>
            </div>
          </Card>

          {/* Plan 2 - Destacado (Centro) */}
          <Card className="relative p-6 bg-gradient-card border-2 border-primary shadow-glow-lg hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
            {/* Most popular badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3" />
                MÁS ELEGIDO
              </div>
            </div>

            {/* Discount Ribbon Container - Only show when discount is active */}
            {isDiscountActive && (
              <div className="absolute top-0 left-0 w-32 h-16 overflow-hidden z-10">
                <div className="bg-red-600 text-white px-8 py-1.5 text-xs font-bold transform -rotate-45 absolute -left-8 top-4 shadow-xl border border-red-700">
                  $2,000 OFF
                </div>
              </div>
            )}

            <div className="text-center flex-grow flex flex-col pt-6">
              <div className="mb-4">
                <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Preferente</h3>
                <p className="text-sm text-muted-foreground">
                  {isDiscountActive ? "Pago único con descuento" : "Hasta 12 meses sin intereses"}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {isDiscountActive ? (
                  <>
                    <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground/60 line-through">$6,500</span>
                      $4,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                    </div>
                    <div className="text-sm text-green-400 mb-1">Ahorras $2,000</div>
                    <div className="text-sm text-muted-foreground mb-1">Un solo pago con tarjeta</div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white mb-1">
                      $6,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                    </div>
                    <div className="text-xl font-semibold text-white mb-1">Desde $541 / mes</div>
                  </>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 text-left flex-grow">
                {isDiscountActive ? (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">Pago único con descuento</span>
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
                      <span className="text-sm text-foreground">Ejercicios prácticos</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">6 MSI: $1,083/mes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">9 MSI: $722/mes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">12 MSI: $541/mes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Acceso completo al curso</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Grabaciones incluidas</span>
                    </li>
                  </>
                )}
              </ul>

              <Button
                className="w-full bg-gradient-accent hover:opacity-90 text-white font-bold mt-auto transition-all duration-300"
                onClick={isDiscountActive ? handleRecommendedClick : handleFlexibilityPlusClick}
              >
                {isDiscountActive ? "🔥 Hacer pago preferente" : "Hacer pago Preferente"}
              </Button>
            </div>
          </Card>

          {/* Plan 3 - Flexible */}
          <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
            <div className="text-center flex-grow flex flex-col">
              <div className="mb-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-tech-purple" />
                <h3 className="text-xl font-bold text-foreground">Flexible</h3>
                <p className="text-sm text-muted-foreground">
                  Hasta 24 meses <span className="text-muted-foreground">sin intereses</span>
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-2xl font-bold text-white mb-1">
                  $6,500 <span className="text-sm font-normal text-muted-foreground">MXN</span>
                </div>
                <div className="text-xl font-semibold text-white mb-1">Desde $270 / mes</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 text-left flex-grow">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">12 MSI: $541/mes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">18 MSI: $361/mes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">24 MSI: $270/mes</span>
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
                  <span className="text-sm">Ejercicios prácticos</span>
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
        </div>
      </div>

      {/* Payment Modal for Flexible */}
      <PaymentInfoModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onContinue={handleContinueToPayment}
      />

      {/* Payment Modal for Recommended */}
      <PaymentInfoModal
        isOpen={showRecommendedModal}
        onClose={() => setShowRecommendedModal(false)}
        onContinue={handleContinueToRecommendedPayment}
      />
    </section>
  );
};

export default PricingSectionIntroduccion;