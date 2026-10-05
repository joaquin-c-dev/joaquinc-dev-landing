import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Course } from "@/lib/course-types";
import { buildStripeCheckoutUrl } from "@/lib/course-formatters";
import { captureAttribution, resolveCheckoutSettings } from "@/lib/checkout";
import { openExternal } from "@/lib/mobile-navigation";
import { formatPrice } from "@/lib/workshop-format";
import CheckoutForm from "./CheckoutForm";

interface CheckoutContextValue {
  /** Abre el formulario previo al pago (o el enlace de pago directo si no hay API). */
  openCheckout: () => void;
  /** `false` cuando el curso no tiene forma de cobrarse: los CTAs de pago se ocultan. */
  canCheckout: boolean;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

/** Precio vigente: el de descuento si es menor, igual que en las páginas y en la API. */
export function getCurrentPrice(course: Course): number {
  const hasDiscount =
    course.discountPrice != null && course.regularPrice != null && course.discountPrice < course.regularPrice;
  return (hasDiscount ? course.discountPrice : course.regularPrice) ?? 0;
}

/** Enlace de pago de Stripe de siempre (con cupón): respaldo si la API no responde. */
export function getFallbackCheckoutUrl(course: Course): string | undefined {
  return course.stripeUrl
    ? buildStripeCheckoutUrl(course.stripeUrl, course.stripeCoupon, course.nearestScheduledCourseId)
    : undefined;
}

interface CheckoutProviderProps {
  course: Course;
  apiBaseUrl?: string;
  children: ReactNode;
}

/**
 * Comparte el formulario de pago entre todos los CTAs de una página de curso o taller: cualquier
 * botón llama `openCheckout()` y se abre el mismo diálogo (hoja inferior en celular).
 */
export function CheckoutProvider({ course, apiBaseUrl, children }: CheckoutProviderProps) {
  const [open, setOpen] = useState(false);
  const fallbackUrl = useMemo(() => getFallbackCheckoutUrl(course), [course]);
  const settings = useMemo(() => resolveCheckoutSettings(course), [course]);
  // El panel decide entre formulario y liga directa de Stripe (la opción por defecto). Un curso
  // sin liga de Stripe usa el formulario para no quedarse sin forma de cobrar.
  const usesForm = Boolean(apiBaseUrl) && (settings.mode === "FORM" || !fallbackUrl);

  useEffect(() => captureAttribution(), []);

  const openCheckout = useCallback(() => {
    if (usesForm) {
      setOpen(true);
      return;
    }
    if (fallbackUrl) openExternal(fallbackUrl);
  }, [usesForm, fallbackUrl]);

  const value = useMemo(
    () => ({ openCheckout, canCheckout: usesForm || Boolean(fallbackUrl) }),
    [openCheckout, usesForm, fallbackUrl],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      {usesForm && apiBaseUrl && (
        <CheckoutDialog
          open={open}
          onOpenChange={setOpen}
          course={course}
          apiBaseUrl={apiBaseUrl}
          fallbackUrl={fallbackUrl}
        />
      )}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used inside CheckoutProvider");
  return context;
}

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  apiBaseUrl: string;
  fallbackUrl?: string;
}

const CheckoutDialog = ({ open, onOpenChange, course, apiBaseUrl, fallbackUrl }: CheckoutDialogProps) => {
  const price = getCurrentPrice(course);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {/* Solo se cierra con la X o Esc: en celular, al cerrarse el teclado el toque podía caer
            fuera de la hoja y cerrarla, perdiendo lo que la persona ya había llenado. */}
        <DialogPrimitive.Content
          onInteractOutside={(event) => event.preventDefault()}
          className="fixed inset-x-0 bottom-0 z-[60] flex h-[min(560px,92dvh)] flex-col outline-none rounded-t-2xl border border-white/10 bg-[#101318] px-5 pb-6 pt-5 text-white shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:px-7 sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95"
        >
          <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" aria-hidden />
          {/* Sin encabezado visible: todo el espacio es para las preguntas. Título y descripción
              quedan solo para lectores de pantalla (Radix los pide para el diálogo). */}
          <DialogPrimitive.Title className="sr-only">{course.title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {formatPrice(price)} MXN · Déjanos tus datos y te llevamos al pago seguro.
          </DialogPrimitive.Description>
          {/* Altura fija (la de la pregunta más larga): al cambiar de pregunta nada se mueve. */}
          <div className="min-h-0 flex-1">
            <CheckoutForm
              apiBaseUrl={apiBaseUrl}
              courseSlug={course.slug}
              price={price}
              fallbackUrl={fallbackUrl}
              questions={resolveCheckoutSettings(course)}
              reserveCloseButtonSpace
            />
          </div>
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
