import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

const END_DATE = new Date("2026-01-10T23:59:59-06:00").getTime();

function formatNumber(num: number) {
  return num.toString().padStart(2, "0");
}

function getTimeLeft(): CountdownState {
  const now = Date.now();
  const diff = END_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

const DiscountBannerIntroduccion = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.querySelector('section[data-section="pricing"]');
      if (!pricingSection) {
        setIsHiddenByScroll(false);
        return;
      }

      const rect = pricingSection.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      setIsHiddenByScroll(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const countdownLabel = useMemo(() => {
    if (timeLeft.isExpired) return "";
    const daysPart = timeLeft.days > 0 ? `${formatNumber(timeLeft.days)}d ` : "";
    return `${daysPart}${formatNumber(timeLeft.hours)}h ${formatNumber(timeLeft.minutes)}min ${formatNumber(timeLeft.seconds)}s`;
  }, [timeLeft]);

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('section[data-section="pricing"]');
    pricingSection?.scrollIntoView({ behavior: "smooth" });
  };

  if (timeLeft.isExpired) return null;
  if (isDismissed || isHiddenByScroll) return null;

  return (
    <div data-banner="discount" className="fixed top-0 left-0 right-0 z-50 bg-gradient-accent overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 container mx-auto px-4 py-0.5 md:py-0.5">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-xs drop-shadow-sm">
              Introducción a la Programación: $2,000 de descuento (plan preferente)
            </span>

            <Button
              onClick={scrollToPricing}
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/50 text-white hover:bg-white/30 hover:border-white/70 text-xs px-2 py-0.5 h-auto font-medium"
            >
              Ver precios
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs drop-shadow-sm">Por tiempo limitado:</span>
              <span className="text-white font-mono font-bold text-xs drop-shadow-sm">⏰ {countdownLabel}</span>
            </div>
            <Button
              onClick={() => setIsDismissed(true)}
              size="sm"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/20 p-1"
              aria-label="Cerrar banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xs drop-shadow-sm">$2,000 OFF</span>

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
                <span className="text-white font-mono font-bold text-xs drop-shadow-sm">{countdownLabel}</span>
              </div>

              <Button
                onClick={() => setIsDismissed(true)}
                size="sm"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/20 p-0.5"
                aria-label="Cerrar banner"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};

export default DiscountBannerIntroduccion;
