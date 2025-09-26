"use client";

import type { ThemeProviderProps } from "next-themes";
import { LiveblocksProvider } from "@liveblocks/react";
import { PropsWithChildren } from "react";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
     
      <NextThemesProvider {...themeProps}>
        {/* <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        </LiveblocksProvider> */}

        {children}
        
        </NextThemesProvider>
    </HeroUIProvider>
  );
}
