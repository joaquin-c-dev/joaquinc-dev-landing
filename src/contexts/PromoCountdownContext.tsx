import {
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

interface PromoCountdownContextType {
  timeLeft: CountdownState;
  formatNumber: (num: number) => string;
}

const PromoCountdownContext = createContext<
  PromoCountdownContextType | undefined
>(undefined);

interface PromoCountdownProviderProps {
  /** ISO fecha de fin de promo. Sin valor = countdown expirado. */
  endsAt?: string | null;
  children: ReactNode;
}

export function PromoCountdownProvider({
  endsAt,
  children,
}: PromoCountdownProviderProps) {
  const endTimestamp = endsAt ? new Date(endsAt).getTime() : 0;

  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: true,
  });

  useEffect(() => {
    if (!endTimestamp) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      });
      return;
    }

    const calculateTimeLeft = () => {
      const difference = endTimestamp - Date.now();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTimestamp]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <PromoCountdownContext.Provider value={{ timeLeft, formatNumber }}>
      {children}
    </PromoCountdownContext.Provider>
  );
}

export function usePromoCountdown() {
  const context = useContext(PromoCountdownContext);
  if (!context) {
    throw new Error(
      "usePromoCountdown must be used within a PromoCountdownProvider",
    );
  }
  return context;
}
