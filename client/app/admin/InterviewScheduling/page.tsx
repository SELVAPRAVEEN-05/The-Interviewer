'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  User, 
  Users,
  Edit,
  Trash2,
  MapPin,
  Video,
  Phone,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  CalendarDays,
  Timer,
  UserCheck,
  Zap
} from 'lucide-react';

// Types
interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePosition: string;
  interviewerId: string;
  interviewerName: string;
  interviewerRole: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'technical' | 'behavioral' | 'system_design' | 'cultural_fit' | 'final_round';
  mode: 'in_person' | 'video_call' | 'phone_call';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
  location?: string;
  meetingLink?: string;
  notes?: string;
  room?: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: 'approved';
}

interface Interviewer {
  id: string;
  name: string;
  email: string;
  role: string;
  specialization: string[];
  availability: {
    timezone: string;
    workingHours: string;
    preferredDays: string[];
  };
}

interface TimeSlot {
  id: string;
  interviewerId: string;
  date: string;
  time: string;
  duration: number;
  isAvailable: boolean;
}

// Mock data
const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'John Doe',
    candidateEmail: 'john.doe@email.com',
    candidatePosition: 'Full Stack Developer',
    interviewerId: '1',
    interviewerName: 'Robert Brown',
    interviewerRole: 'Technical Lead',
    date: '2024-01-30',
    time: '10:00',
    duration: 60,
    type: 'technical',
    mode: 'video_call',
    status: 'scheduled',
    meetingLink: 'https://meet.company.com/interview-1',
    notes: 'Focus on React and Node.js experience'
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Alice Johnson',
    candidateEmail: 'alice.johnson@email.com',
    candidatePosition: 'Frontend Developer',
    interviewerId: '3',
    interviewerName: 'John Smith',
    interviewerRole: 'HR Specialist',
    date: '2024-01-25',
    time: '14:00',
    duration: 45,
    type: 'behavioral',
    mode: 'in_person',
    status: 'completed',
    location: 'Conference Room A',
    room: 'CONF-A-101'
  },
  {
    id: '3',
    candidateId: '3',
    candidateName: 'Mike Chen',
    candidateEmail: 'mike.chen@email.com',
    candidatePosition: 'Backend Developer',
    interviewerId: '2',
    interviewerName: 'Lisa Wang',
    interviewerRole: 'Senior Developer',
    date: '2024-01-28',
    time: '11:00',
    duration: 90,
    type: 'system_design',
    mode: 'video_call',
    status: 'scheduled',
    meetingLink: 'https://meet.company.com/interview-3',
    notes: 'Database design and API architecture'
  }
];

