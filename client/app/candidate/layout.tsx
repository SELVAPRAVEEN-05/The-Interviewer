"use client";

import SideBar from "@/components/atoms/sidebar";
import { LayoutDashboard, Users } from "lucide-react";
import { MdOutlineWorkHistory } from "react-icons/md";
import Navbar from "./components/navBar";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      id: "interviewListes",
      label: "upcomming Interview",
      icon: <Users size={18} />,
    },
    {
      id: "interviewHistory",
      label: "Interview History",
      icon: <MdOutlineWorkHistory size={18} />,
    },
  ];

  return (
    <div className="h-[100dvh] w-screen overflow-hidden">
      <div className="h-[10vh] w-full">
        <Navbar />
      </div>
      <div className="flex h-[90vh] w-full overflow-hidden">
        <div className="h-full">
          <SideBar sidebarItems={sidebarItems} />
        </div>
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
