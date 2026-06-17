import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BannerProvider } from "@/contexts/BannerContext";
import {
  CoursesNavProvider,
  type NavCourse,
} from "@/contexts/CoursesNavContext";
import { PathnameProvider } from "@/contexts/PathnameContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const queryClient = new QueryClient();

interface AppShellProps {
  children: ReactNode;
  navCourses?: NavCourse[];
  pathname?: string;
}

export default function AppShell({
  children,
  navCourses = [],
  pathname,
}: AppShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PathnameProvider pathname={pathname}>
        <BannerProvider>
          <CoursesNavProvider courses={navCourses}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
              <WhatsAppButton />
            </TooltipProvider>
          </CoursesNavProvider>
        </BannerProvider>
      </PathnameProvider>
    </QueryClientProvider>
  );
}
