import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      
      // Check if banner should be hidden (same logic as DiscountBanner)
      const pricingSection = document.querySelector('section[data-section="pricing"]');
      const bannerElement = document.querySelector('[data-banner="discount"]');
      
      let bannerHidden = false;
      
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        bannerHidden = isInView;
      }
      
      // Also check if banner element exists (not dismissed)
      if (!bannerElement) {
        bannerHidden = true;
      }
      
      setIsBannerVisible(!bannerHidden);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Temario", path: "/temario" },
    { name: "Acerca de mí", path: "/acerca-de-mi" }
  ];

  return (
    <nav 
      className={`fixed ${isBannerVisible ? 'top-[32px]' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-16 py-2">
          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium ${
                  location.pathname === item.path 
                    ? 'bg-gradient-accent bg-clip-text text-transparent' 
                    : ''
                }`}
              >
                {item.name}
              </Link>
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
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium py-2 ${
                    location.pathname === item.path 
                      ? 'bg-gradient-accent bg-clip-text text-transparent' 
                      : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;