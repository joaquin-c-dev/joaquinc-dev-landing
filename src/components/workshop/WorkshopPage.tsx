import Footer from "@/components/Footer";
import HomeReviews from "@/components/home/HomeReviews";
import { CoursesNavProvider, type NavCourse } from "@/contexts/CoursesNavContext";
import { findSelectedSchedule } from "@/lib/course-formatters";
import type { Course } from "@/lib/course-types";
import { getWorkshopContent } from "@/lib/workshop-content";
import { formatPrice, formatWorkshopHeaderDate } from "@/lib/workshop-format";
import { getTransferWhatsappUrl } from "@/lib/workshop-whatsapp";
import WorkshopAgenda from "./WorkshopAgenda";
import WorkshopAudience from "./WorkshopAudience";
import WorkshopCodeShowcase from "./WorkshopCodeShowcase";
import WorkshopFaq from "./WorkshopFaq";
import WorkshopFinalCta from "./WorkshopFinalCta";
import WorkshopHeader from "./WorkshopHeader";
import WorkshopHero from "./WorkshopHero";
import WorkshopInstructor from "./WorkshopInstructor";
import WorkshopLiveFormat from "./WorkshopLiveFormat";
import { WS_FONT_UI } from "./workshop-styles";

interface WorkshopPageProps {
  course: Course;
  navCourses: NavCourse[];
  /** Si hay forma de pagar (formulario o liga de Stripe): muestra los botones de compra. */
  canCheckout: boolean;
}

/**
 * Página de venta de un taller (`course.type === "WORKSHOP"`), como HTML sin hidratar. Los
 * botones de compra llevan `data-checkout-trigger` y los atiende la isla `CheckoutTrigger` de
 * `[slug].astro`; la cuenta regresiva y los links de WhatsApp los maneja
 * `scripts/workshop-page.ts`.
 */
const WorkshopPage = ({ course, navCourses, canCheckout }: WorkshopPageProps) => {
  const content = getWorkshopContent(course.slug);

  const hasDiscount =
    course.discountPrice != null &&
    course.regularPrice != null &&
    course.discountPrice < course.regularPrice;
  const price = (hasDiscount ? course.discountPrice : course.regularPrice) ?? 0;
  const priceLabel = formatPrice(price);

  // El grupo que se vende hoy (el próximo que no ha empezado), el mismo de la compra.
  const nextSchedule = findSelectedSchedule(course);
  const startsAt = nextSchedule?.startsAt;
  const endsAt = nextSchedule?.endsAt;
  // Un solo enlace de transferencia para la tarjeta y el FAQ: siempre el mismo mensaje.
  const transferUrl = getTransferWhatsappUrl(course.title, price, startsAt);
  const testimonials = content.testimonials ?? [];
  const rating = testimonials.length
    ? testimonials.reduce((sum, testimonial) => sum + testimonial.nps / 2, 0) / testimonials.length
    : 0;

  return (
    <>
      {/* Sin cintilla de promoción: la mayoría entra desde el celular y la página ya tiene
          suficientes CTAs de compra; el espacio de arriba es para el hero. */}
      <WorkshopHeader
        title={course.title}
        priceLabel={priceLabel}
        subtitle={startsAt ? formatWorkshopHeaderDate(startsAt) : undefined}
        canCheckout={canCheckout}
      />
      <main id="contenido">
        <WorkshopHero
          course={course}
          price={price}
          regularPrice={hasDiscount ? course.regularPrice : undefined}
          startsAt={startsAt}
          endsAt={endsAt}
          canCheckout={canCheckout}
          transferUrl={transferUrl}
        />
        <WorkshopLiveFormat stackLabel={content.stackLabel} />
        <WorkshopCodeShowcase content={content} />
        {course.sections && <WorkshopAgenda sections={course.sections} startsAt={startsAt} />}
        <WorkshopAudience audience={content.audience} prerequisites={course.prerequisites} />
        <WorkshopInstructor />
        <HomeReviews testimonials={testimonials} rating={rating} />
        <WorkshopFaq course={course} price={price} transferUrl={transferUrl} extraFaq={content.faq} />
        <WorkshopFinalCta
          price={price}
          startsAt={startsAt}
          endsAt={endsAt}
          headline={content.finalCtaHeadline}
          canCheckout={canCheckout}
        />
      </main>
      <CoursesNavProvider courses={navCourses}>
        <Footer />
      </CoursesNavProvider>
    </>
  );
};

export default WorkshopPage;
