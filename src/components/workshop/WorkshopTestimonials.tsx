import type { WorkshopTestimonial } from "@/lib/workshop-content";
import { WS_CONTAINER, WS_EYEBROW, WS_H2 } from "./workshop-styles";

/** Tarjeta tipo reseña de Google: el mismo formato de las historias "Referencias". */
const REVIEW_FONT = "font-['Roboto',ui-sans-serif,system-ui,sans-serif]";

const STAR_CLASS = {
  full: "text-[#fbbc04]",
  half: "bg-[linear-gradient(90deg,#fbbc04_50%,#dadce0_50%)] bg-clip-text text-transparent",
  off: "text-[#dadce0]",
} as const;

/** Estrellas = NPS / 2, con media estrella (NPS 9 -> 4.5). */
const Stars = ({ rating }: { rating: number }) => (
  <span className="flex gap-0.5 text-[22px] leading-none" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((k) => {
      const kind = k <= rating ? "full" : k - 0.5 <= rating ? "half" : "off";
      return (
        <span key={k} className={STAR_CLASS[kind]}>
          ★
        </span>
      );
    })}
  </span>
);

const ReviewCard = ({ testimonial }: { testimonial: WorkshopTestimonial }) => {
  const rating = testimonial.nps / 2;

  return (
    <figure
      className={`${REVIEW_FONT} flex flex-col rounded-[14px] bg-white p-6 text-[#202124] shadow-[0_30px_80px_rgba(0,0,0,0.45)]`}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl font-medium text-white"
          style={{ background: testimonial.avatarColor }}
        >
          {testimonial.name.charAt(0)}
        </span>
        <figcaption className="min-w-0">
          <span className="block text-[17px] font-bold leading-tight">{testimonial.name}</span>
          <span className="text-[13px] text-[#5f6368]">Exalumno</span>
        </figcaption>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Stars rating={rating} />
        <span className="text-[15px] font-bold">{rating.toFixed(1)}</span>
        <span className="text-[13px] text-[#5f6368]">· {testimonial.date}</span>
      </div>

      <blockquote className="mb-4 mt-3 text-[15px] leading-[1.5] text-[#3c4043]">
        {testimonial.quote}
      </blockquote>

      <div className="mt-auto flex flex-wrap items-center gap-2.5 border-t border-[#e8eaed] pt-3.5">
        <span className="rounded-full bg-[#e8f0fe] px-2.5 py-1 text-xs font-medium text-[#1a73e8]">
          {testimonial.course}
        </span>
        <span className="text-xs font-medium text-[#188038]">✓ Alumno verificado</span>
      </div>
    </figure>
  );
};

/** Solo testimonios reales: si no hay, la sección no se muestra. */
const WorkshopTestimonials = ({ testimonials }: { testimonials?: WorkshopTestimonial[] }) => {
  if (!testimonials?.length) return null;

  return (
    <section className={`${WS_CONTAINER} py-[88px]`}>
      <div className="mb-10 flex flex-col gap-3.5">
        <span className={WS_EYEBROW}>LO QUE DICEN MIS ALUMNOS</span>
        <h2 className={WS_H2}>Aprenden haciendo</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {testimonials.map((testimonial) => (
          <ReviewCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default WorkshopTestimonials;
