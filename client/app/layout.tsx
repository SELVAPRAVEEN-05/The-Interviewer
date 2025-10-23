import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "https://c8.alamy.com/comp/2Y4W69N/google-duo-and-meet-are-merging-logo-png-2Y4W69N.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "white",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("font-poppins m-0", fontSans.variable)}>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "light",
            enableSystem: false,
          }}
        >
          <div
            id="scroll-container"
            className="h-screen  w-screen
            overflow-y-auto
            overflow-hidden
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-track]:bg-[transparent]
            [&::-webkit-scrollbar-thumb]:bg-primary"
          >
            {/* <Navbar />  */}

            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
