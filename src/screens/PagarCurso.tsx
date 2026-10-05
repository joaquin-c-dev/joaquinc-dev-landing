import CheckoutForm from "@/components/checkout/CheckoutForm";
import { getCurrentPrice, getFallbackCheckoutUrl } from "@/components/checkout/CheckoutContext";
import type { Course } from "@/lib/course-types";
import { captureAttribution, resolveCheckoutSettings } from "@/lib/checkout";
import { formatPrice } from "@/lib/workshop-format";
import { useEffect } from "react";

interface PagarCursoProps {
  course: Course;
  apiBaseUrl: string;
  /** `?editar=1`: llegó desde Stripe para corregir sus datos. */
  editMode?: boolean;
}

/**
 * Liga corta de pago (`/pagar/{curso}`) para mandar por WhatsApp o en anuncios: el mismo
 * formulario de los botones de pago, sin el resto de la página de venta.
 */
const PagarCurso = ({ course, apiBaseUrl, editMode = false }: PagarCursoProps) => {
  const price = getCurrentPrice(course);
  useEffect(() => captureAttribution(), []);

  return (
    <div className="min-h-screen bg-[#0b0d10] px-4 py-10 text-white">
      <main className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#101318] p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#ffc66d]">Inscripción</p>
        <h1 className="mt-1 text-xl font-semibold leading-snug">{course.title}</h1>
        <p className="mb-6 mt-1 text-sm text-white/60">
          {editMode
            ? "Corrige lo que necesites y te regresamos al pago."
            : `${formatPrice(price)} MXN · Déjanos tus datos y te llevamos al pago seguro.`}
        </p>
        {/* Altura fija, igual que en el diálogo: al cambiar de pregunta nada se mueve. */}
        <div className="h-[500px]">
          <CheckoutForm
            apiBaseUrl={apiBaseUrl}
            courseSlug={course.slug}
            price={price}
            fallbackUrl={getFallbackCheckoutUrl(course)}
            startInEditMode={editMode}
            questions={resolveCheckoutSettings(course)}
          />
        </div>
        <a href={`/${course.slug}`} className="mt-6 block text-center text-sm text-white/50 underline">
          Ver detalles del {course.type === "WORKSHOP" ? "taller" : "curso"}
        </a>
      </main>
    </div>
  );
};

export default PagarCurso;
