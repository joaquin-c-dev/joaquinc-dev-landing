import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface CountdownContextType {
  timeLeft: CountdownState;
  formatNumber: (num: number) => string;
}

export const CountdownIntermedioContext = createContext<CountdownContextType | undefined>(undefined);

// Promotion extended through Saturday April 18, 2026 at 23:59:59 Mexico time (UTC-6)
const END_DATE = new Date("2026-04-18T23:59:59-06:00").getTime();

export const CountdownIntermedioProvider = ({ children }: { children: ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = END_DATE - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      }
    };

    // Calculate initial time
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <CountdownIntermedioContext.Provider value={{ timeLeft, formatNumber }}>
      {children}
    </CountdownIntermedioContext.Provider>
  );
};

export const useCountdownIntermedio = () => {
  const context = useContext(CountdownIntermedioContext);
  if (context === undefined) {
    throw new Error("useCountdownIntermedio must be used within a CountdownIntermedioProvider");
  }
  return context;
};
