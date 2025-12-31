import { Video, Users, Code, Award, Clock, MessageSquare } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Video,
      title: "Clases 100% en Vivo",
      description: "Aprende en tiempo real con la posibilidad de resolver tus dudas al instante."
    },
    {
      icon: Code,
      title: "Proyectos Reales",
      description: "Construye aplicaciones del mundo real que puedes mostrar en tu portafolio."
    },
    {
      icon: Users,
      title: "Grupos Reducidos",
      description: "Atención personalizada para asegurar que cada estudiante avance correctamente."
    },
    {
      icon: Clock,
      title: "Grabaciones Incluidas",
      description: "Accede a las grabaciones de todas las clases para repasar cuando lo necesites."
    },
    {
      icon: MessageSquare,
      title: "Soporte Directo",
      description: "Resuelve tus dudas por WhatsApp y obtén ayuda cuando la necesites."
    },
    {
      icon: Award,
      title: "Certificado Digital",
      description: "Obtén un certificado que valide tus nuevas habilidades como developer."
    }
  ];

  return (
    <section className="py-20 bg-course-darker relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-15"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-tech-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">¿Por qué </span>
            <span className="bg-gradient-accent bg-clip-text text-transparent">elegirnos?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una experiencia de aprendizaje diseñada para tu éxito profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:bg-card/80"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
