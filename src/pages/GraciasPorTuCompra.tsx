import { CheckCircle, Mail, Calendar } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const GraciasPorTuCompra = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ¡Gracias por tu compra!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12">
            Tu inscripción ha sido procesada exitosamente. Estamos emocionados de tenerte en el curso.
          </p>

          <Card className="mb-8 bg-card border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-left">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Revisa tu correo electrónico
                    </h3>
                    <p className="text-muted-foreground">
                      Te hemos enviado un email con todos los detalles del curso, instrucciones de acceso y los próximos pasos a seguir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Prepárate para empezar
                    </h3>
                    <p className="text-muted-foreground">
                      Te contactaremos antes de la fecha de inicio para darte acceso a todos los materiales del curso y al grupo de estudiantes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="text-base"
            >
              Volver al inicio
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/temario")}
              className="text-base"
            >
              Ver temario del curso
            </Button>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            ¿Tienes alguna pregunta? Contáctanos por WhatsApp y te responderemos lo antes posible.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GraciasPorTuCompra;
