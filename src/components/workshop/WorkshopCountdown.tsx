import { WS_FONT_MONO } from "./workshop-styles";

interface WorkshopCountdownProps {
  startsAt: string;
}

const UNITS = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
] as const;

/**
 * Cuenta regresiva al inicio del taller, como HTML sin hidratar: el servidor pinta "--" y
 * `scripts/workshop-page.ts` pone el tiempo real cada segundo y la oculta cuando ya empezó.
 */
const WorkshopCountdown = ({ startsAt }: WorkshopCountdownProps) => (
  <div data-countdown-to={startsAt} className="flex flex-col gap-2.5">
    <span className={`${WS_FONT_MONO} text-xs tracking-[0.04em] text-[#9aa3ae]`}>EL TALLER EMPIEZA EN</span>
    <div className="grid grid-cols-4 gap-2">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex flex-col items-center gap-0.5 rounded-[10px] border border-white/[0.07] bg-[#0b0d10] py-3"
        >
          <span data-unit={unit.key} className={`${WS_FONT_MONO} text-2xl font-medium tabular-nums`}>
            --
          </span>
          <span className="text-[11px] text-[#9aa3ae]">{unit.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default WorkshopCountdown;
