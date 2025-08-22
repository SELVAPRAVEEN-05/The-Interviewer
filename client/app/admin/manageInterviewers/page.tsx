// pages/admin/interviewers.tsx or app/admin/interviewers/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Eye, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Star,
  TrendingUp,
  Award,
  Settings,
  UserCog,
  BarChart3,
  Target,
  Shield
} from 'lucide-react';

// Types
interface Interviewer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
  role: 'hr' | 'technical_lead' | 'senior_developer' | 'manager';
  specialization: string[];
  department: string;
  experience: string;
  education: string;
  joinedDate: string;
  profilePicture?: string;
  stats: {
    totalInterviews: number;
    completedInterviews: number;
    averageRating: number;
    candidatesHired: number;
    activeInterviews: number;
  };
  availability: {
    timezone: string;
    workingHours: string;
    preferredDays: string[];
  };
  skills: string[];
  bio: string;
}

// Mock data
const mockInterviewers: Interviewer[] = [
  {
    id: '1',
    name: 'Robert Brown',
    email: 'robert.brown@company.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    role: 'technical_lead',
    specialization: ['Full Stack Development', 'System Design'],
    department: 'Engineering',
    experience: '8 years',
    education: 'MS Computer Science - Stanford',
    joinedDate: '2022-03-15',
    stats: {
      totalInterviews: 145,
      completedInterviews: 142,
      averageRating: 4.7,
      candidatesHired: 38,
      activeInterviews: 3
    },
    availability: {
      timezone: 'PST',
      workingHours: '9:00 AM - 6:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    skills: ['React', 'Node.js', 'Python', 'System Design', 'Leadership'],
    bio: 'Senior technical lead with expertise in full-stack development and system architecture.'
  },
  {
    id: '2',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    phone: '+1 (555) 234-5678',
    status: 'pending',
    role: 'senior_developer',
    specialization: ['Backend Development', 'Cloud Architecture'],
    department: 'Engineering',
    experience: '6 years',
    education: 'BS Software Engineering - MIT',
    joinedDate: '2024-01-20',
    stats: {
      totalInterviews: 0,
      completedInterviews: 0,
      averageRating: 0,
      candidatesHired: 0,
      activeInterviews: 0
    },
    availability: {
      timezone: 'EST',
      workingHours: '10:00 AM - 7:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
    },
    skills: ['Python', 'Django', 'AWS', 'PostgreSQL', 'Docker'],
    bio: 'Backend specialist with strong experience in cloud infrastructure and scalable systems.'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 345-6789',
    status: 'active',
    role: 'hr',
    specialization: ['Behavioral Interviews', 'Cultural Fit Assessment'],
    department: 'Human Resources',
    experience: '5 years',
    education: 'MBA - Harvard Business School',
    joinedDate: '2021-08-10',
    stats: {
      totalInterviews: 230,
      completedInterviews: 228,
      averageRating: 4.5,
      candidatesHired: 65,
      activeInterviews: 2
    },
    availability: {
      timezone: 'EST',
      workingHours: '8:00 AM - 5:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    skills: ['Interviewing', 'Talent Assessment', 'Communication', 'Psychology'],
    bio: 'HR professional specializing in behavioral interviews and cultural assessment.'
  },
  {
    id: '4',
    name: 'Sarah Miller',
    email: 'sarah.miller@company.com',
    phone: '+1 (555) 456-7890',
    status: 'active',
    role: 'manager',
    specialization: ['Team Leadership', 'Strategic Planning'],
    department: 'Engineering',
    experience: '10 years',
    education: 'MS Engineering Management - UC Berkeley',
    joinedDate: '2020-01-15',
    stats: {
      totalInterviews: 89,
      completedInterviews: 87,
      averageRating: 4.8,
      candidatesHired: 23,
      activeInterviews: 2
    },
    availability: {
      timezone: 'PST',
      workingHours: '9:00 AM - 6:00 PM',
      preferredDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    skills: ['Leadership', 'Project Management', 'Strategy', 'Mentoring'],
    bio: 'Engineering manager with focus on leadership assessment and team building.'
  },
  {
    id: '5',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 567-8901',
    status: 'pending',
    role: 'technical_lead',
    specialization: ['Frontend Development', 'UI/UX'],
    department: 'Engineering',
    experience: '7 years',
    education: 'BS Computer Science - Carnegie Mellon',
    joinedDate: '2024-01-25',
    stats: {
      totalInterviews: 0,
      completedInterviews: 0,
      averageRating: 0,
      candidatesHired: 0,
      activeInterviews: 0
    },
    availability: {
      timezone: 'PST',
      workingHours: '10:00 AM - 7:00 PM',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday']
    },
    skills: ['React', 'TypeScript', 'CSS', 'UI/UX Design', 'Testing'],
    bio: 'Frontend specialist with strong design sense and user experience focus.'
  }
];

const roleLabels = {
  hr: 'HR Specialist',
  technical_lead: 'Technical Lead',
  senior_developer: 'Senior Developer',
  manager: 'Manager'
};

const ManageInterviewers: React.FC = () => {
  const [interviewers, setInterviewers] = useState<Interviewer[]>(mockInterviewers);
  const [selectedInterviewer, setSelectedInterviewer] = useState<Interviewer | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [assigningRole, setAssigningRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Filter interviewers based on search and filters
  const filteredInterviewers = interviewers.filter(interviewer => {
    const matchesSearch = interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interviewer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interviewer.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || interviewer.status === statusFilter;
    const matchesRole = roleFilter === 'all' || interviewer.role === roleFilter;
    const matchesDepartment = departmentFilter === 'all' || interviewer.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
  });

  const handleApproveInterviewer = (interviewerId: string) => {
    setInterviewers(prev => 
      prev.map(interviewer => 
        interviewer.id === interviewerId 
          ? { ...interviewer, status: 'active' as const }
          : interviewer
      )
    );
  };

  const handleRejectInterviewer = (interviewerId: string) => {
    setInterviewers(prev => 
      prev.map(interviewer => 
        interviewer.id === interviewerId 
          ? { ...interviewer, status: 'rejected' as const }
          : interviewer
      )
    );
  };

  const handleAssignRole = (interviewerId: string, newRole: keyof typeof roleLabels) => {
    setInterviewers(prev => 
      prev.map(interviewer => 
        interviewer.id === interviewerId 
          ? { ...interviewer, role: newRole }
          : interviewer
      )
    );
    setShowRoleModal(false);
    setAssigningRole(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'hr': return 'bg-blue-100 text-blue-800';
      case 'technical_lead': return 'bg-purple-100 text-purple-800';
      case 'senior_developer': return 'bg-indigo-100 text-indigo-800';
      case 'manager': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Calculate stats
  const pendingCount = interviewers.filter(i => i.status === 'pending').length;
  const activeCount = interviewers.filter(i => i.status === 'active').length;
  const totalInterviews = interviewers.reduce((sum, i) => sum + i.stats.totalInterviews, 0);
  const avgRating = interviewers.filter(i => i.stats.averageRating > 0).reduce((sum, i, _, arr) => 
    sum + i.stats.averageRating / arr.length, 0
  );

  const departments = Array.from(new Set(interviewers.map(i => i.department)));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Interviewers</h1>
          <p className="text-gray-600">Review, approve, and manage interviewer roles and performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Interviewers</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-blue-600">{totalInterviews}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-purple-600">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search interviewers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="hr">HR Specialist</option>
                <option value="technical_lead">Technical Lead</option>
                <option value="senior_developer">Senior Developer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interviewers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interviewer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInterviewers.map((interviewer) => (
                  <tr key={interviewer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {interviewer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{interviewer.name}</div>
                          <div className="text-sm text-gray-500">{interviewer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(interviewer.role)} mb-1`}>
                          {roleLabels[interviewer.role]}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{interviewer.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interviewer.status)}`}>
                        {getStatusIcon(interviewer.status)}
                        <span className="ml-1 capitalize">{interviewer.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{interviewer.stats.averageRating.toFixed(1)}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {interviewer.stats.totalInterviews} interviews
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {interviewer.specialization.slice(0, 2).map((spec, index) => (
                          <div key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mb-1">
                            {spec}
                          </div>
                        ))}
                        {interviewer.specialization.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{interviewer.specialization.length - 2} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedInterviewer(interviewer)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {interviewer.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveInterviewer(interviewer.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectInterviewer(interviewer.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        {interviewer.status === 'active' && (
                          <button
                            onClick={() => {
                              setAssigningRole(interviewer.id);
                              setShowRoleModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900"
                            title="Assign Role"
                          >
                            <UserCog className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interviewer Profile Modal */}
        {selectedInterviewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Interviewer Profile</h2>
                  <button
                    onClick={() => setSelectedInterviewer(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Personal Info */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                        {selectedInterviewer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedInterviewer.name}</h3>
                        <p className="text-gray-600">{roleLabels[selectedInterviewer.role]}</p>
                        <p className="text-sm text-gray-500">{selectedInterviewer.department}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedInterviewer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedInterviewer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedInterviewer.education}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedInterviewer.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          Joined {new Date(selectedInterviewer.joinedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Status and Role */}
                    <div className="pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedInterviewer.status)}`}>
                            {selectedInterviewer.status.charAt(0).toUpperCase() + selectedInterviewer.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Role:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(selectedInterviewer.role)}`}>
                            {roleLabels[selectedInterviewer.role]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Stats */}
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Performance Stats</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600">Total Interviews</p>
                            <p className="text-2xl font-bold text-blue-700">{selectedInterviewer.stats.totalInterviews}</p>
                          </div>
                          <BarChart3 className="w-6 h-6 text-blue-500" />
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-600">Completed</p>
                            <p className="text-2xl font-bold text-green-700">{selectedInterviewer.stats.completedInterviews}</p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-yellow-600">Average Rating</p>
                            <p className="text-2xl font-bold text-yellow-700">{selectedInterviewer.stats.averageRating.toFixed(1)}</p>
                          </div>
                          <Star className="w-6 h-6 text-yellow-500" />
                        </div>
                      </div>
                      
                                              <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-600">Hired</p>
                            <p className="text-2xl font-bold text-purple-700">{selectedInterviewer.stats.candidatesHired}</p>
                          </div>
                          <Award className="w-6 h-6 text-purple-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600">Active Interviews</p>
                          <p className="text-2xl font-bold text-orange-700">{selectedInterviewer.stats.activeInterviews}</p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Hire Success Rate</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${selectedInterviewer.stats.totalInterviews > 0 ? 
                                (selectedInterviewer.stats.candidatesHired / selectedInterviewer.stats.totalInterviews) * 100 : 0}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {selectedInterviewer.stats.totalInterviews > 0 ? 
                            Math.round((selectedInterviewer.stats.candidatesHired / selectedInterviewer.stats.totalInterviews) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills and Availability */}
                  <div className="lg:col-span-1 space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Specialization</h4>
                      <div className="space-y-2">
                        {selectedInterviewer.specialization.map((spec, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mr-2 mb-2"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Technical Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedInterviewer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Availability</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Timezone:</span>
                          <span className="text-sm text-gray-900">{selectedInterviewer.availability.timezone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Working Hours:</span>
                          <span className="text-sm text-gray-900">{selectedInterviewer.availability.workingHours}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 mb-2 block">Preferred Days:</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedInterviewer.availability.preferredDays.map((day, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                              >
                                {day.substring(0, 3)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Bio</h4>
                      <p className="text-sm text-gray-600">{selectedInterviewer.bio}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  {selectedInterviewer.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleApproveInterviewer(selectedInterviewer.id);
                          setSelectedInterviewer(null);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          handleRejectInterviewer(selectedInterviewer.id);
                          setSelectedInterviewer(null);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                      >
                        <UserX className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  
                  {selectedInterviewer.status === 'active' && (
                    <button
                      onClick={() => {
                        setAssigningRole(selectedInterviewer.id);
                        setShowRoleModal(true);
                        setSelectedInterviewer(null);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                    >
                      <UserCog className="w-4 h-4" />
                      <span>Change Role</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedInterviewer(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assign Role Modal */}
        {showRoleModal && assigningRole && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assign Role</h2>
                <p className="text-gray-600 mb-6">
                  Select a role for {interviewers.find(i => i.id === assigningRole)?.name}
                </p>
                
                <div className="space-y-3 mb-6">
                  {Object.entries(roleLabels).map(([role, label]) => (
                    <button
                      key={role}
                      onClick={() => handleAssignRole(assigningRole, role as keyof typeof roleLabels)}
                      className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{label}</div>
                          <div className="text-sm text-gray-500">
                            {role === 'hr' && 'Conducts behavioral and cultural fit interviews'}
                            {role === 'technical_lead' && 'Leads technical interviews and system design'}
                            {role === 'senior_developer' && 'Conducts coding and technical assessments'}
                            {role === 'manager' && 'Evaluates leadership and strategic thinking'}
                          </div>
                        </div>
                        <div className={`p-2 rounded ${getRoleColor(role)}`}>
                          {role === 'hr' && <Shield className="w-4 h-4" />}
                          {role === 'technical_lead' && <Settings className="w-4 h-4" />}
                          {role === 'senior_developer' && <Target className="w-4 h-4" />}
                          {role === 'manager' && <Award className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setAssigningRole(null);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Summary Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interviewers
              .filter(i => i.status === 'active' && i.stats.totalInterviews > 0)
              .sort((a, b) => b.stats.averageRating - a.stats.averageRating)
              .slice(0, 3)
              .map((interviewer, index) => (
                <div key={interviewer.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {index === 0 && <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>}
                      {index === 1 && <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>}
                      {index === 2 && <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{interviewer.name}</div>
                      <div className="text-sm text-gray-600">{roleLabels[interviewer.role]}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{interviewer.stats.averageRating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500">({interviewer.stats.totalInterviews} interviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInterviewers;