'use client';

import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  MoreVertical,
  User,
  Users
} from 'lucide-react';

import { InterviewCard } from './components/interviewCard';
import StatCard from './components/statCard';
import { HeroUIProvider } from '@heroui/system';
import { Tab, Tabs } from '@nextui-org/react';
import { PopOver } from '@/components/atoms/popOver';

// ----------------------
// Component
// ----------------------
const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'approvals' | 'users'>('overview');

  // Stats
  const statsData = [
    { icon: <Calendar />, title: "Today's Interviews", value: 8, change: "+12%", color: "bg-blue-600" },
    { icon: <Clock />, title: "Weekly Interviews", value: 45, change: "+8%", color: "bg-green-600" },
    { icon: <Users />, title: "Active Interviewers", value: 23, change: "+5%", color: "bg-purple-600" },
    { icon: <CheckCircle />, title: "Pending Approvals", value: 12, color: "bg-orange-600" },
  ];

  // Ongoing Interviews
  const ongoingInterviews = [
    {
      id: 1,
      candidateName: 'Emma Davis',
      interviewerName: 'Robert Brown',
      position: 'Full Stack Developer',
      startTime: '3:15 PM',
      duration: '50 mins',
      status: 'Starting Soon',
      roomId: 'ROOM-2024-003',
    },
    {
      id: 2,
      candidateName: 'Mike Chen',
      interviewerName: 'Lisa Wang',
      position: 'Backend Developer',
      startTime: '3:00 PM',
      duration: '60 mins',
      status: 'In Progress',
      roomId: 'ROOM-2024-002',
    },
    {
      id: 3,
      candidateName: 'Sarah Johnson',
      interviewerName: 'John Smith',
      position: 'Frontend Developer',
      startTime: '2:30 PM',
      duration: '45 mins',
      status: 'In Progress',
      roomId: 'ROOM-2024-001',
    },
  ];

  // Upcoming Interviews
  const upcomingInterviews = [
    { id: 1, candidateName: 'Alex Rodriguez', interviewerName: 'Jane Doe', position: 'React Developer', time: '4:00 PM', date: 'Today' },
    { id: 2, candidateName: 'Priya Patel', interviewerName: 'Tom Wilson', position: 'Node.js Developer', time: '10:00 AM', date: 'Tomorrow' },
    { id: 3, candidateName: 'James Miller', interviewerName: 'Sarah Connor', position: 'Python Developer', time: '2:30 PM', date: 'Tomorrow' },
  ];

  // Recent Activity
  const activities = [
    { color: "bg-green-400", message: "Interview completed: Sarah Johnson", time: "5 minutes ago" },
    { color: "bg-blue-400", message: "New candidate registered: Alex Rodriguez", time: "15 minutes ago" },
    { color: "bg-yellow-400", message: "Interviewer approval pending: Michael Brown", time: "1 hour ago" },
    { color: "bg-purple-400", message: "Interview scheduled: Emma Davis & Robert Brown", time: "2 hours ago" },
  ];

  // Pending Approvals
  const pendingApprovals = [
    { id: 1, name: 'Jennifer Adams', type: 'Candidate', position: 'UI/UX Designer', appliedDate: 'Aug 8', status: 'Pending' },
    { id: 2, name: 'Michael Brown', type: 'Interviewer', department: 'Engineering', appliedDate: 'Aug 7', status: 'Pending' },
    { id: 3, name: 'Sofia Martinez', type: 'Candidate', position: 'Data Scientist', appliedDate: 'Aug 8', status: 'Pending' },
  ];

  // Users Data
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  const [usersList] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Candidate' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Interviewer' },
    { id: '3', name: 'Robert Brown', email: 'robert@example.com', role: 'Admin' },
  ]);

  const handleActionClick = (label: string, user: User) => {
    if (label === 'Edit') {
      console.log('Edit user', user);
    } else if (label === 'Delete') {
      console.log('Delete user', user);
    }
  };

  return (
    <HeroUIProvider>
      <div className="h-full w-full bg-white rounded-lg overflow-y-scroll scrollbar-hide px-4 sm:px-6 lg:px-8 py-8">
        {/* HeroUI Tabs */}
        <Tabs
          className='w-full'
          classNames={{
            tabList: "gap-10 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          aria-label="Dashboard Tabs"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as typeof activeTab)}
        >
          <Tab key="overview" title="Overview" />
          <Tab key="interviews" title="Interviews" />
          <Tab key="approvals" title="Approvals" />
          <Tab key="users" title="Users" />
        </Tabs>

        {/* ---------------- Overview Tab ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 mt-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((item, idx) => (
                <StatCard
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  value={item.value}
                  change={item.change}
                  color={item.color}
                />
              ))}
            </div>

            {/* Ongoing Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Live Interviews</h3>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  {ongoingInterviews.filter((i) => i.status === 'In Progress').length} Active
                </span>
              </div>
              <div className="p-6 overflow-x-scroll font-gilroy grid grid-flow-col gap-5 scrollbar-hide">
                {ongoingInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} isOngoing classnames="md:w-[24.5rem] w-[23.125rem]" />
                ))}
              </div>
            </div>

            {/* Upcoming + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Interviews */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Interviews</h3>
                </div>
                <div className="p-6 space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} />
                  ))}
                  <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                    View All Upcoming Interviews →
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <div className="p-6 space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                    View All Notifications →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Interviews Tab ---------------- */}
        {activeTab === 'interviews' && (
          <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Interview Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Schedule New Interview
              </button>
            </div>

            {/* Ongoing Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Ongoing Interviews</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {ongoingInterviews.length} Active
                </span>
              </div>
              <div className="p-6 overflow-x-scroll font-gilroy grid grid-flow-col gap-5 scrollbar-hide">
                {ongoingInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} isOngoing classnames="md:w-[24.5rem] w-[23.125rem]" />
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Interviews</h3>
              </div>
              <div className="p-6 space-y-4">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
                <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                  View All Scheduled Interviews →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Approvals Tab ---------------- */}
        {activeTab === 'approvals' && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position/Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingApprovals.map((approval) => (
                    <tr key={approval.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="ml-4 text-sm font-medium text-gray-900">{approval.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${approval.type === 'Candidate' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {approval.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {approval.position || approval.department || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{approval.appliedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700">Approve</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Reject</button>
                        <button className="text-gray-600 hover:text-gray-800"><MoreVertical className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- Users Tab ---------------- */}
        {activeTab === 'users' && (
          <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Add New User
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersList.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Candidate'
                            ? 'bg-blue-100 text-blue-800'
                            : user.role === 'Interviewer'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <PopOver
                          trigger={<MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />}
                          content={[
                            { label: 'Edit', value: 'edit' },
                            { label: 'Delete', value: 'delete' },
                          ]}
                          handleClick={(label) => handleActionClick(label, user)}
                          placement="left-start"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </HeroUIProvider>
  );
};

export default AdminDashboard;
