"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface NavbarContextType {
  isWhite: boolean;
  setIsWhite: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isWhite, setIsWhite] = useState(false); // default background

  return <NavbarContext.Provider value={{ isWhite, setIsWhite }}>{children}</NavbarContext.Provider>;
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("useNavbarContext must be used within a NavbarProvider");
  return context;
};
