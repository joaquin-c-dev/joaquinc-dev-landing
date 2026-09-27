import { useCallback, useMemo } from "react";
import type { Course } from "@/lib/course-types";
import { buildStripeCheckoutUrl } from "@/lib/course-formatters";

/**
 * Checkout de Stripe compartido por todos los CTAs del taller (header, tarjeta,
 * CTA final y barra fija). `client_reference_id` = agendado más próximo, que es lo que
 * el webhook usa para inscribir al alumno en la fecha correcta.
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
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  }, [checkoutUrl]);

  return { checkoutUrl, openCheckout };
}
