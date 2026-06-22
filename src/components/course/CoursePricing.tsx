import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Star, Clock } from "lucide-react";
import { useState } from "react";
import PaymentInfoModal from "@/components/PaymentInfoModal";
import { usePromoCountdown } from "@/contexts/PromoCountdownContext";
import { buildStripeCheckoutUrl } from "@/lib/course-formatters";

interface CoursePricingProps {
  title: string;
  regularPrice: number;
  discountPrice: number;
  stripeUrl?: string;
  stripeCoupon?: string;
  clientReferenceId?: string;
  sectionId?: string;
}

const formatCurrency = (amount: number) =>
  `$${amount.toLocaleString("en-US")}`;

const PRICING_SUBTITLE =
  "Diferentes opciones de pago para que elijas el plan que mejor se adapte a ti";

const RECOMMENDED_MODAL_CONDITIONS = [
  "Aplica el cupón de descuento del curso antes de continuar",
  "Debes ingresar una tarjeta de crédito válida",
  'Selecciona la opción "Pagar en cuotas (meses sin intereses)"',
] as const;

const RECOMMENDED_MODAL_NOTE =
  "Una vez que completes estos pasos, podrás elegir entre 3, 6, 9 o 12 meses sin intereses.";

const CoursePricing = ({
  title,
  regularPrice,
  discountPrice,
  stripeUrl,
  stripeCoupon,
  clientReferenceId,
  sectionId,
}: CoursePricingProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRecommendedModal, setShowRecommendedModal] = useState(false);
  const { timeLeft, formatNumber } = usePromoCountdown();
  const isDiscountActive = !timeLeft.isExpired;
  const checkoutUrl = stripeUrl
    ? buildStripeCheckoutUrl(stripeUrl, stripeCoupon, clientReferenceId)
    : undefined;
  const flexibleCheckoutUrl = stripeUrl
    ? buildStripeCheckoutUrl(stripeUrl, undefined, clientReferenceId)
    : undefined;

  const discountAmount = regularPrice - discountPrice;
  const twoPaymentsDiscount = discountPrice / 2;
  const twoPaymentsFull = regularPrice / 2;
  const monthly12 = Math.round(discountPrice / 12);
  const flexible12 = Math.round(regularPrice / 12);
  const flexible18 = Math.round(regularPrice / 18);
  const flexible24 = Math.round(regularPrice / 24);

  const discountRibbonLabel =
    discountAmount >= 1000
      ? `$${Math.round(discountAmount / 1000)}K + 12MSI`
      : `${formatCurrency(discountAmount)} + 12MSI`;

  const whatsappNoCardMessage = (firstPayment: number) =>
    encodeURIComponent(
      `Hola, me interesa el plan sin tarjeta del curso de ${title}. Por favor envíame los datos bancarios para realizar la transferencia del primer pago de ${formatCurrency(firstPayment)} MXN.`,
    );

  const handleFlexibilityPlusClick = () => {
    setShowPaymentModal(true);
  };

  const handleRecommendedClick = () => {
    setShowRecommendedModal(true);
  };

  const handleContinueToPayment = () => {
    setShowPaymentModal(false);
    if (flexibleCheckoutUrl) window.open(flexibleCheckoutUrl, "_blank");
  };

  const handleContinueToRecommendedPayment = () => {
    setShowRecommendedModal(false);
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  };

  const countdownBlock = (
    <div className="mt-3 mb-1 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
      <div className="text-xs text-orange-400 font-medium mb-1">
        ⏰ Descuento termina en:
      </div>
      <div className="flex justify-center gap-1 text-xs">
        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
          {formatNumber(timeLeft.days)}d
        </div>
        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
          {formatNumber(timeLeft.hours)}h
        </div>
        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
          {formatNumber(timeLeft.minutes)}m
        </div>
        <div className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-300 font-mono">
          {formatNumber(timeLeft.seconds)}s
        </div>
      </div>
    </div>
  );

  return (
    <section
      data-section={sectionId ?? "pricing"}
      className="py-16 bg-course-darker relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Elige el{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Plan Perfecto
            </span>{" "}
            para Ti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {PRICING_SUBTITLE}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
            {isDiscountActive && (
              <div className="absolute top-0 left-0 w-32 h-16 overflow-hidden z-10">
                <div className="bg-red-600 text-white px-8 py-1.5 text-xs font-bold transform -rotate-45 absolute -left-8 top-4 shadow-xl border border-red-700">
                  {formatCurrency(discountAmount)} OFF
                </div>
              </div>
            )}

            <div className="text-center flex-grow flex flex-col pt-2">
              <div className="mb-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-tech-cyan" />
                <h3 className="text-xl font-bold text-foreground">Sin tarjeta</h3>
                <p className="text-sm text-muted-foreground">Dos pagos cómodos</p>
              </div>

              <div className="mb-6">
                {isDiscountActive ? (
                  <>
                    <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground/60 line-through">
                        {formatCurrency(regularPrice)}
                      </span>
                      {formatCurrency(discountPrice)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        MXN
                      </span>
                    </div>
                    <div className="text-sm text-green-400 mb-1">
                      Ahorras {formatCurrency(discountAmount)}
                    </div>
                    <div className="text-xl font-semibold text-white mb-1">
                      {formatCurrency(twoPaymentsDiscount)} x 2 pagos
                    </div>
                    {countdownBlock}
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(regularPrice)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        MXN
                      </span>
                    </div>
                    <div className="text-xl font-semibold text-white mb-1">
                      {formatCurrency(twoPaymentsFull)} x 2 pagos
                    </div>
                  </>
                )}
              </div>

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
                  const message = whatsappNoCardMessage(
                    isDiscountActive ? twoPaymentsDiscount : twoPaymentsFull,
                  );
                  window.open(
                    `https://wa.me/5213331071527?text=${message}`,
                    "_blank",
                  );
                }}
              >
                Hacer pago sin tarjeta
              </Button>
            </div>
          </Card>

          {isDiscountActive ? (
            <Card className="relative p-6 bg-gradient-card border-2 border-primary shadow-glow-lg hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3" />
                  MÁS ELEGIDO
                </div>
              </div>

              <div className="absolute top-0 left-0 w-32 h-16 overflow-hidden z-10">
                <div className="bg-red-600 text-white px-4 py-1.5 text-xs font-bold transform -rotate-45 absolute -left-6 top-4 shadow-xl border border-red-700">
                  {discountRibbonLabel}
                </div>
              </div>

              <div className="text-center flex-grow flex flex-col pt-6">
                <div className="mb-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Preferente</h3>
                  <p className="text-sm text-muted-foreground">
                    Hasta 12 meses sin intereses
                  </p>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground/60 line-through">
                      {formatCurrency(regularPrice)}
                    </span>
                    {formatCurrency(discountPrice)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      MXN
                    </span>
                  </div>
                  <div className="text-sm text-green-400 mb-1">
                    Ahorras {formatCurrency(discountAmount)}
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Desde {formatCurrency(monthly12)} / mes x 12 meses
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Sin intereses con tarjeta
                  </div>
                  {countdownBlock}
                </div>

                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Hasta 12 meses sin intereses
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Acceso completo al curso
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Grabaciones incluidas
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Material bibliográfico
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Código del proyecto final
                    </span>
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
            <Card className="relative p-6 bg-gradient-card border-2 border-primary shadow-glow-lg hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
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
                  <p className="text-sm text-muted-foreground">
                    Hasta 24 meses{" "}
                    <span className="text-muted-foreground">sin intereses</span>
                  </p>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(regularPrice)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      MXN
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Desde {formatCurrency(flexible24)} / mes
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      12 MSI: {formatCurrency(flexible12)}/mes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      18 MSI: {formatCurrency(flexible18)}/mes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      24 MSI: {formatCurrency(flexible24)}/mes
                    </span>
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

          {isDiscountActive ? (
            <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              <div className="text-center flex-grow flex flex-col">
                <div className="mb-4">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-tech-purple" />
                  <h3 className="text-xl font-bold text-foreground">Flexible</h3>
                  <p className="text-sm text-muted-foreground">
                    Hasta 24 meses{" "}
                    <span className="text-muted-foreground">sin intereses</span>
                  </p>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(regularPrice)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      MXN
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Desde {formatCurrency(flexible24)} / mes
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      12 MSI: {formatCurrency(flexible12)}/mes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      18 MSI: {formatCurrency(flexible18)}/mes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      24 MSI: {formatCurrency(flexible24)}/mes
                    </span>
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
            <Card className="relative p-6 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full flex flex-col">
              <div className="text-center flex-grow flex flex-col">
                <div className="mb-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Preferente</h3>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(regularPrice)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      MXN
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    Precio completo
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-left flex-grow">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Acceso completo al curso
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Grabaciones incluidas
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Material bibliográfico
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Código del proyecto final
                    </span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary mt-auto"
                  onClick={() => checkoutUrl && window.open(checkoutUrl, "_blank")}
                >
                  Hacer pago preferente
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            💳 Aceptamos todas las tarjetas • 🔒 Pago 100% seguro • 🎯 Garantía
            de satisfacción
          </p>
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
        conditions={[...RECOMMENDED_MODAL_CONDITIONS]}
        note={RECOMMENDED_MODAL_NOTE}
      />
    </section>
  );
};

export default CoursePricing;
