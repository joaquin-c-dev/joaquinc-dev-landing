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
      
      <div className="relative z-10 container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            {/* Mobile: Stack vertically, Desktop: Single line */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
              {/* First line on mobile */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="text-white font-bold text-xs sm:text-sm">
                  🔥 DESCUENTO AGOSTO 2024
                </span>
                <Clock className="w-4 h-4 text-white/90 hidden sm:inline" />
                <span className="text-white/95 font-medium text-xs sm:text-sm hidden sm:inline">¡Solo por tiempo limitado!</span>
              </div>
              
              {/* Second line on mobile, same line on desktop */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="bg-yellow-400/25 px-2 py-1 rounded-full font-bold text-yellow-100 text-xs border border-yellow-400/30">
                  $2,000 MXN OFF
                </span>
                <span className="bg-green-400/25 px-2 py-1 rounded-full font-bold text-green-100 text-xs border border-green-400/30">
                  + 3 MSI
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <div className="relative">
              {/* Subtle animated glow border */}
              <div className="absolute -inset-0.5 bg-gradient-accent rounded-lg blur-sm opacity-60 animate-pulse"></div>
              
              <Button
                onClick={scrollToCTA}
                size="sm"
                className="relative bg-gradient-accent hover:bg-gradient-accent text-white border-0 font-bold text-xs md:text-sm px-4 md:px-5 py-2 md:py-3 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowDown className="w-4 h-4 mr-1 animate-bounce" />
                ¡APROVECHA YA!
              </Button>
            </div>
            
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