import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Zap, CalendarDays, Timer } from "lucide-react";

const ProximosIniciosSection = () => {
  const courses = [
    {
      id: 1,
      modalidad: "Sabatina",
      duracion: "40 horas",
      horario: "9:00 AM - 2:00 PM",
      inicio: "1 de Noviembre",
      fin: "20 de Diciembre",
      dias: "Sábados",
      tipo: "weekend",
      popular: false
    },
    {
      id: 2,
      modalidad: "Entre Semana",
      duracion: "40 horas", 
      horario: "8:00 PM - 10:00 PM",
      inicio: "3 de Noviembre",
      fin: "4 de Diciembre",
      dias: "Lunes a Jueves",
      tipo: "weekday",
      popular: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-course-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-tech-cyan/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
              Próximos Inicios
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Elige tu{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Modalidad
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dos opciones de horarios diseñadas para adaptarse a tu estilo de vida. 
            Ambas modalidades incluyen el mismo contenido completo y soporte personalizado.
          </p>
        </div>

        {/* Course Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course) => (
            <Card 
              key={course.id}
              className={`relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                course.popular ? 'border-primary/50 ring-2 ring-primary/20' : 'border-border/50'
              }`}
            >
              {course.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-accent text-white px-4 py-1">
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-lg shadow-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    course.tipo === 'weekend' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-primary'
                  }`}>
                    {course.tipo === 'weekend' ? (
                      <CalendarDays className="w-6 h-6 text-white" />
                    ) : (
                      <Timer className="w-6 h-6 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-primary">{course.modalidad}</CardTitle>
                    <p className="text-muted-foreground text-sm">{course.dias}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Course Details */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{course.horario}</p>
                      <p className="text-sm text-muted-foreground">{course.duracion} totales</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Inicia: {course.inicio}</p>
                      <p className="text-sm text-muted-foreground">Termina: {course.fin}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold mb-3 text-primary">Incluye:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>40 horas de contenido en vivo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Grabaciones de todas las clases</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Soporte personalizado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Certificado de finalización</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <div className="group/btn relative">
                    <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover/btn:opacity-50 transition-opacity duration-500"></div>
                    <Button 
                      className="relative w-full bg-gradient-accent text-white hover:opacity-90 transition-all duration-300 shadow-elegant"
                      onClick={() => window.open('https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO', '_blank')}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Inscribirme a esta modalidad
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="p-6 bg-gradient-card border-primary/20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Grupos Reducidos</h3>
            </div>
            <p className="text-muted-foreground">
              Máximo 15 estudiantes por grupo para garantizar atención personalizada. 
              Las plazas son limitadas - ¡asegura tu lugar hoy!
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProximosIniciosSection;