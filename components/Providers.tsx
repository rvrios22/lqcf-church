"use client";

import { useRouter } from "next/navigation";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <ConvexProvider client={convex}>
      <HeroUIProvider navigate={router.push}>
        {children}
        <ToastProvider />
      </HeroUIProvider>
    </ConvexProvider>
  );
}

export default Providers;
