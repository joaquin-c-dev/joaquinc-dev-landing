import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface CountdownContextType {
  timeLeft: CountdownState;
  formatNumber: (num: number) => string;
}

const CountdownContext = createContext<CountdownContextType | undefined>(undefined);

const COUNTDOWN_DURATION = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
const STORAGE_KEY = 'countdown_end_time';

export const CountdownProvider = ({ children }: { children: ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    hours: 5,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    // Get or set end time
    let endTime = localStorage.getItem(STORAGE_KEY);
    if (!endTime) {
      const newEndTime = Date.now() + COUNTDOWN_DURATION;
      localStorage.setItem(STORAGE_KEY, newEndTime.toString());
      endTime = newEndTime.toString();
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = parseInt(endTime!) - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds, isExpired: false });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        clearInterval(timer);
      }
    }, 1000);

    // Initial calculation
    const now = Date.now();
    const difference = parseInt(endTime) - now;
    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds, isExpired: false });
    } else {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
    }

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <CountdownContext.Provider value={{ timeLeft, formatNumber }}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (context === undefined) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }
  return context;
};