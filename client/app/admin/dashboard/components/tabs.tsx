'use client';

import React from 'react';

import { Calendar, Video, CheckCircle, Users } from 'lucide-react';

type Tab = {
  id: 'overview' | 'interviews' | 'approvals' | 'users';
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type TabsProps = {
  activeTab: Tab['id'];
  onTabChange: (id: Tab['id']) => void;
};

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: Calendar },
  { id: 'interviews', label: 'Interviews', icon: Video },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'users', label: 'Users', icon: Users },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex space-x-8 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm transition-colors ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <tab.icon className="h-4 w-4 mr-2" />
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
