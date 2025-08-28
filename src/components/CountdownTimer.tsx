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
       Por tiempo limitado: ⏰ {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;