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
      
      <div className="relative z-10 container mx-auto px-4 py-2">
        {/* Mobile: Two lines, Tablet+: Single line */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          
          {/* Main content section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1">
            
            {/* First line: Offers and button (mobile) / All content (desktop) */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-3 flex-1 sm:flex-initial">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm flex-shrink-0">🔥</span>
                <span className="hidden sm:inline text-white font-medium text-sm mr-2">Lanzamiento Septiembre:</span>
                <span className="bg-yellow-400/25 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-bold text-yellow-100 text-xs border border-yellow-400/30 flex-shrink-0">
                  $2K OFF
                </span>
                <span className="bg-green-400/25 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-bold text-green-100 text-xs border border-green-400/30 flex-shrink-0">
                  3 MSI
                </span>
              </div>
              
              {/* Button - visible on mobile in first line, hidden on desktop (shown in separate section) */}
              <div className="flex items-center gap-1 sm:hidden flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-accent rounded-md blur-sm opacity-70 animate-pulse"></div>
                  <Button
                    onClick={scrollToCTA}
                    size="sm"
                    className="relative bg-white hover:bg-white/95 text-primary border-0 font-bold text-xs px-3 py-1.5 transform hover:scale-105 transition-all duration-300"
                  >
                    <ArrowDown className="w-3 h-3 mr-1 animate-bounce" />
                    ¡INSCRIBIRME!
                  </Button>
                </div>
                
                <Button
                  onClick={dismissBanner}
                  size="sm"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10 p-1"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {/* Second line: Countdown (mobile only) / Countdown inline (desktop) */}
            <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-200 text-xs">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">Termina en:</span>
              <CountdownTimer className="text-xs font-bold" textColor="text-yellow-200" />
            </div>
          </div>
          
          {/* Action buttons - desktop only */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-accent rounded-md blur-sm opacity-70 animate-pulse"></div>
              <Button
                onClick={scrollToCTA}
                size="sm"
                className="relative bg-white hover:bg-white/95 text-primary border-0 font-bold text-sm px-4 py-2 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowDown className="w-4 h-4 mr-1 animate-bounce" />
                ¡INSCRIBIRME!
              </Button>
            </div>
            
            <Button
              onClick={dismissBanner}
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 p-1"
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