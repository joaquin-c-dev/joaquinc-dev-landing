import { useCallback, useMemo } from "react";
import type { Course } from "@/lib/course-types";
import { buildStripeCheckoutUrl } from "@/lib/course-formatters";
import { openExternal } from "@/lib/mobile-navigation";

/**
 * Checkout de Stripe compartido por todos los CTAs del taller (barra fija superior,
 * tarjeta y CTA final). `client_reference_id` = agendado más próximo, que es lo que
 * el webhook usa para inscribir al alumno en la fecha correcta. En celular el pago se
 * abre en la misma pestaña: los navegadores de Instagram/Facebook bloquean las nuevas.
 */
export function useWorkshopCheckout(course: Course) {
  const checkoutUrl = useMemo(
    () =>
      course.stripeUrl
        ? buildStripeCheckoutUrl(
            course.stripeUrl,
            course.stripeCoupon,
            course.nearestScheduledCourseId,
          )
        : undefined,
    [course.stripeUrl, course.stripeCoupon, course.nearestScheduledCourseId],
  );

  const openCheckout = useCallback(() => {
    if (checkoutUrl) openExternal(checkoutUrl);
  }, [checkoutUrl]);

  return { checkoutUrl, openCheckout };
}
