import { useContext } from "react";
import { CountdownIntermedioContext } from "@/contexts/CountdownIntermedioContext";

interface CountdownTimerIntermedioProps {
  className?: string;
  textColor?: string;
}

const CountdownTimerIntermedio = ({ className = "", textColor = "text-white" }: CountdownTimerIntermedioProps) => {
  const context = useContext(CountdownIntermedioContext);
  
  // Return null if context is not available (provider not ready yet)
  if (!context) {
    return null;
  }
  
  const { timeLeft, formatNumber } = context;

  if (timeLeft.isExpired) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className={`${textColor} font-mono font-bold`}>
        ⏰ {timeLeft.days > 0 && `${formatNumber(timeLeft.days)}d `}{formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}min {formatNumber(timeLeft.seconds)}s
      </span>
    </div>
  );
};

export default CountdownTimerIntermedio;
