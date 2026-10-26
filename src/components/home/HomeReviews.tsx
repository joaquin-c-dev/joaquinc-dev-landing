import { Star } from "lucide-react";
import type { WorkshopTestimonial } from "@/lib/workshop-content";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "./home-theme";

interface HomeReviewsProps {
  testimonials: WorkshopTestimonial[];
  rating: number;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Stars = ({ count }: { count: number }) => (
  <span className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        aria-hidden
        className={`h-4 w-4 ${index < Math.round(count) ? "fill-[#ffc66d] text-[#ffc66d]" : "text-white/20"}`}
      />
    ))}
  </span>
);

/** Reseñas reales de alumnos, grandes y fáciles de leer. */
const HomeReviews = ({ testimonials, rating }: HomeReviewsProps) => {
  if (!testimonials.length) return null;
  return (
    <section className="border-t border-white/[0.07] py-24 md:py-32">
      <div className={HOME_CONTAINER}>
        <div className="max-w-[640px]">
          <p {...reveal(0)} className={HOME_EYEBROW}>
            {"// lo que dicen los alumnos"}
          </p>
          <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
            {rating.toFixed(1)} de 5 en {testimonials.length} reseñas
          </h2>
        </div>

        <div
          className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3"
        >
          {testimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${testimonial.date}`}
              {...reveal(index * 70)}
              className="mb-5 break-inside-avoid rounded-[14px] border border-white/[0.08] bg-[#12151a] p-6"
            >
              <Stars count={testimonial.nps / 2} />
              <blockquote className="mt-4 text-[16px] leading-[1.65] text-[#e3e5e9]">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                  style={{ backgroundColor: testimonial.avatarColor }}
                >
                  {initials(testimonial.name)}
                </span>
                <span className="text-[13.5px]">
                  <span className="block font-medium text-white">{testimonial.name}</span>
                  <span className={HOME_MUTED}>
                    {testimonial.course} · {testimonial.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeReviews;
