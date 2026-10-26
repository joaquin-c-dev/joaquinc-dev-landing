import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "@/lib/router";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCoursesNav } from "@/contexts/CoursesNavContext";
import { useActivePathname } from "@/contexts/PathnameContext";
import { ASSETS } from "@/lib/assets";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const isMobile = useIsMobile();
  const pathname = useActivePathname();
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
    if (params.get("scroll") === "pricing" && pathname === "/") {
      setTimeout(() => {
        const pricingSection = document.querySelector('section[data-section="pricing"]');
        pricingSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      // Clean up URL
      navigate("/", { replace: true });
    }
  }, [location.search, pathname, navigate]);

  // Los items son links reales (<a href>) para que buscadores y asistentes de IA puedan
  // recorrer el sitio; solo se intercepta el clic cuando hay que hacer scroll.
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.action === "pricing") {
      event.preventDefault();
      if (pathname === "/") {
        const pricingSection = document.querySelector('section[data-section="pricing"]');
        pricingSection?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/?scroll=pricing");
      }
    } else if (item.path === "/" && pathname === "/") {
      // "Inicio" estando en el home: sube al inicio en vez de recargar.
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  type NavItem = { name: string; path: string; action?: string };
  const navItems: NavItem[] = [
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
          <a href="/" aria-label="joaquinc.dev, ir al inicio" className="absolute left-6 top-2">
            <img src={ASSETS.brandLogo} alt="" width={54} height={48} className="h-12 w-auto" />
          </a>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer ${
                  pathname === item.path && !item.action
                    ? "bg-gradient-accent bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Cursos Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer flex items-center gap-1 group ${
                    courseItems.some((course) => pathname === course.path)
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  Cursos
                  <ChevronDown
                    className={`w-4 h-4 transition-colors duration-200 group-hover:text-blue-500 ${
                      courseItems.some((course) => pathname === course.path) ? "text-blue-500" : ""
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-md border border-border/50 z-50">
                {courseItems.map((course) => (
                  <DropdownMenuItem
                    key={course.name}
                    asChild
                    className={`cursor-pointer hover:text-blue-500 hover:bg-transparent focus:bg-transparent data-[highlighted]:bg-transparent data-[highlighted]:text-blue-500 transition-colors duration-200 font-medium ${
                      pathname === course.path ? "bg-gradient-accent bg-clip-text text-transparent" : ""
                    }`}
                  >
                    <a href={course.path}>{course.name}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Remaining nav items */}
            {navItems.slice(3).map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium bg-transparent border-none cursor-pointer ${
                  pathname === item.path && !item.action
                    ? "bg-gradient-accent bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-6">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-[10px] border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc66d]/60 ${
                isMobileMenuOpen
                  ? "border-[#ffc66d]/40 bg-[#ffc66d]/10 text-[#ffc66d]"
                  : "border-white/10 bg-white/[0.04] text-[#eceef1] hover:border-[#ffc66d]/40 hover:text-[#ffc66d]"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.slice(0, 3).map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(event) => {
                    handleNavClick(event, item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ${
                    pathname === item.path && !item.action
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {item.name}
                </a>
              ))}

              {/* Cursos section in mobile */}
              <div className="py-2">
                <div
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium mb-2 ${
                    courseItems.some((course) => pathname === course.path)
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  Cursos
                </div>
                {courseItems.map((course) => (
                  <a
                    key={course.name}
                    href={course.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-foreground hover:text-blue-500 transition-colors duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ml-4 block w-full ${
                      pathname === course.path ? "bg-gradient-accent bg-clip-text text-transparent" : ""
                    }`}
                  >
                    {course.name}
                  </a>
                ))}
              </div>

              {navItems.slice(3).map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(event) => {
                    handleNavClick(event, item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-foreground hover:bg-gradient-accent hover:bg-clip-text hover:text-transparent transition-all duration-200 font-medium py-2 bg-transparent border-none cursor-pointer text-left ${
                    pathname === item.path && !item.action
                      ? "bg-gradient-accent bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