const mockCandidates: Candidate[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@email.com', position: 'Full Stack Developer', status: 'approved' },
  { id: '2', name: 'Alice Johnson', email: 'alice.johnson@email.com', position: 'Frontend Developer', status: 'approved' },
  { id: '3', name: 'Mike Chen', email: 'mike.chen@email.com', position: 'Backend Developer', status: 'approved' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@email.com', position: 'DevOps Engineer', status: 'approved' }
];

const mockInterviewers: Interviewer[] = [
  {
    id: '1',
    name: 'Robert Brown',
    email: 'robert.brown@company.com',
    role: 'Technical Lead',
    specialization: ['Full Stack', 'System Design'],
    availability: {
      timezone: 'PST',
      workingHours: '9:00 AM - 6:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '2',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    role: 'Senior Developer',
    specialization: ['Backend', 'Cloud Architecture'],
    availability: {
      timezone: 'EST',
      workingHours: '10:00 AM - 7:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
    }
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'HR Specialist',
    specialization: ['Behavioral', 'Cultural Fit'],
    availability: {
      timezone: 'EST',
      workingHours: '8:00 AM - 5:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  }
];

const interviewTypes = [
  { value: 'technical', label: 'Technical Interview', duration: 60, color: 'bg-blue-100 text-blue-800' },
  { value: 'behavioral', label: 'Behavioral Interview', duration: 45, color: 'bg-green-100 text-green-800' },
  { value: 'system_design', label: 'System Design', duration: 90, color: 'bg-purple-100 text-purple-800' },
  { value: 'cultural_fit', label: 'Cultural Fit', duration: 30, color: 'bg-orange-100 text-orange-800' },
  { value: 'final_round', label: 'Final Round', duration: 45, color: 'bg-red-100 text-red-800' }
];

const InterviewScheduling: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('table');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Form states
  const [formData, setFormData] = useState({
    candidateId: '',
    interviewerId: '',
    date: '',
    time: '',
    duration: 60,
    type: 'technical' as Interview['type'],
    mode: 'video_call' as Interview['mode'],
    location: '',
    meetingLink: '',
    notes: '',
    room: ''
  });

  // Filter interviews
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.candidatePosition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesType = typeFilter === 'all' || interview.type === typeFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = interview.date === new Date().toISOString().split('T')[0];
    } else if (dateFilter === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      matchesDate = new Date(interview.date) <= weekFromNow && new Date(interview.date) >= new Date();
    } else if (dateFilter === 'month') {
      const monthFromNow = new Date();
      monthFromNow.setMonth(monthFromNow.getMonth() + 1);
      matchesDate = new Date(interview.date) <= monthFromNow && new Date(interview.date) >= new Date();
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const handleCreateInterview = () => {
    const newInterview: Interview = {
      id: String(interviews.length + 1),
      candidateId: formData.candidateId,
      candidateName: mockCandidates.find(c => c.id === formData.candidateId)?.name || '',
      candidateEmail: mockCandidates.find(c => c.id === formData.candidateId)?.email || '',
      candidatePosition: mockCandidates.find(c => c.id === formData.candidateId)?.position || '',
      interviewerId: formData.interviewerId,
      interviewerName: mockInterviewers.find(i => i.id === formData.interviewerId)?.name || '',
      interviewerRole: mockInterviewers.find(i => i.id === formData.interviewerId)?.role || '',
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      type: formData.type,
      mode: formData.mode,
      status: 'scheduled',
      location: formData.location,
      meetingLink: formData.meetingLink,
      notes: formData.notes,
      room: formData.room
    };

    setInterviews(prev => [...prev, newInterview]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleReschedule = () => {
    if (selectedInterview) {
      setInterviews(prev => prev.map(interview => 
        interview.id === selectedInterview.id 
          ? { ...interview, date: formData.date, time: formData.time, status: 'rescheduled' as const }
          : interview
      ));
    }
    setShowRescheduleModal(false);
    setSelectedInterview(null);
    resetForm();
  };

  const handleCancelInterview = (interviewId: string) => {
    setInterviews(prev => prev.map(interview => 
      interview.id === interviewId 
        ? { ...interview, status: 'cancelled' as const }
        : interview
    ));
  };

  const resetForm = () => {
    setFormData({
      candidateId: '',
      interviewerId: '',
      date: '',
      time: '',
      duration: 60,
      type: 'technical',
      mode: 'video_call',
      location: '',
      meetingLink: '',
      notes: '',
      room: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'rescheduled': return <AlertCircle className="w-4 h-4" />;
      case 'no_show': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video_call': return <Video className="w-4 h-4" />;
      case 'phone_call': return <Phone className="w-4 h-4" />;
      case 'in_person': return <MapPin className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  // Stats calculations
  const scheduledCount = interviews.filter(i => i.status === 'scheduled').length;
  const completedCount = interviews.filter(i => i.status === 'completed').length;
  const cancelledCount = interviews.filter(i => i.status === 'cancelled').length;
  const todayInterviews = interviews.filter(i => i.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Scheduling</h1>
            <p className="text-gray-600">Schedule, manage and track all interviews</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Interview</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Interviews</p>
                <p className="text-2xl font-bold text-purple-600">{todayInterviews}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* View Toggle and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Calendar View
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search interviews..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="rescheduled">Rescheduled</option>
              </select>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                {interviewTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interview Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interviewer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInterviews.map((interview) => (
                    <tr key={interview.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              interviewTypes.find(t => t.value === interview.type)?.color
                            }`}>
                              {interviewTypes.find(t => t.value === interview.type)?.label}
                            </span>
                            {getModeIcon(interview.mode)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {interview.duration} minutes
                            {interview.mode === 'in_person' && interview.room && ` • ${interview.room}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{interview.candidateName}</div>
                          <div className="text-sm text-gray-500">{interview.candidatePosition}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{interview.interviewerName}</div>
                          <div className="text-sm text-gray-500">{interview.interviewerRole}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{interview.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                          {getStatusIcon(interview.status)}
                          <span className="ml-1 capitalize">{interview.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {interview.status === 'scheduled' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedInterview(interview);
                                  setFormData({
                                    ...formData,
                                    date: interview.date,
                                    time: interview.time
                                  });
                                  setShowRescheduleModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                                title="Reschedule"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleCancelInterview(interview.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Cancel"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Interview Calendar</h3>
              <p className="text-sm text-gray-500">Upcoming interviews organized by date</p>
            </div>
            
            <div className="space-y-6">
              {/* Group interviews by date */}
              {Array.from(new Set(filteredInterviews.map(i => i.date))).sort().map(date => (
                <div key={date} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  
                  <div className="space-y-3">
                    {filteredInterviews
                      .filter(interview => interview.date === date)
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map(interview => (
                        <div key={interview.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">
                                  {interview.time} ({interview.duration}m)
                                </span>
                              </div>
                              
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                interviewTypes.find(t => t.value === interview.type)?.color
                              }`}>
                                {interviewTypes.find(t => t.value === interview.type)?.label}
                              </span>
                              
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                                {getStatusIcon(interview.status)}
                                <span className="ml-1 capitalize">{interview.status.replace('_', ' ')}</span>
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {getModeIcon(interview.mode)}
                              {interview.status === 'scheduled' && (
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => {
                                      setSelectedInterview(interview);
                                      setFormData({
                                        ...formData,
                                        date: interview.date,
                                        time: interview.time
                                      });
                                      setShowRescheduleModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Reschedule"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleCancelInterview(interview.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Cancel"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{interview.candidateName} • {interview.candidatePosition}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <UserCheck className="w-4 h-4" />
                              <span>{interview.interviewerName} • {interview.interviewerRole}</span>
                            </div>
                          </div>
                          
                          {(interview.location || interview.meetingLink || interview.room) && (
                            <div className="mt-2 text-sm text-gray-500">
                              {interview.mode === 'in_person' && interview.room && (
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{interview.room} {interview.location && `• ${interview.location}`}</span>
                                </div>
                              )}
                              {interview.mode === 'video_call' && interview.meetingLink && (
                                <div className="flex items-center space-x-2">
                                  <Video className="w-4 h-4" />
                                  <a href={interview.meetingLink} className="text-blue-600 hover:text-blue-800 underline">
                                    Join Meeting
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {interview.notes && (
                            <div className="mt-2 text-sm text-gray-600 italic">
                              Note: {interview.notes}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Interview Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Schedule New Interview</h2>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Candidate
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.candidateId}
                        onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                        required
                      >
                        <option value="">Choose candidate...</option>
                        {mockCandidates.map(candidate => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.name} - {candidate.position}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Interviewer
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.interviewerId}
                        onChange={(e) => setFormData({ ...formData, interviewerId: e.target.value })}
                        required
                      >
                        <option value="">Choose interviewer...</option>
                        {mockInterviewers.map(interviewer => (
                          <option key={interviewer.id} value={interviewer.id}>
                            {interviewer.name} - {interviewer.role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interview Type
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.type}
                        onChange={(e) => {
                          const selectedType = e.target.value as Interview['type'];
                          const typeData = interviewTypes.find(t => t.value === selectedType);
                          setFormData({ 
                            ...formData, 
                            type: selectedType,
                            duration: typeData?.duration || 60
                          });
                        }}
                        required
                      >
                        {interviewTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label} ({type.duration} min)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        min="15"
                        max="180"
                        step="15"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column - Mode and Location */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interview Mode
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="mode"
                            value="video_call"
                            checked={formData.mode === 'video_call'}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value as Interview['mode'] })}
                            className="mr-2"
                          />
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="mode"
                            value="phone_call"
                            checked={formData.mode === 'phone_call'}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value as Interview['mode'] })}
                            className="mr-2"
                          />
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Call
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="mode"
                            value="in_person"
                            checked={formData.mode === 'in_person'}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value as Interview['mode'] })}
                            className="mr-2"
                          />
                          <MapPin className="w-4 h-4 mr-2" />
                          In Person
                        </label>
                      </div>
                    </div>

                    {formData.mode === 'video_call' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meeting Link
                        </label>
                        <input
                          type="url"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.meetingLink}
                          onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                          placeholder="https://meet.company.com/interview-room"
                        />
                      </div>
                    )}

                    {formData.mode === 'in_person' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Room/Location
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.room}
                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                            placeholder="Conference Room A"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="123 Business St, City, State"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Special instructions or topics to focus on..."
                      />
                    </div>

                    {/* Interviewer Availability Display */}
                    {formData.interviewerId && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">Interviewer Availability</h4>
                        {(() => {
                          const interviewer = mockInterviewers.find(i => i.id === formData.interviewerId);
                          if (!interviewer) return null;
                          return (
                            <div className="text-sm text-blue-700">
                              <p>Timezone: {interviewer.availability.timezone}</p>
                              <p>Hours: {interviewer.availability.workingHours}</p>
                              <p>Preferred Days: {interviewer.availability.preferredDays.join(', ')}</p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateInterview}
                    disabled={!formData.candidateId || !formData.interviewerId || !formData.date || !formData.time}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Interview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedInterview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Reschedule Interview</h2>
                  <button
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedInterview(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Current Interview:</div>
                  <div className="font-medium text-gray-900">
                    {selectedInterview.candidateName} with {selectedInterview.interviewerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedInterview.date).toLocaleDateString()} at {selectedInterview.time}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Time
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedInterview(null);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReschedule}
                    disabled={!formData.date || !formData.time}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Reschedule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Bulk Reschedule</div>
                  <div className="text-sm text-gray-500">Reschedule multiple interviews</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Timer className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Auto-Schedule</div>
                  <div className="text-sm text-gray-500">AI-powered scheduling</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Export Calendar</div>
                  <div className="text-sm text-gray-500">Download as ICS file</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduling;