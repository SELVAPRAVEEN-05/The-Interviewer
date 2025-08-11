import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Star,
  Phone,
  CreditCard,
  Gift
} from 'lucide-react';

export default function SideBar() {
  const [activeId, setActiveId] = useState('dashboard');
  const [lineStyle, setLineStyle] = useState({ top: 0, opacity: 0 });
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={18} /> },
    { id: 'advisor', label: 'Advisor', icon: <MessageSquare size={18} /> },
    { id: 'reviews', label: 'Reviews & Ratings', icon: <Star size={18} /> },
    { id: 'call', label: 'Call/Chat', icon: <Phone size={18} /> },
    { id: 'wallet', label: 'Wallet plan', icon: <CreditCard size={18} /> },
    { id: 'referrals', label: 'Referrals', icon: <Gift size={18} /> },
    { id: 'referral-plan', label: 'Referrals Plan', icon: <Gift size={18} /> },
  ];

  useEffect(() => {
    const activeElement = itemRefs.current[activeId];
    if (activeElement) {
      const parentElement = activeElement.parentElement?.parentElement;
      if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        const relativeTop = activeRect.top - parentRect.top;

        setLineStyle({
          top: relativeTop,
          opacity: 1
        });
      }
    }
  }, [activeId]);

  const handleItemClick = (itemId: string) => {
    setActiveId(itemId);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col px-4 pt-6">
      <h2 className="text-xl font-semibold italic text-gray-800 mb-8">
        REWARD <span className="font-bold not-italic">POINTS</span>
      </h2>

      <nav className="flex-1">
        <ul className="space-y-2 relative">
          {/* Animated blue line */}
          <div
            className="absolute right-0 w-[3px] bg-blue-600 rounded-md transition-all duration-300 ease-in-out z-10"
            style={{
              top: `${lineStyle.top}px`,
              height: '40px', // Approximate height of each button
              opacity: lineStyle.opacity,
            }}
          />

          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                onClick={() => handleItemClick(item.id)}
                className={`relative w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${activeId === item.id
                    ? 'text-blue-600 bg-white'
                    : 'text-gray-400 hover:text-gray-600'}
                  `}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  );
}