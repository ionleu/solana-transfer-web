import type { FC, ReactNode } from "react";
import React, { createContext, useContext } from "react";
import { useLocalStorage } from "@solana/wallet-adapter-react";

export interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect(autoConnect: boolean): void;
}

export const AutoConnectContext = createContext<AutoConnectContextState>(
  {} as AutoConnectContextState
);

export const useAutoConnect = (): AutoConnectContextState =>
  useContext(AutoConnectContext);

export const AutoConnectProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoConnect, setAutoConnect] = useLocalStorage("autoConnect", true);

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};
