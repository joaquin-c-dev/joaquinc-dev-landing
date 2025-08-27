import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Zap, ArrowDown } from "lucide-react";

const DiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('section[data-section="cta"]');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dismissBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-primary overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-accent opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-tech-cyan/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-course-blue/30 rounded-full blur-xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white font-bold text-sm md:text-lg">
                🔥 DESCUENTO DE LANZAMIENTO AGOSTO 2024
              </span>
              <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 text-white/90 text-xs md:text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">¡Solo por tiempo limitado este mes!</span>
              <span className="bg-white/20 px-2 py-1 rounded-full font-bold">
                $2,000 MXN de descuento
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button
              onClick={scrollToCTA}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 font-semibold shadow-glow text-xs md:text-sm px-3 md:px-4"
            >
              <ArrowDown className="w-4 h-4 mr-1" />
              ¡Aprovecha Ya!
            </Button>
            
            <Button
              onClick={dismissBanner}
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 p-1 min-w-[32px]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
};

export default DiscountBanner;