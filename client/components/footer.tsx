"use client";

import { siteConfig } from "@/config/site";
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import photo from "./assets/codemeet-outl.png";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12">
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + About */}
          <div>
            <Image src={photo} alt="Logo" width={150} />
            <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-sm">
              Master coding interviews with our AI-powered platform. Practice
              with real interviewers, solve challenging problems, and get the
              job you deserve.
            </p>
          </div>

          {/* Quick Links */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.targetId}>
                  <Link
                    href={`#${item.targetId}`}
                    className="hover:text-blue-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <a
                href="mailto:support@codemeet.com"
                className="text-sm hover:text-blue-400 transition"
              >
                support@codemeet.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              <p className="text-sm">+91 98765 43210</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 transition"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-600 hover:bg-pink-700 transition"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Code Meet. All rights reserved. Made with{" "}
          <span className="text-red-500">❤️</span> for better interview
          preparation.
        </div>
      </div>
    </footer>
  );
}
