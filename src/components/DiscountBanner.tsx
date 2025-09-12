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
        <div className="flex items-center justify-between">
          {/* Left side - Special price offer */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">🔥 Precio especial</span>
              <span className="text-white/90 text-xs">$2,000 de descuento + 3 meses sin intereses</span>
            </div>
          </div>
          
          {/* Right side - Timer and close button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-sm">Por tiempo limitado:</span>
              <CountdownTimer className="text-sm font-bold" textColor="text-yellow-200" />
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