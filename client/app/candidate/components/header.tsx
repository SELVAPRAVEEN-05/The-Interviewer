import photo from "@/components/assets/logo.png";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<number>(12);

  const handleNotificationClick = () => {
    // Handle notification click
    console.log("Notifications clicked");
    // You can add notification panel logic here
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-full flex justify-between w-full items-center">
      <div className="w-full px-4 sm:px-6 xl:px-16">
        <div className="flex justify-between w-full items-center py-4">
          <Image
            className="cursor-pointer"
            src={photo}
            alt="Logo"
            width={150}
          />
          <div className="flex items-center h-full space-x-5">
            <div
              className="relative mt-[5px] xl:mt-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={handleNotificationClick}
            >
              <Bell className="h-6 w-6 text-gray-600 hover:text-gray-800" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications > 99 ? "99+" : notifications}
                </span>
              )}
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => router.push("/admin/profile")}
            >
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaRegUser className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm hidden lg:block font-medium text-gray-700">
                Darkdevil
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
