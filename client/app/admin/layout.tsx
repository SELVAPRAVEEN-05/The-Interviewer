// app/admin/layout.tsx
"use client";

import SideBar from "@/components/atoms/sidebar";
import Header from "./dashboard/components/header";
import AdminDashboard from "./dashboard/page";

export default function AdminLayout() {

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className=" shadow-md h-[10vh] w-full">
                <Header />
            </div>
            <div className="flex h-[90vh] w-full overflow-hidden">
                <div className="h-full">
                    <SideBar />
                </div>

                <div className="flex-1 p-6 overflow-y-auto scrollbar-hide overflow-hidden">
                    <AdminDashboard />
                </div>
            </div>
        </div>
    );
}
