"use client";

import type { ThemeProviderProps } from "next-themes";
import { LiveblocksProvider } from "@liveblocks/react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

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
  const [storedName, setStoredName] = useState<string>("");

  // ✅ Only access localStorage on the client side
  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    setStoredName(name);
  }, []);

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <LiveblocksProvider
          authEndpoint={`/api/liveblocks-auth?name=${storedName}`}
        >
          {children}
        </LiveblocksProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
