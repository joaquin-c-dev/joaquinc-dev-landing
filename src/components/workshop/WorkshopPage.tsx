import { useRef } from "react";
import AppShell from "@/components/app/AppShell";
import CourseDiscountBanner from "@/components/course/CourseDiscountBanner";
import { PromoCountdownProvider } from "@/contexts/PromoCountdownContext";
import type { NavCourse } from "@/contexts/CoursesNavContext";
import type { Course } from "@/lib/course-types";
import { getWorkshopContent } from "@/lib/workshop-content";
import { formatPrice, formatWorkshopShortDate } from "@/lib/workshop-format";
import { getQuestionWhatsappMessage, getTransferWhatsappUrl } from "@/lib/workshop-whatsapp";
import WorkshopAgenda from "./WorkshopAgenda";
import WorkshopAudience from "./WorkshopAudience";
import WorkshopCodeShowcase from "./WorkshopCodeShowcase";
import WorkshopFaq from "./WorkshopFaq";
import WorkshopFinalCta from "./WorkshopFinalCta";
import WorkshopFooter from "./WorkshopFooter";
import WorkshopHeader from "./WorkshopHeader";
import WorkshopHero from "./WorkshopHero";
import WorkshopInstructor from "./WorkshopInstructor";
import WorkshopStickyBar from "./WorkshopStickyBar";
import WorkshopTestimonials from "./WorkshopTestimonials";
import { useWorkshopCheckout } from "./useWorkshopCheckout";
import { WS_FONT_UI } from "./workshop-styles";

interface WorkshopPageProps {
  course: Course;
  navCourses: NavCourse[];
  pathname: string;
}

/** Página de venta de un taller (`course.type === "WORKSHOP"`). */
const WorkshopPage = ({ course, navCourses, pathname }: WorkshopPageProps) => {
  const buyCardRef = useRef<HTMLDivElement>(null);
  const { checkoutUrl, openCheckout } = useWorkshopCheckout(course);
  const onCheckout = checkoutUrl ? openCheckout : undefined;
  const content = getWorkshopContent(course.slug);

  const hasDiscount =
    course.discountPrice != null &&
    course.regularPrice != null &&
    course.discountPrice < course.regularPrice;
  const price = (hasDiscount ? course.discountPrice : course.regularPrice) ?? 0;
  const priceLabel = formatPrice(price);

  // `schedules.items` ya viene ordenado por fecha: el primero es el más próximo.
  const nextSchedule = course.schedules?.items[0];
  const startsAt = nextSchedule?.startsAt;
  const endsAt = nextSchedule?.endsAt;
  const hasPromoBanner = Boolean(course.promo?.endsAt);
  // Un solo enlace de transferencia para la tarjeta y el FAQ: siempre el mismo mensaje.
  const transferUrl = getTransferWhatsappUrl(course.title, price, startsAt);

  return (
    // Sin chat automático: en esta página tapaba la tarjeta de compra. El botón queda,
    // con un mensaje sobre este taller en vez del genérico de los cursos de Java.
    <AppShell
      navCourses={navCourses}
      pathname={pathname}
      autoOpenWhatsApp={false}
      whatsappMessage={getQuestionWhatsappMessage(course.title)}
    >
      <PromoCountdownProvider endsAt={course.promo?.endsAt}>
        <div className={`${WS_FONT_UI} min-h-screen bg-[#0b0d10] text-[#eceef1] antialiased`}>
          {/* La API manda `promo: {}` sin promoción: solo se muestra con fecha de fin. */}
          {hasPromoBanner && course.promo && <CourseDiscountBanner promo={course.promo} />}
          <WorkshopHeader
            priceLabel={priceLabel}
            onCheckout={onCheckout}
            hasPromoBanner={hasPromoBanner}
          />
          <main>
            <WorkshopHero
              ref={buyCardRef}
              course={course}
              price={price}
              regularPrice={hasDiscount ? course.regularPrice : undefined}
              startsAt={startsAt}
              endsAt={endsAt}
              onCheckout={onCheckout}
              transferUrl={transferUrl}
            />
            <WorkshopCodeShowcase content={content} />
            {course.sections && (
              <WorkshopAgenda sections={course.sections} startsAt={startsAt} />
            )}
            <WorkshopAudience
              audience={content.audience}
              prerequisites={course.prerequisites}
            />
            <WorkshopInstructor />
            <WorkshopTestimonials testimonials={content.testimonials} />
            <WorkshopFaq
              course={course}
              price={price}
              transferUrl={transferUrl}
              extraFaq={content.faq}
            />
            <WorkshopFinalCta
              price={price}
              startsAt={startsAt}
              endsAt={endsAt}
              headline={content.finalCtaHeadline}
              onCheckout={onCheckout}
            />
          </main>
          <WorkshopFooter />
          <WorkshopStickyBar
            targetRef={buyCardRef}
            title={course.title}
            priceLabel={priceLabel}
            subtitle={startsAt ? formatWorkshopShortDate(startsAt) : undefined}
            onCheckout={onCheckout}
          />
        </div>
      </PromoCountdownProvider>
    </AppShell>
  );
};

export default WorkshopPage;
