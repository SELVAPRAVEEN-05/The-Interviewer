// app/admin/layout.tsx
"use client";

import SideBar from "@/components/atoms/sidebar";
import React, { useState } from "react";

export default function AdminLayout() {
    const data = ["Dashboard", "Settings", "Profile"];
    const [selectedTab, setSelectedTab] = useState("Dashboard");

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <div className="w-2/12">
                <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold">{selectedTab}</h1>
                <div className="mt-4">
                    {selectedTab === "Dashboard" && <p>Welcome to your dashboard.</p>}
                    {selectedTab === "Settings" && <p>Here are your settings.</p>}
                    {selectedTab === "Profile" && <p>This is your profile.</p>}
                </div>
            </div>
        </div>
    );
}
