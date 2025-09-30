"use client";

import { siteConfig } from "@/config/site";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import photo from "./assets/logo.png";

export const Navbar = () => {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState(
    siteConfig.navItems[0]?.targetId || ""
  );
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    const handleScrollSpy = () => {
      const sections = siteConfig.navItems.map((item) =>
        document.getElementById(item.targetId)
      );

      if (!container) return;
      const scrollPosition = container.scrollTop + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(siteConfig.navItems[i].targetId);
          break;
        }
      }
    };

    container?.addEventListener("wheel", handleScrollSpy);
    handleScrollSpy(); // initial run

    return () => container?.removeEventListener("wheel", handleScrollSpy);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(
        `[data-target="${activeSection}"]`
      ) as HTMLElement;
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        setUnderlineStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width,
        });
      }
    }
  }, [activeSection]);

  const handleNavClick = (targetId: string) => {
    setActiveSection(targetId);
    handleScroll(targetId);
  };

  return (
    <HeroUINavbar
      maxWidth="full"
      className="flex bg-opacity-30 shadow-lg   "
      position="sticky"
    >
      <div className="w-full lg:px-12 xl:px-28 flex justify-between items-center">
        {/* Logo */}
        <div className="gap-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={photo} alt="Logo" width={150} />
          </NextLink>
        </div>

        {/* Nav links */}
        <div
          className="hidden lg:flex gap-4 justify-start relative"
          ref={navRef}
        >
          {/* Animated underline */}
          <div
            className="absolute bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out rounded-full"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
              transform: "translateY(8px)",
            }}
          />

          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.targetId}>
              <button
                data-target={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "cursor-pointer transition-colors duration-200 relative mx-2 pt-2 ",
                  activeSection === item.targetId
                    ? "text-primary font-medium"
                    : "hover:text-primary"
                )}
              >
                {item.label}
              </button>
            </NavbarItem>
          ))}
        </div>

        {/* 👉 Login & Get Started Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="bordered"
            onPress={() => router.push("/login")}
            className="px-5 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition"
          >
            Login
          </Button>
          <Button
            onPress={() => router.push("/register")}
            className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarContent className="lg:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-4 flex flex-col gap-4">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <button
                onClick={() => handleNavClick(item.targetId)}
                className={clsx(
                  "text-lg font-medium transition-colors duration-200",
                  activeSection === item.targetId
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </button>
            </NavbarMenuItem>
          ))}

          {/* Mobile Login & Get Started */}
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="bordered"
              onPress={() => router.push("/login")}
              className="px-5 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition"
            >
              Login
            </Button>
            <Button
              onPress={() => router.push("/register")}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition"
            >
              Get Started
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
