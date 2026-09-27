import { WS_CONTAINER } from "./workshop-styles";

/** Mismas redes que el `Footer` del sitio. */
const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579829160975" },
  { label: "Instagram", href: "https://instagram.com/joaquinc.dev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joaquincr/" },
];

/**
 * Footer de una fila. El padding inferior (160px) deja libre la barra fija y el botón
 * de WhatsApp, que sube a 88px mientras la barra está visible y mide 56px.
 */
const WorkshopFooter = () => (
  <footer className="border-t border-white/[0.07]">
    <div
      className={`${WS_CONTAINER} flex flex-wrap items-center justify-between gap-4 pb-40 pt-8 text-[13px] text-[#8a929c]`}
    >
      <span>© {new Date().getFullYear()} Joaquín Coronado · Java Developer</span>
      <div className="flex gap-5">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9aa3ae] hover:text-[#eceef1]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default WorkshopFooter;
