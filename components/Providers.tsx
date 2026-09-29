"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { ReadyProvider } from "./motion/Ready";
import { SmoothScroll } from "./motion/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReadyProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ReadyProvider>
    </MotionConfig>
  );
}
