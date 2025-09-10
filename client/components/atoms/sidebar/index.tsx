"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export interface SidebarItem {
  id: string; // e.g. "dashboard", "manageInterviewers"
  label: string;
  icon: React.ReactNode;
}

interface SideBarProps {
  sidebarItems: SidebarItem[];
  defaultActiveId?: string;
  onItemClick?: (id: string) => void;
}

export default function SideBar({
  sidebarItems,
  defaultActiveId = "dashboard",
  onItemClick,
}: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /admin/manageInterviewers

  const [activeId, setActiveId] = useState(defaultActiveId);
  const [lineStyle, setLineStyle] = useState({ top: 0, opacity: 0 });
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // ✅ Match activeId with pathname
  useEffect(() => {
    const currentItem = sidebarItems.find(
      (item) =>
        pathname === `/admin/${item.id}` ||
        pathname.startsWith(`/admin/${item.id}/`)
    );
    if (currentItem) {
      setActiveId(currentItem.id);
    }
  }, [pathname, sidebarItems]);

  // ✅ Update line position when activeId changes
  useEffect(() => {
    const activeElement = itemRefs.current[activeId];
    if (activeElement) {
      const parentElement = activeElement.parentElement?.parentElement;
      if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        const relativeTop = activeRect.top - parentRect.top;

        setLineStyle({
          top: relativeTop,
          opacity: 1,
        });
      }
    }
  }, [activeId]);

  const handleItemClick = (itemId: string) => {
    setActiveId(itemId);
    if (onItemClick) onItemClick(itemId);
    router.push(`${itemId}`);
  };

  return (
    <div className="w-full h-full pt-5 border-r bg-gray-100 border-gray-300 flex flex-col">
      <div className="space-y-3 relative mt-6">
        {/* Animated blue line */}
        <div
          className="absolute hidden md:block right-0 w-[3px] bg-blue-600 rounded-md transition-all duration-300 ease-in-out z-10"
          style={{
            top: `${lineStyle.top}px`,
            height: "42px",
            opacity: lineStyle.opacity,
          }}
        />

        {sidebarItems.map((item) => (
          <div key={item.id}>
            <button
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onClick={() => handleItemClick(item.id)}
              className={`relative w-full flex items-center hover:bg-gray-200 gap-3 px-4 md:pr-10 lg:pl-6 lg:pr-16 py-3 text-sm font-medium transition-all duration-300
        ${
          activeId === item.id
            ? "text-blue-700"
            : "text-gray-500 hover:text-gray-900 "
        }`}
            >
              <span>{item.icon}</span>
              <span className="hidden lg:block md:block">{item.label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
