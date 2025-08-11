'use client';

import React from 'react';

type StatCardProps = {
  icon: any;
  title: string;
  value: number | string;
  change?: string;
  color: string;
};

const StatCard = ({ icon, title, value, change, color }:StatCardProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between h-full">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last week
          </p>
        )}
      </div>
      <div className={`p-3 text-white rounded-lg  bg-${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
