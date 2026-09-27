import { INSTRUCTOR_PROFILE } from "@/lib/workshop-content";
import { WS_BAND, WS_CONTAINER, WS_EYEBROW, WS_H2, WS_LINK } from "./workshop-styles";

const WorkshopInstructor = () => (
  <section className={WS_BAND}>
    <div
      className={`${WS_CONTAINER} grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-12 py-[88px]`}
    >
      <img
        src={INSTRUCTOR_PROFILE.photo}
        alt={INSTRUCTOR_PROFILE.name}
        className="aspect-[4/5] w-full max-w-[380px] rounded-[14px] border border-white/[0.09] object-cover"
      />
      <div className="flex flex-col gap-4">
        <span className={WS_EYEBROW}>TU INSTRUCTOR</span>
        <h2 className={WS_H2}>{INSTRUCTOR_PROFILE.name}</h2>
        <p className="max-w-[560px] text-[17px] leading-[1.65] text-[#aab2bc]">
          {INSTRUCTOR_PROFILE.bio}
        </p>
        <a
          href={INSTRUCTOR_PROFILE.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${WS_LINK} text-[15px] font-medium`}
        >
          Ver perfil en LinkedIn →
        </a>
      </div>
    </div>
  </section>
);

export default WorkshopInstructor;
