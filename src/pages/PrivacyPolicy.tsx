import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Mail, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta tags would be handled by a head component if available */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Políticas de Privacidad</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Para Cursos de Programación
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">1</span>
              Introducción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Nos comprometemos a proteger la privacidad de nuestros estudiantes y a garantizar que su información personal sea tratada de manera segura y responsable. Esta política de privacidad describe cómo recopilamos, usamos y protegemos la información que obtenemos de nuestros estudiantes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">2</span>
              Información que recopilamos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Recopilamos información personal que nos proporcionas al registrarte para nuestros cursos, que puede incluir:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Nombre</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información de pago (si aplica)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">3</span>
              Uso de la información
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Proporcionar acceso a nuestros cursos y materiales de aprendizaje.</li>
              <li>Enviar confirmaciones de registro y detalles sobre el curso.</li>
              <li>Comunicarte sobre futuras ofertas y eventos relacionados con nuestros cursos.</li>
              <li>Mejorar nuestros servicios y la experiencia del estudiante.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">4</span>
              Compartir información
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              No compartimos tu información personal con terceros, excepto en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio (por ejemplo, procesadores de pagos).</li>
              <li>Cuando sea requerido por la ley o para proteger nuestros derechos.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">5</span>
              Seguridad de la información
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad adecuadas para proteger tu información personal contra el acceso no autorizado, la divulgación, la alteración o la destrucción.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">6</span>
              Derechos del usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Si deseas ejercer estos derechos, contáctanos a través de la información proporcionada al final de esta política.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">7</span>
              Cambios en la política de privacidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cualquier cambio significativo a través de tu correo electrónico o mediante un aviso en nuestro sitio web.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">8</span>
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Si tienes preguntas o inquietudes sobre nuestras políticas de privacidad, no dudes en contactarnos a través de:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <Mail className="w-6 h-6 text-primary mr-3" />
                <div>
                  <p className="font-semibold text-foreground">Correo electrónico:</p>
                  <p className="text-muted-foreground">joaquincorram@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <Phone className="w-6 h-6 text-primary mr-3" />
                <div>
                  <p className="font-semibold text-foreground">Teléfono:</p>
                  <p className="text-muted-foreground">3310881011</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;