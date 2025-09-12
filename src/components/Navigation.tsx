import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import { useBanner } from "@/contexts/BannerContext";
import { useCountdown } from "@/contexts/CountdownContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isBannerVisible } = useBanner();
  const { timeLeft } = useCountdown();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate if banner should actually be shown (visible and not expired)
  const shouldShowBanner = isBannerVisible && !timeLeft.isExpired;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle scroll to pricing section when navigating from another page
    const params = new URLSearchParams(location.search);
    if (params.get('scroll') === 'pricing' && location.pathname === '/') {
      setTimeout(() => {
        const pricingSection = document.querySelector('section[data-section="pricing"]');
        pricingSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clean up URL
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleNavClick = (item: any) => {
    if (item.action === 'pricing') {
      if (location.pathname === '/') {
        // Already on home page, just scroll
        const pricingSection = document.querySelector('section[data-section="pricing"]');
        pricingSection?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home page with scroll parameter
        navigate('/?scroll=pricing');
      }
    } else {
      navigate(item.path);
    }
  };

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Temario", path: "/temario" },
    { name: "Acerca de mí", path: "/acerca-de-mi" },
    { name: "Precios", path: "/", action: "pricing" }
  ];

  return (
    <nav 
      className={`fixed ${shouldShowBanner ? 'top-[40px]' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobile
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-16 py-2">
          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer ${
                  location.pathname === item.path && !item.action
                    ? 'bg-gradient-accent bg-clip-text text-transparent' 
                    : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ${
                    location.pathname === item.path && !item.action
                      ? 'bg-gradient-accent bg-clip-text text-transparent' 
                      : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;