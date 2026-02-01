"use client";

import { ReactNode } from "react";
import { ConvexClientProvider } from "@/providers/convex-provider";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
