import { useEffect } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { getCurrentPrice, getFallbackCheckoutUrl } from "@/components/checkout/CheckoutContext";
import type { Course } from "@/lib/course-types";
import { captureAttribution, resolveCheckoutSettings } from "@/lib/checkout";

interface PurchaseFormProps {
  course: Course;
  apiBaseUrl: string;
  editMode: boolean;
}

/**
 * Isla del formulario de `/pagar/{curso}`: el mismo formulario de los botones de pago. Guarda la
 * atribución de la campaña al cargar, como antes.
 */
const PurchaseForm = ({ course, apiBaseUrl, editMode }: PurchaseFormProps) => {
  useEffect(() => captureAttribution(), []);
  return (
    // En celular va justo después del precio; en escritorio ocupa la columna derecha completa.
    <div className="order-2 rounded-[20px] border border-white/[0.09] bg-[#101318] p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <p className="text-[15px] font-semibold text-white">
        {editMode ? "Corrige lo que necesites y te regresamos al pago" : "Déjanos tus datos y te llevamos al pago seguro"}
      </p>
      {/* Altura fija, igual que en el diálogo: al cambiar de pregunta nada se mueve. */}
      <div className="mt-5 h-[500px]">
        <CheckoutForm
          apiBaseUrl={apiBaseUrl}
          courseSlug={course.slug}
          price={getCurrentPrice(course)}
          fallbackUrl={getFallbackCheckoutUrl(course)}
          startInEditMode={editMode}
          questions={resolveCheckoutSettings(course)}
        />
      </div>
    </div>
  );
};

export default PurchaseForm;
