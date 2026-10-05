import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import AppShell from "@/components/app/AppShell";
import type { NavCourse } from "@/contexts/CoursesNavContext";
import { PRIVACY_CONTACT, PRIVACY_SECTIONS } from "@/lib/privacy-policy";

interface PrivacyPolicyProps {
  navCourses?: NavCourse[];
  pathname: string;
}

const PrivacyPolicy = ({ navCourses = [], pathname }: PrivacyPolicyProps) => {
  return (
    <AppShell navCourses={navCourses} pathname={pathname}>
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

        {PRIVACY_SECTIONS.map((section, index) => (
          <Card key={section.title} className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">{index + 1}</span>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-muted-foreground leading-relaxed${section.items ? " mb-4" : ""}`}>
                {section.text}
              </p>
              {section.items && (
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">{PRIVACY_SECTIONS.length + 1}</span>
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {PRIVACY_CONTACT.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <Mail className="w-6 h-6 text-primary mr-3" />
                <div>
                  <p className="font-semibold text-foreground">Correo electrónico:</p>
                  <p className="text-muted-foreground">{PRIVACY_CONTACT.email}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <Phone className="w-6 h-6 text-primary mr-3" />
                <div>
                  <p className="font-semibold text-foreground">Teléfono:</p>
                  <p className="text-muted-foreground">{PRIVACY_CONTACT.phone}</p>
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
      <Footer />
    </div>
    </AppShell>
  );
};

export default PrivacyPolicy;