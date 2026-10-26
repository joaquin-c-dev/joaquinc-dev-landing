import { FolderGit2, MessageCircle, PlayCircle, Users, Video } from "lucide-react";
import { CLASS_PHOTOS } from "@/lib/class-photos";
import ZoomFrame from "./ZoomFrame";
import { HOME_CONTAINER, HOME_EYEBROW, HOME_H2, HOME_MUTED, reveal } from "./home-theme";

const FEATURES = [
  { icon: Video, title: "En vivo por Zoom", text: "Programo en pantalla y tú conmigo. Preguntas en el momento, no en un foro." },
  { icon: FolderGit2, title: "Proyecto real", text: "Construyes una aplicación completa que puedes mostrar en entrevistas." },
  { icon: PlayCircle, title: "Grabación de cada clase", text: "Si faltas o quieres repasar, la clase queda disponible." },
  { icon: MessageCircle, title: "Soporte por WhatsApp", text: "Grupo con tus compañeros y conmigo para resolver dudas entre clases." },
  { icon: Users, title: "Grupos pequeños", text: "Pocos alumnos por grupo para revisar tu código, no solo el mío." },
];

/** "Así son las clases": capturas reales de Zoom y lo que incluye cada curso. */
const HomeClasses = () => (
  <section className="border-y border-white/[0.07] bg-[#0e1014] py-24 md:py-32">
    <div className={HOME_CONTAINER}>
      <div className="max-w-[640px]">
        <p {...reveal(0)} className={HOME_EYEBROW}>
          {"// así son las clases"}
        </p>
        <h2 {...reveal(70)} className={`${HOME_H2} mt-4`}>
          Clases de verdad, con personas de verdad
        </h2>
        <p {...reveal(140)} className={`mt-4 text-[17px] leading-[1.6] ${HOME_MUTED}`}>
          Nada de videos pregrabados: nos vemos en Zoom, programamos juntos y resolvemos tus dudas al momento.
        </p>
      </div>

      <div
        className="mt-14 grid gap-5 md:grid-cols-3"
      >
        {CLASS_PHOTOS.map((photo, index) => (
          <div key={photo.src} {...reveal(index * 90)}>
            <ZoomFrame photo={photo} />
          </div>
        ))}
      </div>

      <ul
        className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
      >
        {FEATURES.map(({ icon: Icon, title, text }, index) => (
          <li key={title} {...reveal(index * 60)}>
            <Icon className="h-5 w-5 text-[#ffc66d]" aria-hidden />
            <h3 className="mt-3 text-[16px] font-semibold text-white">{title}</h3>
            <p className={`mt-1.5 text-[14px] leading-[1.55] ${HOME_MUTED}`}>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomeClasses;
