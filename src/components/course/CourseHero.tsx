import { Button } from "@/components/ui/button";
import { Code, Zap } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import type { CourseHeroData } from "@/lib/course-types";

interface CourseHeroProps {
  hero: CourseHeroData;
}

const CourseHero = ({ hero }: CourseHeroProps) => {
  const layout = hero.layout ?? "two-column";
  const isCentered = layout === "centered";

  const handleSecondary = () => {
    if (hero.secondaryCta?.scrollTo) {
      const el = document.querySelector(
        `[data-section="${hero.secondaryCta.scrollTo}"]`,
      );
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (hero.secondaryCta?.href) {
      window.location.assign(hero.secondaryCta.href);
    }
  };

  return (
    <section
      data-section="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-32 md:pt-36 lg:pt-20 pb-20"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-course-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16 flex items-center justify-center w-full">
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={
              isCentered
                ? "flex flex-col items-center justify-center"
                : "grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            }
          >
            {hero.video && !isCentered && (
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="relative group w-full max-w-md md:max-w-lg lg:max-w-xl">
                  <div className="absolute -inset-2 bg-gradient-accent rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative bg-card/50 backdrop-blur-md border border-primary/20 rounded-2xl p-2 md:p-3 shadow-xl">
                    <video
                      className="w-full rounded-xl shadow-lg"
                      controls
                      autoPlay
                      muted
                      playsInline
                      poster={hero.video.poster}
                      preload="metadata"
                    >
                      <source src={hero.video.src} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`space-y-4 md:space-y-6 lg:space-y-8 ${
                isCentered
                  ? "text-center max-w-2xl"
                  : "text-center lg:text-left order-1 lg:order-2"
              }`}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <div>
                  {hero.titleLine1}{" "}
                  {hero.titleHighlight && (
                    <span className="bg-gradient-accent bg-clip-text text-transparent">
                      {hero.titleHighlight}
                    </span>
                  )}
                </div>
                {hero.titleLine2 && <div>{hero.titleLine2}</div>}
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground/90 leading-relaxed">
                {hero.description}
              </p>

              <div
                className={`flex items-center gap-3 opacity-70 ${
                  isCentered ? "justify-center" : "justify-center lg:justify-start"
                }`}
              >
                <img
                  src={ASSETS.joaquinProfile}
                  alt="Joaquín Coronado Ramírez"
                  className="w-8 h-8 rounded-full object-cover border border-primary/20"
                />
                <div className="text-sm text-muted-foreground/80">
                  Con{" "}
                  <span className="text-primary font-medium">
                    Joaquín Coronado
                  </span>{" "}
                  • Head of Backend
                </div>
              </div>

              <div
                className={`flex flex-col sm:flex-row gap-4 ${
                  isCentered ? "justify-center" : "justify-center lg:justify-start"
                }`}
              >
                {hero.stripeUrl && (
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    <Button
                      size="lg"
                      className="relative bg-gradient-accent text-white text-base px-6 py-3 transition-all duration-300 hover:opacity-90 shadow-elegant border border-primary/30 min-w-[180px] h-[48px]"
                      onClick={() => window.open(hero.stripeUrl!, "_blank")}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Inscribirme Ahora
                    </Button>
                  </div>
                )}
                {hero.secondaryCta && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:border-primary/50 text-base px-6 py-3 hover:bg-primary/5 hover:text-primary min-w-[180px] h-[48px]"
                    onClick={handleSecondary}
                  >
                    <Code className="w-5 h-5 mr-2" />
                    {hero.secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
