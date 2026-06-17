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
import WhatsAppButton from "@/components/WhatsAppButton";

const queryClient = new QueryClient();

interface AppShellProps {
  children: ReactNode;
  navCourses?: NavCourse[];
}

export default function AppShell({
  children,
  navCourses = [],
}: AppShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
