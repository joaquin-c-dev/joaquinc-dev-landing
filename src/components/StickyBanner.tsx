import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, X } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const StickyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      // Get sections
      const heroSection = document.querySelector('section[data-section="hero"]') || 
                         document.body.firstElementChild;
      const ctaSection = document.querySelector('section[data-section="cta"]') || 
                        document.querySelector('.stripe-buy-button-container')?.closest('section');
      
      if (!heroSection || !ctaSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const ctaRect = ctaSection.getBoundingClientRect();
      
      // Show banner when not in hero section and not in CTA section
      const isInHero = heroRect.bottom > 0;
      const isInCTA = ctaRect.top <= window.innerHeight && ctaRect.bottom >= 0;
      
      setIsVisible(!isInHero && !isInCTA);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('section[data-section="cta"]') || 
                      document.querySelector('.stripe-buy-button-container')?.closest('section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dismissBanner = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-primary/95 backdrop-blur-sm border-b border-primary/20 shadow-glow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="text-white font-semibold text-sm md:text-base">
                🚀 ¡Transforma tu carrera! Oferta especial: $6,500 MXN (antes $8,500)
              </span>
              <CountdownTimer className="text-xs md:text-sm" textColor="text-yellow-200" />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={scrollToCTA}
              size="sm"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 hover:border-white/40 text-xs md:text-sm"
            >
              <ArrowDown className="w-4 h-4 mr-1" />
              Ver Precio
            </Button>
            
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
    </div>
  );
};

export default StickyBanner;