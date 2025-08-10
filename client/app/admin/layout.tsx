// app/admin/layout.tsx
"use client";

import SideBar from "@/components/atoms/sidebar";
import React, { useState } from "react";
import AdminDashboard from "./dashboard/page";

export default function AdminLayout() {
    const data = ["Dashboard", "Settings", "Profile"];
    const [selectedTab, setSelectedTab] = useState("Dashboard");

    return (
        <div className="flex h-screen w-full">
            <div className="w-2/12">
                <SideBar />
            </div>

            <div className="flex-1 p-6">
                <AdminDashboard />
            </div>
        </div>
    );
}
