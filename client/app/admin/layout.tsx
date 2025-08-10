// app/admin/layout.tsx
"use client";

import SideBar from "@/components/atoms/sidebar";
import Header from "./dashboard/components/header";
import AdminDashboard from "./dashboard/page";

export default function AdminLayout() {

    return (
        <div className="h-screen w-full">
            <Header />
            <div className="flex ">
                <div className="w-2/12">
                    <SideBar />
                </div>

                <div className="flex-1 p-6">
                    <AdminDashboard />
                </div>
            </div>
        </div>
    );
}
