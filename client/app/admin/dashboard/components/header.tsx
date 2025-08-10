import { Bell, Code, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [notifications, setNotifications] = useState<number>(12);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Code className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-900">TechInterview Pro</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                            {notifications > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
