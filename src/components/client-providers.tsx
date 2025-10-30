"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const ConvexClientProvider = dynamic(
  () => import("@/providers/convex-provider").then((mod) => ({ default: mod.ConvexClientProvider })),
  {
    ssr: false,
  }
);

export function ClientProviders({ children }: { children: ReactNode }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}