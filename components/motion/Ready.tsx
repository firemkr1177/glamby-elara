"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * "Ready" = nothing is covering the page (first-visit intro finished, or the
 * page-transition curtain has started lifting). Entrance animations wait for it
 * so they never play hidden behind an overlay.
 */
type ReadyState = { ready: boolean; setReady: (ready: boolean) => void };

const ReadyContext = createContext<ReadyState>({ ready: true, setReady: () => {} });

export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>;
}

export const useReady = () => useContext(ReadyContext).ready;
export const useSetReady = () => useContext(ReadyContext).setReady;

/** True from the first moment this component's page is uncovered, and stays true
 *  (so nothing animates back out while the next page's curtain comes down). */
export function useShown() {
  const ready = useReady();
  const [shown, setShown] = useState(ready);
  if (ready && !shown) setShown(true);
  return shown;
}
