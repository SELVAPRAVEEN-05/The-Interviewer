"use client";

import { siteConfig } from "@/config/site";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@heroui/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {

  return (
    <HeroUINavbar maxWidth="full" className="flex bg-opacity-30 shadow-lg" position="sticky">
      <div className="w-full lg:px-12 xl:px-28 flex justify-between">
        <div className="gap-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40} /> */}
            <p className="font-bold text-inherit">Logo</p>
          </NextLink>
        </div>

        <div className="hidden lg:flex gap-4 justify-start  relative">
          {/* Animated underline */}
          <div
            className="absolute bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out rounded-full"
          />

          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.targetId}>
              <button
                data-target={item.targetId}
              >
                {item.label}
              </button>
            </NavbarItem>
          ))}
        </div>
        <div className="hidden items-center lg:flex">
          <ThemeSwitch />
        </div>
      </div>

      <NavbarContent className="lg:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-4 flex flex-col gap-4">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <button>
                {item.label}
              </button>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};