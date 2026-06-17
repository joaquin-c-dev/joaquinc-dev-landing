/**
 * Shim minimo de navegacion para reemplazar `react-router-dom`.
 *
 * En Astro cada pagina es un documento real (MPA), por lo que no hay un router
 * SPA. Este modulo reproduce la pequeña superficie de `react-router-dom` que
 * usa el proyecto (`useNavigate`, `useLocation`, `Link`) usando navegacion
 * nativa del navegador. Es seguro en SSR (no toca `window` en el servidor).
 */
import * as React from "react";

export interface Location {
  pathname: string;
  search: string;
  hash: string;
}

const SSR_LOCATION: Location = { pathname: "/", search: "", hash: "" };

let cachedLocation: Location = SSR_LOCATION;

function readLocation(): Location {
  const pathname = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  if (
    cachedLocation.pathname === pathname &&
    cachedLocation.search === search &&
    cachedLocation.hash === hash
  ) {
    return cachedLocation;
  }

  cachedLocation = { pathname, search, hash };
  return cachedLocation;
}

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

export function useLocation(): Location {
  return React.useSyncExternalStore(
    subscribeToLocation,
    readLocation,
    () => SSR_LOCATION,
  );
}

interface NavigateOptions {
  replace?: boolean;
}

export function useNavigate() {
  return (to: string | number, options?: NavigateOptions) => {
    if (typeof window === "undefined") return;
    if (typeof to === "number") {
      window.history.go(to);
      return;
    }
    if (options?.replace) {
      window.location.replace(to);
    } else {
      window.location.assign(to);
    }
  };
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...rest }, ref) => (
    <a ref={ref} href={to} {...rest}>
      {children}
    </a>
  ),
);
Link.displayName = "Link";
