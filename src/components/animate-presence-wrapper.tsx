"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatePresenceWrapperProps {
  children: ReactNode;
  mode?: "wait" | "sync" | "popLayout";
  initial?: boolean;
}

export function AnimatePresenceWrapper({
  children,
  mode = "popLayout",
  initial = true,
}: AnimatePresenceWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode={mode} initial={initial}>
      {children}
    </AnimatePresence>
  );
}