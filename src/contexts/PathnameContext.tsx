import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "@/lib/router";

const PathnameContext = createContext<string | undefined>(undefined);

interface PathnameProviderProps {
  pathname?: string;
  children: ReactNode;
}

export function PathnameProvider({
  pathname,
  children,
}: PathnameProviderProps) {
  return (
    <PathnameContext.Provider value={pathname}>
      {children}
    </PathnameContext.Provider>
  );
}

/** Pathname for nav highlighting; uses the SSR value until hydrated to avoid tab flash. */
export function useActivePathname(): string {
  const serverPathname = useContext(PathnameContext);
  const { pathname: clientPathname } = useLocation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated && serverPathname) {
    return serverPathname;
  }

  return clientPathname;
}
