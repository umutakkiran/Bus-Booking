"use client";

import { ReactNode, createContext, useState } from "react";
import { useExpeditions } from "../../../services/useExpeditions";
import { Expedition } from "../../../classes/Expedition";

export const GenericContext = createContext<Expedition[]>([]);


export function MyContextProvider({ children }: { children: ReactNode }) {

    const { expeditionInfo} = useExpeditions();

    
      return (
        <GenericContext.Provider value={expeditionInfo}>
          {children}
        </GenericContext.Provider>
      );
}
