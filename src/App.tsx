import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountdownProvider } from "@/contexts/CountdownContext";
import { BannerProvider } from "@/contexts/BannerContext";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Temario from "./pages/Temario";
import AcercaDeMi from "./pages/AcercaDeMi";
import TallerJava from "./pages/TallerJava";
import IntroduccionProgramacion from "./pages/IntroduccionProgramacion";
import GraciasPorTuCompra from "./pages/GraciasPorTuCompra";
import JavaIntermedio from "./pages/JavaIntermedio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BannerProvider>
      <CountdownProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/temario" element={<Temario />} />
              <Route path="/java-intermedio" element={<JavaIntermedio />} />
              <Route path="/introduccion-programacion" element={<IntroduccionProgramacion />} />
              <Route path="/taller-poo" element={<TallerJava />} />
              <Route path="/acerca-de-mi" element={<AcercaDeMi />} />
              <Route path="/politicas-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/gracias-por-tu-compra" element={<GraciasPorTuCompra />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </CountdownProvider>
    </BannerProvider>
  </QueryClientProvider>
);

export default App;
