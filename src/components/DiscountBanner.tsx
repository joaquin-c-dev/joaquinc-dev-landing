import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Zap, ArrowDown } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const DiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('section[data-section="pricing"]');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dismissBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-accent overflow-hidden">
      {/* Darker overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-1.5">
        <div className="flex items-center justify-between">
          {/* Left side - Special price offer in single line */}
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-sm drop-shadow-sm">
              Precio especial $2,000 de descuento + 3 meses sin intereses
            </span>
            
            {/* Subtle CTA */}
            <Button
              onClick={scrollToPricing}
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/50 text-white hover:bg-white/30 hover:border-white/70 text-xs px-3 py-1 h-auto font-medium"
            >
              Ver precios
            </Button>
          </div>
          
          {/* Right side - Timer and close button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm drop-shadow-sm">Por tiempo limitado:</span>
              <CountdownTimer className="text-sm font-bold drop-shadow-sm" textColor="text-white" />
            </div>
            <Button
              onClick={dismissBanner}
              size="sm"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/20 p-1"
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