import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCoursesNav } from "@/contexts/CoursesNavContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if any discount banner is visible in the DOM
  useEffect(() => {
    const checkBanner = () => {
      const banner = document.querySelector('[data-banner="discount"]');
      setBannerVisible(!!banner);
    };
    
    checkBanner();
    // Use MutationObserver to detect when banner appears/disappears
    const observer = new MutationObserver(checkBanner);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Handle scroll to pricing section when navigating from another page
    const params = new URLSearchParams(location.search);
    if (params.get("scroll") === "pricing" && location.pathname === "/") {
      setTimeout(() => {
        const pricingSection = document.querySelector('section[data-section="pricing"]');
        pricingSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      // Clean up URL
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  const handleNavClick = (item: any) => {
    if (item.action === "pricing") {
      if (location.pathname === "/") {
        // Already on home page, just scroll
        const pricingSection = document.querySelector('section[data-section="pricing"]');
        pricingSection?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home page with scroll parameter
        navigate("/?scroll=pricing");
      }
    } else if (item.path === "/" && location.pathname === "/") {
      // If clicking "Inicio" while on home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(item.path);
    }
  };

  const navItems: { name: string; path: string; action?: string }[] = [
    { name: "Inicio", path: "/" },
    { name: "Acerca de mí", path: "/acerca-de-mi" },
  ];

  const { courses: navCourses } = useCoursesNav();
  const courseItems = navCourses.map((course) => ({
    name: course.name,
    path: `/${course.slug}`,
  }));

  return (
    <nav
      className={`fixed ${bannerVisible ? "top-[40px]" : "top-0"} left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobile
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-16 py-2">
          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 3).map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer ${
                  location.pathname === item.path && !item.action
                    ? "bg-gradient-accent bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Cursos Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer flex items-center gap-1 group ${
                    courseItems.some((course) => location.pathname === course.path)
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  Cursos
                  <ChevronDown
                    className={`w-4 h-4 transition-colors duration-200 group-hover:text-blue-500 ${
                      courseItems.some((course) => location.pathname === course.path) ? "text-blue-500" : ""
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-md border border-border/50 z-50">
                {courseItems.map((course) => (
                  <DropdownMenuItem
                    key={course.name}
                    onClick={() => navigate(course.path)}
                    className={`cursor-pointer hover:text-blue-500 hover:bg-transparent focus:bg-transparent data-[highlighted]:bg-transparent data-[highlighted]:text-blue-500 transition-colors duration-200 font-medium ${
                      location.pathname === course.path ? "bg-gradient-accent bg-clip-text text-transparent" : ""
                    }`}
                  >
                    {course.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Remaining nav items */}
            {navItems.slice(3).map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer ${
                  location.pathname === item.path && !item.action
                    ? "bg-gradient-accent bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-6">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.slice(0, 3).map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ${
                    location.pathname === item.path && !item.action
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Cursos section in mobile */}
              <div className="py-2">
                <div
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium mb-2 ${
                    courseItems.some((course) => location.pathname === course.path)
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  Cursos
                </div>
                {courseItems.map((course) => (
                  <button
                    key={course.name}
                    onClick={() => {
                      navigate(course.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-foreground hover:text-blue-500 transition-colors duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ml-4 block w-full ${
                      location.pathname === course.path ? "bg-gradient-accent bg-clip-text text-transparent" : ""
                    }`}
                  >
                    {course.name}
                  </button>
                ))}
              </div>

              {navItems.slice(3).map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ${
                    location.pathname === item.path && !item.action
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
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
