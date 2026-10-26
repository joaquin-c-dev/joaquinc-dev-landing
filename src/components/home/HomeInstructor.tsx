import { ArrowRight } from "lucide-react";
import { INSTRUCTOR_PROFILE } from "@/lib/workshop-content";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "./home-theme";

const FACTS = ["+10 años en backend en empresas Fortune 500", "+8 años formando desarrolladores"];
const FACT_CLASS = "rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13.5px] text-[#d5d8dd]";

/** Quién enseña: foto, bio corta y link a la página completa. */
const HomeInstructor = () => (
  <section className="py-24 md:py-32">
    <div
      className={`${HOME_CONTAINER} grid items-center gap-12 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16`}
    >
      <div {...reveal(0)} className="relative mx-auto w-full max-w-[380px]">
        <div aria-hidden className="absolute -inset-3 rounded-[22px] bg-[radial-gradient(closest-side,rgba(255,198,109,0.18),transparent)]" />
        <img
          src={INSTRUCTOR_PROFILE.photo}
          alt={`Foto de ${INSTRUCTOR_PROFILE.name}`}
          width={380}
          height={460}
          loading="lazy"
          className="relative aspect-[38/46] w-full rounded-[18px] border border-white/10 object-cover"
        />
      </div>
      <div>
        <p {...reveal(70)} className={HOME_EYEBROW}>
          {"// quién te enseña"}
        </p>
        <h2 {...reveal(140)} className={`${HOME_H2} mt-4`}>
          {INSTRUCTOR_PROFILE.name}
        </h2>
        <p {...reveal(210)} className={`mt-5 max-w-[560px] text-[17px] leading-[1.65] ${HOME_MUTED}`}>
          {INSTRUCTOR_PROFILE.bio}
        </p>
        <ul {...reveal(280)} className="mt-7 flex flex-wrap gap-2.5">
          <li className={FACT_CLASS}>
            Líder Técnico en{" "}
            <a
              href={INSTRUCTOR_PROFILE.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffc66d] underline-offset-2 hover:underline"
            >
              {INSTRUCTOR_PROFILE.company.name}
            </a>
          </li>
          {FACTS.map((fact) => (
            <li key={fact} className={FACT_CLASS}>
              {fact}
            </li>
          ))}
        </ul>
        <a
          {...reveal(350)}
          href="/acerca-de-mi"
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-[#ffc66d] transition-colors hover:text-[#ffd899]"
        >
          Conoce mi trayectoria
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  </section>
);

export default HomeInstructor;
