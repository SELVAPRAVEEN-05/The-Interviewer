"use client";

import SideBar from "@/components/atoms/sidebar";
import { LayoutDashboard, MessageSquare, Star, Users } from "lucide-react";
import Header from "./components/header";

export default function AdminLayout({
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
      id: "manageCandidates",
      label: "Manage Candidates",
      icon: <Users size={18} />,
    },
    {
      id: "manageInterviewers",
      label: "Manage Interviewers",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-[10vh] w-full">
        <Header />
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
