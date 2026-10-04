import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      className={`${REVIEW_FONT} flex w-[calc(100vw-4.5rem)] max-w-[340px] shrink-0 snap-start flex-col rounded-[14px] bg-white p-6 text-[#202124] shadow-[0_16px_36px_rgba(0,0,0,0.4)]`}
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

/** Cada cuánto avanza solo una reseña, y cuánto espera tras tocarlo para volver a avanzar. */
const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_MS = 7000;

/**
 * Alineado con el contenedor de la página: 24 px en celular y, en pantallas anchas, el
 * mismo margen que el resto de las secciones (máx. 1160 px).
 */
const TRACK_GUTTER = "px-[max(1.5rem,calc((100vw-1160px)/2+1.5rem))]";
const TRACK_SCROLL_PADDING = "scroll-px-[max(1.5rem,calc((100vw-1160px)/2+1.5rem))]";

/** "4.7": promedio de estrellas (NPS / 2) de las reseñas que se muestran. */
const averageRating = (testimonials: WorkshopTestimonial[]) =>
  (testimonials.reduce((sum, t) => sum + t.nps / 2, 0) / testimonials.length).toFixed(1);

/**
 * Carrusel de reseñas: avanza solo una tarjeta cada pocos segundos y también se desliza
 * con el dedo (scroll nativo con snap), con flechas en escritorio y puntos para saltar a
 * una reseña. Cualquier interacción pausa el avance automático un rato; no avanza si la
 * sección no está en pantalla ni con `prefers-reduced-motion`.
 */
const WorkshopTestimonials = ({ testimonials }: { testimonials?: WorkshopTestimonial[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const inView = useRef(false);
  const count = testimonials?.length ?? 0;

  const cardLeft = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return 0;
    return card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
  }, []);

  const goTo = useCallback(
    (index: number) => trackRef.current?.scrollTo({ left: cardLeft(index), behavior: "smooth" }),
    [cardLeft],
  );

  const pauseAutoAdvance = useCallback(() => {
    pausedUntil.current = Date.now() + RESUME_AFTER_MS;
  }, []);

  // La tarjeta activa sale de la posición del scroll (sirve igual para el dedo y para el auto).
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    let nearest = 0;
    if (atEnd) nearest = count - 1;
    else {
      let best = Infinity;
      for (let i = 0; i < count; i++) {
        const distance = Math.abs(cardLeft(i) - track.scrollLeft);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      }
    }
    activeRef.current = nearest;
    setActive(nearest);
  }, [cardLeft, count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    observer.observe(track);
    const id = window.setInterval(() => {
      const idle = Date.now() >= pausedUntil.current;
      if (reducedMotion || document.hidden || !inView.current || hovering.current || !idle) return;
      goTo((activeRef.current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(id);
    };
  }, [count, goTo]);

  if (!testimonials?.length) return null;

  const step = (delta: number) => {
    pauseAutoAdvance();
    goTo((active + delta + count) % count);
  };

  return (
    <section className="py-10 md:py-[64px]">
      <div className={`${WS_CONTAINER} mb-6 flex items-end justify-between gap-4 md:mb-8`}>
        <div className="flex flex-col gap-3.5">
          <span className={WS_EYEBROW}>LO QUE DICEN MIS ALUMNOS</span>
          <h2 className={WS_H2}>Aprenden haciendo</h2>
          <p className="flex flex-wrap items-center gap-x-2 text-[15px] text-[#aab2bc]">
            <span className="text-lg text-[#fbbc04]" aria-hidden="true">
              ★
            </span>
            <span className="font-semibold text-[#eceef1]">{averageRating(testimonials)}</span>
            <span>
              · {count} {count === 1 ? "reseña" : "reseñas"} de exalumnos verificados
            </span>
          </p>
        </div>
        {count > 1 && (
          <div className="hidden shrink-0 gap-2 md:flex">
            {[
              { delta: -1, label: "Reseña anterior", Icon: ChevronLeft },
              { delta: 1, label: "Siguiente reseña", Icon: ChevronRight },
            ].map(({ delta, label, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => step(delta)}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-[#d5dae0] transition-colors hover:border-white/30 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={pauseAutoAdvance}
        onTouchStart={pauseAutoAdvance}
        onWheel={pauseAutoAdvance}
        onFocus={pauseAutoAdvance}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
        className={`relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-2 ${TRACK_GUTTER} ${TRACK_SCROLL_PADDING} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {testimonials.map((testimonial) => (
          <ReviewCard key={testimonial.name} testimonial={testimonial} />
        ))}
        {/* Safari ignora el padding derecho en contenedores con scroll. */}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>

      {count > 1 && (
        <div className="flex justify-center">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => {
                pauseAutoAdvance();
                goTo(index);
              }}
              aria-label={`Ver reseña de ${testimonial.name}`}
              aria-current={index === active}
              className="p-2"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-[#ffc66d]" : "w-2 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkshopTestimonials;
