import * as React from "react";

const LAPTOP_BREAKPOINT = 1280;

export function useIsLaptop() {
  const [isLaptop, setIsTablet] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${LAPTOP_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTablet(window.innerWidth < LAPTOP_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTablet(window.innerWidth < LAPTOP_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isLaptop;
}
