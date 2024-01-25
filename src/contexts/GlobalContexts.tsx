import { createContext, ReactNode } from "react";

interface GlobalContextData {}

interface GlobalProps {
  children: ReactNode;
}

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalContextProvider = ({ children }: GlobalProps) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
