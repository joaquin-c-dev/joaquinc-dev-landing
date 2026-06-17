import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BannerProvider } from "@/contexts/BannerContext";
import { CountdownProvider } from "@/contexts/CountdownContext";
import { CountdownIntroduccionProvider } from "@/contexts/CountdownIntroduccionContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const queryClient = new QueryClient();

/**
 * Raiz compartida por cada pagina. Reemplaza a `App.tsx` (sin el router): provee
 * los contextos globales y los widgets flotantes. Cada pagina Astro monta este
 * arbol como una unica isla React para que los contextos funcionen entre sus
 * componentes (Astro no comparte React Context entre islas separadas).
 */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BannerProvider>
        <CountdownProvider>
          <CountdownIntroduccionProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
              <WhatsAppButton />
            </TooltipProvider>
          </CountdownIntroduccionProvider>
        </CountdownProvider>
      </BannerProvider>
    </QueryClientProvider>
  );
}
