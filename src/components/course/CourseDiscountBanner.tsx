import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock } from "lucide-react";
import { useBanner } from "@/contexts/BannerContext";
import { usePromoCountdown } from "@/contexts/PromoCountdownContext";
import type { CoursePromo } from "@/lib/course-types";

interface CourseDiscountBannerProps {
  promo: CoursePromo;
  pricingSectionId?: string;
}

const CourseDiscountBanner = ({
  promo,
  pricingSectionId = "pricing",
}: CourseDiscountBannerProps) => {
  const { isBannerVisible, dismissBanner, setBannerVisible } = useBanner();
  const { timeLeft, formatNumber } = usePromoCountdown();
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.querySelector(
        `section[data-section="${pricingSectionId}"]`,
      );
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

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setBannerVisible, pricingSectionId]);

  const scrollToPricing = () => {
    document
      .querySelector(`section[data-section="${pricingSectionId}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const countdownLabel = (() => {
    if (timeLeft.isExpired) return "";
    const daysPart = timeLeft.days > 0 ? `${formatNumber(timeLeft.days)}d ` : "";
    return `${daysPart}${formatNumber(timeLeft.hours)}h ${formatNumber(timeLeft.minutes)}min ${formatNumber(timeLeft.seconds)}s`;
  })();

  if (timeLeft.isExpired) return null;
  if (!isBannerVisible || isHiddenByScroll) return null;

  return (
    <div
      data-banner="discount"
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-accent overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 container mx-auto px-4 py-0.5 md:py-0.5">
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-xs drop-shadow-sm">
              {promo.bannerDesktop}
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
            <span className="text-white font-bold text-xs drop-shadow-sm">
              Por tiempo limitado:
            </span>
            <span className="text-white font-mono font-bold text-xs drop-shadow-sm">
              ⏰ {countdownLabel}
            </span>
            <Button
              onClick={dismissBanner}
              size="sm"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/20 p-1"
              aria-label="Cerrar banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xs drop-shadow-sm">
              {promo.bannerMobile}
            </span>
            <div className="flex items-center gap-2">
              <Button
                onClick={scrollToPricing}
                size="sm"
                variant="outline"
                className="bg-white/20 border-white/50 text-white hover:bg-white/30 text-xs px-2 py-0.5 h-auto"
              >
                Ver precios
              </Button>
              <Clock className="w-3 h-3 text-white" />
              <span className="text-white font-mono font-bold text-xs">
                {countdownLabel}
              </span>
              <Button
                onClick={dismissBanner}
                size="sm"
                variant="ghost"
                className="text-white/80 hover:bg-white/20 p-0.5"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDiscountBanner;
