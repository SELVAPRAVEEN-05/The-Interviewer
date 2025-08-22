import {
  CreditCard,
  Gift,
  LayoutDashboard,
  MessageSquare,
  Phone,
  Star,
  Users
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function SideBar() {
  const [activeId, setActiveId] = useState('dashboard');
  const [lineStyle, setLineStyle] = useState({ top: 0, opacity: 0 });
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'managecandidates', label: 'Manage Candidates', icon: <Users size={18} /> },
    { id: 'manageinterviewers', label: 'Manage Interviewers', icon: <MessageSquare size={18} /> },
    { id: 'interviewcheduling', label: 'Interview Scheduling', icon: <Star size={18} /> },
    { id: 'feedbackreports', label: 'Feedback & Reports', icon: <Phone size={18} /> },
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
    <div className="w-full h-full pt-5 border-r border-gray-100 flex flex-col ">
      <div>
        <div className="space-y-3 relative mt-6">
          {/* Animated blue line */}
          <div
            className="absolute hidden md:block right-0 w-[3px] bg-blue-600 rounded-md transition-all duration-300 ease-in-out z-10"
            style={{
              top: `${lineStyle.top}px`,
              height: '36px',
              opacity: lineStyle.opacity,
            }}
          />

          {sidebarItems.map((item) => (
            <div key={item.id}>
              <button
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                onClick={() => handleItemClick(item.id)}
                className={`relative w-full flex items-center gap-3 px-4 md:pr-10 lg:pl-6 lg:pr-16  py-3 rounded-md text-sm font-medium transition-all duration-300
                  ${activeId === item.id
                    ? 'text-blue-600 bg-white'
                    : 'text-gray-400 hover:text-gray-600'}
                  `}>
                <span>{item.icon}</span>
                <span className='hidden lg:block md:block'>{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}