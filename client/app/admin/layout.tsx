// app/admin/layout.tsx
"use client";

import { useState } from "react";
import SideBar from "@/components/atoms/sidebar";
import Header from "./dashboard/components/header";
import AdminDashboard from "./dashboard/page";
import ManageCandidates from "./manageCandidates/page";
import ManageInterviewers from "./manageInterviewers/page";
import InterviewScheduling from "./InterviewScheduling/page";
import AdminFeedbackReports from "./feedbacksReports/page";
import AdminProfilePage from "./profile/page"; // Import the profile page

type PageType = 'dashboard' | 'managecandidates' | 'manageinterviewers' | 'interviewscheduling' | 'feedbackreports' | 'profile';

export default function AdminLayout() {
    const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'managecandidates':
                return <ManageCandidates />;
            case 'manageinterviewers':
                return <ManageInterviewers />;
            case 'interviewscheduling':
                return <InterviewScheduling />;
            case 'feedbackreports':
                return <AdminFeedbackReports />;
            case 'profile':
                return <AdminProfilePage />;
            default:
                return <AdminDashboard />;
        }
    };

    const handlePageChange = (pageId: PageType) => {
        setCurrentPage(pageId);
    };

    const handleProfileClick = () => {
        setCurrentPage('profile');
    };

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="shadow-md h-[10vh] w-full">
                <Header onProfileClick={handleProfileClick} />
            </div>
            <div className="flex h-[90vh] w-full overflow-hidden">
                <div className="h-full">
                    <SideBar 
                        activeId={currentPage} 
                        onPageChange={handlePageChange} 
                    />
                </div>

                <div className="flex-1 p-6 overflow-y-auto scrollbar-hide overflow-hidden bg-gray-50">
                    {renderCurrentPage()}
                </div>
            </div>
        </div>
    );
}