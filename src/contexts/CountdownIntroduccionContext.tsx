import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

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

export const CountdownIntroduccionContext = createContext<
  CountdownContextType | undefined
>(undefined);

// Fixed end date for Introducción a la Programación - February 28, 2026 at 23:59:59 Mexico time (UTC-6)
const END_DATE = new Date("2026-05-02T23:59:59-06:00").getTime();

export const CountdownIntroduccionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
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
    <CountdownIntroduccionContext.Provider value={{ timeLeft, formatNumber }}>
      {children}
    </CountdownIntroduccionContext.Provider>
  );
};

export const useCountdownIntroduccion = () => {
  const context = useContext(CountdownIntroduccionContext);
  if (context === undefined) {
    throw new Error(
      "useCountdownIntroduccion must be used within a CountdownIntroduccionProvider",
    );
  }
  return context;
};
