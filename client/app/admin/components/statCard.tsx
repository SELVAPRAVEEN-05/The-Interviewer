import React from 'react'

interface StatCardProps {
    title?: string;
    value?: number;
    icon?: any;
    color?: string;
    subtitle?: string;
  };


  
  export default function StatCard ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: StatCardProps) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div
          className={`p-3 rounded-lg ${(color ? color.replace("text", "bg").replace("-600", "-100") : "bg-gray-100")}`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
    )
  }
  