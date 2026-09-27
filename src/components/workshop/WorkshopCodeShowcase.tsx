import type { WorkshopContent } from "@/lib/workshop-content";
import IdeCodeWindow from "./IdeCodeWindow";
import { WS_BAND, WS_CONTAINER, WS_EYEBROW, WS_H2 } from "./workshop-styles";

interface WorkshopCodeShowcaseProps {
  content: WorkshopContent;
}

/** "Lo que te llevas" + editor de código. Sin snippet, el texto ocupa todo el ancho. */
const WorkshopCodeShowcase = ({ content }: WorkshopCodeShowcaseProps) => (
  <section className={WS_BAND}>
    <div
      className={`${WS_CONTAINER} grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-14 py-20`}
    >
      <div className="flex flex-col gap-5">
        <span className={WS_EYEBROW}>LO QUE TE LLEVAS</span>
        <h2 className={WS_H2}>No son diapositivas. Es código que escribes tú.</h2>
        <div className="mt-2 flex flex-col gap-[18px]">
          {content.takeaways.map((item) => (
            <div key={item.title} className="flex flex-col gap-1">
              <span className="font-semibold">{item.title}</span>
              <span className="leading-[1.55] text-[#9aa3ae]">{item.description}</span>
            </div>
          ))}
        </div>
      </div>

      {content.codeShowcase && <IdeCodeWindow showcase={content.codeShowcase} />}
    </div>
  </section>
);

export default WorkshopCodeShowcase;
