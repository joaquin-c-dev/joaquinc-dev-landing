import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Zap, ArrowDown } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

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
      
      <div className="relative z-10 container mx-auto px-4 py-3">
        {/* Mobile: Clean vertical stack, Desktop: Horizontal layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
          
          {/* Content section - better organized for mobile */}
          <div className="flex-1 text-center sm:text-left">
            
            {/* Title - simplified for mobile */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-1">
              <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-white font-bold text-sm sm:text-base">
                🔥 OFERTA ESPECIAL
              </span>
            </div>
            
            {/* Discount badges - stacked better on mobile */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-1">
              <span className="bg-yellow-400/25 px-3 py-1 rounded-full font-bold text-yellow-100 text-xs sm:text-sm border border-yellow-400/30">
                $2,000 OFF
              </span>
              <span className="bg-green-400/25 px-3 py-1 rounded-full font-bold text-green-100 text-xs sm:text-sm border border-green-400/30">
                3 MSI
              </span>
            </div>
            
            {/* Countdown - more prominent on mobile */}
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Clock className="w-4 h-4 text-yellow-200" />
              <span className="text-yellow-200 font-medium text-xs sm:text-sm">Termina en:</span>
              <CountdownTimer className="text-sm font-bold" textColor="text-yellow-200" />
            </div>
          </div>
          
          {/* Action button - more prominent on mobile */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-accent rounded-lg blur-sm opacity-70 animate-pulse"></div>
              <Button
                onClick={scrollToCTA}
                size="default"
                className="relative bg-white hover:bg-white/95 text-primary border-0 font-bold text-sm px-6 py-3 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowDown className="w-4 h-4 mr-2 animate-bounce" />
                ¡INSCRIBIRME YA!
              </Button>
            </div>
            
            <Button
              onClick={dismissBanner}
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 ml-2"
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