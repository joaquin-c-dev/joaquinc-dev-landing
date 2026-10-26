import { useEffect } from "react";
import type { Course } from "@/lib/course-types";
import { CheckoutProvider, useCheckout } from "./CheckoutContext";

interface CheckoutTriggerProps {
  course: Course;
  apiBaseUrl?: string;
}

/**
 * Isla única del pago en páginas sin hidratar: los botones de compra son HTML normal con
 * `data-checkout-trigger` y esta isla, que tiene el formulario, los escucha. Así una página
 * con varios botones de compra solo carga React para el pago.
 */
const CheckoutTrigger = ({ course, apiBaseUrl }: CheckoutTriggerProps) => (
  <CheckoutProvider course={course} apiBaseUrl={apiBaseUrl}>
    <TriggerListener />
  </CheckoutProvider>
);

const TriggerListener = () => {
  const { openCheckout } = useCheckout();
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest("[data-checkout-trigger]");
      if (!trigger) return;
      event.preventDefault();
      openCheckout();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openCheckout]);
  return null;
};

export default CheckoutTrigger;
