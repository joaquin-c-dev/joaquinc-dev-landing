import { useEffect, useState } from "react";
import { WS_FONT_MONO } from "./workshop-styles";

interface WorkshopCountdownProps {
  startsAt: string;
}

const UNITS = [
  { label: "días", ms: 86_400_000, mod: Infinity },
  { label: "horas", ms: 3_600_000, mod: 24 },
  { label: "min", ms: 60_000, mod: 60 },
  { label: "seg", ms: 1_000, mod: 60 },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Cuenta regresiva al inicio del taller. `now` arranca en null para que el HTML del
 * servidor y el primer render del cliente coincidan (sin error de hidratación); el
 * tiempo real aparece al montar. Se oculta cuando el taller ya empezó.
 */
const WorkshopCountdown = ({ startsAt }: WorkshopCountdownProps) => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now == null ? null : new Date(startsAt).getTime() - now;
  if (remaining != null && remaining <= 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <span className={`${WS_FONT_MONO} text-xs tracking-[0.04em] text-[#9aa3ae]`}>
        EL TALLER EMPIEZA EN
      </span>
      <div className="grid grid-cols-4 gap-2">
        {UNITS.map((unit) => {
          const value =
            remaining == null
              ? null
              : Math.floor(remaining / unit.ms) % unit.mod;
          return (
            <div
              key={unit.label}
              className="flex flex-col items-center gap-0.5 rounded-[10px] border border-white/[0.07] bg-[#0b0d10] py-3"
            >
              <span className={`${WS_FONT_MONO} text-2xl font-medium tabular-nums`}>
                {value == null ? "--" : pad(value)}
              </span>
              <span className="text-[11px] text-[#9aa3ae]">{unit.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkshopCountdown;
