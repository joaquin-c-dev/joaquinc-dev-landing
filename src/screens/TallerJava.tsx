import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DiscountBanner from "@/components/DiscountBanner";
import { Calendar, Clock, MapPin, Users, Code, CheckCircle } from "lucide-react";
import stripeLogo from "@/assets/stripe-logo.png";
import paypalLogo from "@/assets/paypal-logo.png";
import AppShell from "@/components/app/AppShell";
import type { Course } from "@/lib/courses";

interface TallerJavaProps {
  course?: Course;
}

const TallerJava = ({ course }: TallerJavaProps = {}) => {
  const handleStripeClick = () => {
    window.open(
      course?.stripeUrl ?? "https://buy.stripe.com/9B69AV1mmfpF8Rj32Ib3q03",
      "_blank",
    );
  };

  const handlePayPalClick = () => {
    window.open('https://www.paypal.com/ncp/payment/LFGU5H9MSVG2A', '_blank');
  };

  const features = [
    "Conceptos fundamentales de POO",
    "Clases y objetos en Java",
    "Herencia y polimorfismo",
    "Encapsulamiento y abstracción",
    "Ejercicios prácticos",
    "Proyecto final integrador"
  ];

  return (
    <AppShell>
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Code className="w-4 h-4 mr-2" />
            Taller Especializado
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            Taller de POO
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Domina los conceptos fundamentales de la POO y aprende a aplicarlos eficientemente en Java. 
            Un taller intensivo diseñado para llevarte al siguiente nivel.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Fechas</h3>
                <p className="text-sm text-muted-foreground">11 y 18 de Octubre</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Horario</h3>
                <p className="text-sm text-muted-foreground">9:00 AM - 2:00 PM</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Modalidad</h3>
                <p className="text-sm text-muted-foreground">En línea</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* What you'll learn */}
            <div>
              <h2 className="text-3xl font-bold mb-6">¿Qué aprenderás?</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card */}
            <div>
              <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Inversión del Taller</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      $340.00 MXN
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pago único • Incluye material del taller
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Cupos limitados</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      <span>Inicia: 11 de Octubre</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <Button 
                        onClick={handleStripeClick}
                        size="lg" 
                        className="relative bg-gradient-accent text-white text-lg font-semibold py-3 w-full transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30 flex items-center gap-3"
                      >
                        <img src={stripeLogo} alt="Stripe" className="w-6 h-6" />
                        Pagar con Stripe
                      </Button>
                    </div>
                    
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <Button 
                        onClick={handlePayPalClick}
                        size="lg" 
                        variant="outline"
                        className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold py-3 w-full transition-all duration-300 hover:opacity-90 shadow-elegant border border-blue-500/30 flex items-center gap-3"
                      >
                        <img src={paypalLogo} alt="PayPal" className="w-6 h-6" />
                        Pagar con PayPal
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Pago seguro • Elige tu método de pago preferido
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Detalles del Taller</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Cronograma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Sábado 11 de Octubre</h4>
                  <p className="text-sm text-muted-foreground">
                    Fundamentos de POO, clases y objetos, encapsulamiento
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Sábado 18 de Octubre</h4>
                  <p className="text-sm text-muted-foreground">
                    Herencia, polimorfismo, abstracción y ejercicios finales
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Requisitos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Conocimientos básicos de Java</p>
                <p className="text-sm">• IDE instalado (Eclipse o IntelliJ)</p>
                <p className="text-sm">• Conexión estable a internet</p>
                <p className="text-sm">• Ganas de aprender 🚀</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </AppShell>
  );
};

export default TallerJava;