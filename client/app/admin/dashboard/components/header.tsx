import { Bell, Code } from 'lucide-react';
import { useState } from 'react';

import { FaRegUser } from "react-icons/fa";
export default function Header() {
    const [notifications, setNotifications] = useState<number>(12);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 h-full flex justify-between w-full items-center">
            <div className="w-full px-4 sm:px-6 xl:px-16">
                <div className="flex justify-between w-full items-center py-4">
                    <div className="flex items-center">
                        <Code className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-2xl  font-bold text-gray-900">Code Meet</h1>
                    </div>

                    <div className="flex items-center h-full  space-x-5">
                        <div className="relative mt-[5px] xl:mt-2">
                            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                            {notifications > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
                                <FaRegUser className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm hidden font-medium text-gray-700">Darkdevil</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
