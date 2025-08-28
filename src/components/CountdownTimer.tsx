import { useState, useEffect } from "react";

interface CountdownTimerProps {
  className?: string;
  textColor?: string;
}

const CountdownTimer = ({ className = "", textColor = "text-white" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set initial time to 5 hours from now
    const endTime = Date.now() + (5 * 60 * 60 * 1000); // 5 hours in milliseconds

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className={`${textColor} font-mono font-bold`}>
        ⏰ {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;