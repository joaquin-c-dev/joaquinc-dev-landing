import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Zap, ArrowDown } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useBanner } from "@/contexts/BannerContext";
import { useCountdown } from "@/contexts/CountdownContext";
import { useNavigate, useLocation } from "react-router-dom";

const DiscountBanner = () => {
  const { isBannerVisible, dismissBanner, setBannerVisible } = useBanner();
  const { timeLeft } = useCountdown();
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.querySelector('section[data-section="pricing"]');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsHiddenByScroll(isInView);
        setBannerVisible(!isInView);
      } else {
        setIsHiddenByScroll(false);
        setBannerVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setBannerVisible]);

  const scrollToPricing = () => {
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const pricingSection = document.querySelector('section[data-section="pricing"]');
      pricingSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page with scroll parameter
      navigate('/?scroll=pricing');
    }
  };

  const dismissBannerHandler = () => {
    dismissBanner();
  };

  // Hide banner if discount is expired - AFTER all hooks are called
  if (timeLeft.isExpired) return null;

  if (!isBannerVisible || isHiddenByScroll) return null;

  return (
    <div data-banner="discount" className="fixed top-0 left-0 right-0 z-50 bg-gradient-accent overflow-hidden">
      {/* Darker overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-0.5 md:py-0.5">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Special price offer in single line */}
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-xs drop-shadow-sm">
              Precio especial $2,000 de descuento + 3 meses sin intereses
            </span>
            
            {/* Subtle CTA */}
            <Button
              onClick={scrollToPricing}
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/50 text-white hover:bg-white/30 hover:border-white/70 text-xs px-2 py-0.5 h-auto font-medium"
            >
              Ver precios
            </Button>
          </div>
          
          {/* Right side - Timer and close button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs drop-shadow-sm">Por tiempo limitado:</span>
              <CountdownTimer className="text-xs font-bold drop-shadow-sm" textColor="text-white" />
            </div>
            <Button
              onClick={dismissBannerHandler}
              size="sm"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xs drop-shadow-sm">
              $2,000 de descuento + MSI
            </span>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={scrollToPricing}
                size="sm"
                variant="outline"
                className="bg-white/20 border-white/50 text-white hover:bg-white/30 hover:border-white/70 text-xs px-2 py-0.5 h-auto font-medium"
              >
                Ver precios
              </Button>
              
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-white" />
                <CountdownTimer className="text-xs font-bold drop-shadow-sm" textColor="text-white" />
              </div>
              
              <Button
                onClick={dismissBannerHandler}
                size="sm"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/20 p-0.5"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
};

export default DiscountBanner;