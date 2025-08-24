import {
  CreditCard,
  Gift,
  LayoutDashboard,
  MessageSquare,
  Phone,
  Star,
  Users,
  FileText,
  Calendar
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type PageType = 'dashboard' | 'managecandidates' | 'manageinterviewers' | 'interviewscheduling' | 'feedbackreports' | 'profile';

interface SideBarProps {
  activeId?: PageType;
  onPageChange?: (pageId: PageType) => void;
}

export default function SideBar({ activeId = 'dashboard', onPageChange }: SideBarProps) {
  const [internalActiveId, setInternalActiveId] = useState<PageType>(activeId);
  const [lineStyle, setLineStyle] = useState({ top: 0, opacity: 0 });
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const sidebarItems = [
    { 
      id: 'dashboard' as PageType, 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={18} /> 
    },
    { 
      id: 'managecandidates' as PageType, 
      label: 'Manage Candidates', 
      icon: <Users size={18} /> 
    },
    { 
      id: 'manageinterviewers' as PageType, 
      label: 'Manage Interviewers', 
      icon: <MessageSquare size={18} /> 
    },
    { 
      id: 'interviewscheduling' as PageType, 
      label: 'Interview Scheduling', 
      icon: <Calendar size={18} /> 
    },
    { 
      id: 'feedbackreports' as PageType, 
      label: 'Feedback & Reports', 
      icon: <FileText size={18} /> 
    },
  ];

  // Update internal state when activeId prop changes
  useEffect(() => {
    setInternalActiveId(activeId);
  }, [activeId]);

  useEffect(() => {
    const activeElement = itemRefs.current[internalActiveId];
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
  }, [internalActiveId]);

  const handleItemClick = (itemId: PageType) => {
    setInternalActiveId(itemId);
    
    // Call the parent's page change handler if provided
    if (onPageChange) {
      onPageChange(itemId);
    }
  };

  return (
    <div className="w-full h-full pt-5 border-r border-gray-100 flex flex-col">
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
                className={`relative w-full flex items-center gap-3 px-4 md:pr-10 lg:pl-6 lg:pr-16 py-3 rounded-md text-sm font-medium transition-all duration-300
                  ${internalActiveId === item.id
                    ? 'text-blue-600 bg-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}
                  `}
              >
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