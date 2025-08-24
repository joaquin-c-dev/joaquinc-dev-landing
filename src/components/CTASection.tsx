import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle, Code } from "lucide-react";

const CTASection = () => {
  return (
    <section data-section="cta" className="py-24 bg-course-darker relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-tech-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-course-blue/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-card border-primary/20 shadow-glow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-tech-cyan/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-center">
              {/* Reviews */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-muted-foreground">
                  <strong className="text-foreground">Metodología comprobada</strong> en la industria
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                ¿Listo para dar el salto a{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Java Developer?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Te acompaño personalmente en vivo durante tu transformación profesional. 
                Clases online en tiempo real donde mi experiencia de 9+ años en backend 
                es tu garantía de aprendizaje efectivo.
              </p>
              
              {/* Benefits list */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
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
              
              {/* Pricing */}
              <div className="mb-8">
                <div className="text-center">
                  <div className="text-muted-foreground line-through text-2xl mb-2">$8,500 MXN</div>
                  <div className="text-5xl font-bold text-primary mb-2">$6,500 <span className="text-2xl">MXN</span></div>
                  <div className="text-muted-foreground">Oferta por tiempo limitado</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Stripe Buy Button */}
                <div className="stripe-buy-button-container">
                  <stripe-buy-button
                    buy-button-id="buy_btn_1RzR2zAyQjZdu8i7sqQCgWAl"
                    publishable-key="pk_test_51RzQPTAyQjZdu8i70FBAW5kc6JF0KXxpdPq7rO6rQrKPKtpFuuqLHJz6wLvbjQGuNr7fvj8uGd3MIUjaF0bocihO00zOLurAWP"
                  >
                  </stripe-buy-button>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 hover:border-primary/50 text-lg px-12 py-4"
                >
                  <Code className="w-5 h-5 mr-2" />
                  Ver Demo Gratuita
                </Button>
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