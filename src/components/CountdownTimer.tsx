import { useCountdown } from "@/contexts/CountdownContext";

interface CountdownTimerProps {
  className?: string;
  textColor?: string;
}

const CountdownTimer = ({ className = "", textColor = "text-white" }: CountdownTimerProps) => {
  const { timeLeft, formatNumber } = useCountdown();

  if (timeLeft.isExpired) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className={`${textColor} font-mono font-bold`}>
       ⏰ {formatNumber(timeLeft.hours)} h {formatNumber(timeLeft.minutes)} min {formatNumber(timeLeft.seconds)} s
      </span>
    </div>
  );
};

export default CountdownTimer;