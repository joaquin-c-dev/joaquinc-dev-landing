import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseDiscountBanner from "@/components/course/CourseDiscountBanner";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Code,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { ASSETS } from "@/lib/assets";
import type { Course } from "@/lib/course-types";

const META_ICONS: LucideIcon[] = [Calendar, Clock, MapPin];

interface CourseWorkshopProps {
  course: Course & { workshop: NonNullable<Course["workshop"]> };
}

const CourseWorkshop = ({ course }: CourseWorkshopProps) => {
  const { workshop, hero } = course;

  const handleStripeClick = () => {
    window.open(workshop.stripeUrl, "_blank");
  };

  const handlePayPalClick = () => {
    if (workshop.paypalUrl) {
      window.open(workshop.paypalUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {course.promo && <CourseDiscountBanner promo={course.promo} />}
      <Navigation />

      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Code className="w-4 h-4 mr-2" />
            {workshop.badge}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            {hero.titleLine1}
            {hero.titleHighlight && ` ${hero.titleHighlight}`}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {hero.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {workshop.meta.map((item, index) => {
              const Icon = META_ICONS[index] ?? Calendar;
              return (
                <Card key={item.label} className="border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">¿Qué aprenderás?</h2>
              <div className="space-y-4">
                {workshop.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Inversión del Taller</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {workshop.price}
                    </div>
                    {workshop.priceNote && (
                      <p className="text-sm text-muted-foreground">
                        {workshop.priceNote}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Cupos limitados</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                      <Button
                        onClick={handleStripeClick}
                        size="lg"
                        className="relative bg-gradient-accent text-white text-lg font-semibold py-3 w-full transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30 flex items-center gap-3"
                      >
                        <img
                          src={ASSETS.stripeLogo}
                          alt="Stripe"
                          className="w-6 h-6"
                        />
                        Pagar con Stripe
                      </Button>
                    </div>

                    {workshop.paypalUrl && (
                      <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                        <Button
                          onClick={handlePayPalClick}
                          size="lg"
                          variant="outline"
                          className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold py-3 w-full transition-all duration-300 hover:opacity-90 shadow-elegant border border-blue-500/30 flex items-center gap-3"
                        >
                          <img
                            src={ASSETS.paypalLogo}
                            alt="PayPal"
                            className="w-6 h-6"
                          />
                          Pagar con PayPal
                        </Button>
                      </div>
                    )}
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

      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Detalles del Taller
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Cronograma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workshop.scheduleBlocks.map((block) => (
                  <div key={block.title}>
                    <h4 className="font-semibold">{block.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {block.description}
                    </p>
                  </div>
                ))}
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
                {workshop.requirements.map((req) => (
                  <p key={req} className="text-sm">
                    • {req}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseWorkshop;
