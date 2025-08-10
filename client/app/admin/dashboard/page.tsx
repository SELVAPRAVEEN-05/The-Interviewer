'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Bell,
  User,
  Code,
  Video,
  Filter,
  Search,
  MoreVertical,
} from 'lucide-react';

import InterviewCard from './components/interviewCard';
import Tabs from './components/tabs';
import StatCard from './components/statCard';


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'approvals' | 'users'>('overview');
  const [notifications, setNotifications] = useState<number>(12);

  const stats = {
    todayInterviews: 8,
    weeklyInterviews: 45,
    approvedCandidates: 156,
    activeInterviewers: 23,
    pendingApprovals: 12,
    completedToday: 5,
  };

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
    {
      id: 4,
      candidateName: 'Emma Davis',
      interviewerName: 'Robert Brown',
      position: 'Full Stack Developer',
      startTime: '3:15 PM',
      duration: '50 mins',
      status: 'Starting Soon',
      roomId: 'ROOM-2024-003',
    },
  ];

  const upcomingInterviews = [
    { id: 1, candidateName: 'Alex Rodriguez', interviewerName: 'Jane Doe', position: 'React Developer', time: '4:00 PM', date: 'Today' },
    { id: 2, candidateName: 'Priya Patel', interviewerName: 'Tom Wilson', position: 'Node.js Developer', time: '10:00 AM', date: 'Tomorrow' },
    { id: 3, candidateName: 'James Miller', interviewerName: 'Sarah Connor', position: 'Python Developer', time: '2:30 PM', date: 'Tomorrow' },
    { id: 4, candidateName: 'Lisa Zhang', interviewerName: 'Mark Johnson', position: 'DevOps Engineer', time: '11:00 AM', date: 'Aug 12' },
    { id: 5, candidateName: 'David Kumar', interviewerName: 'Anna Smith', position: 'Frontend Developer', time: '3:00 PM', date: 'Aug 12' },
  ];

  const pendingApprovals = [
    { id: 1, name: 'Jennifer Adams', type: 'Candidate', position: 'UI/UX Designer', appliedDate: 'Aug 8', status: 'Pending' },
    { id: 2, name: 'Michael Brown', type: 'Interviewer', department: 'Engineering', appliedDate: 'Aug 7', status: 'Pending' },
    { id: 3, name: 'Sofia Martinez', type: 'Candidate', position: 'Data Scientist', appliedDate: 'Aug 8', status: 'Pending' },
    { id: 4, name: 'Kevin Lee', type: 'Candidate', position: 'Mobile Developer', appliedDate: 'Aug 9', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={Calendar} title="Today's Interviews" value={stats.todayInterviews} change="+12%" color="bg-blue-600" />
              <StatCard icon={Clock} title="Weekly Interviews" value={stats.weeklyInterviews} change="+8%" color="bg-green-600" />
              <StatCard icon={Users} title="Active Interviewers" value={stats.activeInterviewers} change="+5%" color="bg-purple-600" />
              <StatCard icon={CheckCircle} title="Pending Approvals" value={stats.pendingApprovals} color="bg-orange-600" />
            </div>

            {/* Ongoing Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Live Interviews</h3>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  {ongoingInterviews.filter((i) => i.status === 'In Progress').length} Active
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {ongoingInterviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} isOngoing />
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Interviews & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Interviews */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Interviews</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingInterviews.slice(0, 4).map((interview) => (
                      <InterviewCard key={interview.id} interview={interview} />
                    ))}
                  </div>
                  <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                    View All Upcoming Interviews →
                  </button>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Interview completed: Sarah Johnson</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">New candidate registered: Alex Rodriguez</p>
                        <p className="text-xs text-gray-500">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Interviewer approval pending: Michael Brown</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Interview scheduled: Emma Davis & Robert Brown</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                    View All Notifications →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search approvals..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{approval.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${approval.type === 'Candidate' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}
                          >
                            {approval.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {approval.position || approval.department || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{approval.appliedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                            Approve
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
                            Reject
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'overview' && activeTab !== 'approvals' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h3>
            <p className="text-gray-500">This section is under development. More features coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
