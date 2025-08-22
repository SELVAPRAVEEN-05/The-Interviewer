'use client';

import React, { useState, useEffect } from 'react';
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
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  FileText,
  UserPlus
} from 'lucide-react';

// Types
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  interviewStatus: 'not_scheduled' | 'scheduled' | 'completed';
  appliedDate: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  resume: string;
  location: string;
  assignedInterviewer?: {
    id: string;
    name: string;
  };
  interviewDate?: string;
  profilePicture?: string;
}

interface Interviewer {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    status: 'pending',
    interviewStatus: 'not_scheduled',
    appliedDate: '2024-01-15',
    position: 'Full Stack Developer',
    experience: '3 years',
    education: 'BS Computer Science - MIT',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    resume: 'john_doe_resume.pdf',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 234-5678',
    status: 'approved',
    interviewStatus: 'scheduled',
    appliedDate: '2024-01-12',
    position: 'Frontend Developer',
    experience: '2 years',
    education: 'BS Software Engineering - Stanford',
    skills: ['React', 'Vue.js', 'CSS', 'JavaScript'],
    resume: 'alice_johnson_resume.pdf',
    location: 'San Francisco, CA',
    assignedInterviewer: { id: '1', name: 'Robert Brown' },
    interviewDate: '2024-01-25'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@email.com',
    phone: '+1 (555) 345-6789',
    status: 'approved',
    interviewStatus: 'completed',
    appliedDate: '2024-01-10',
    position: 'Backend Developer',
    experience: '4 years',
    education: 'MS Computer Science - Carnegie Mellon',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    resume: 'bob_wilson_resume.pdf',
    location: 'Seattle, WA',
    assignedInterviewer: { id: '2', name: 'Lisa Wang' },
    interviewDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 456-7890',
    status: 'rejected',
    interviewStatus: 'not_scheduled',
    appliedDate: '2024-01-08',
    position: 'Full Stack Developer',
    experience: '1 year',
    education: 'BS Information Technology - UCLA',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    resume: 'emma_davis_resume.pdf',
    location: 'Los Angeles, CA'
  }
];

const mockInterviewers: Interviewer[] = [
  { id: '1', name: 'Robert Brown', email: 'robert.brown@company.com', specialization: 'Full Stack' },
  { id: '2', name: 'Lisa Wang', email: 'lisa.wang@company.com', specialization: 'Backend' },
  { id: '3', name: 'John Smith', email: 'john.smith@company.com', specialization: 'Frontend' },
  { id: '4', name: 'Sarah Miller', email: 'sarah.miller@company.com', specialization: 'DevOps' }
];

const ManageCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningCandidate, setAssigningCandidate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [interviewStatusFilter, setInterviewStatusFilter] = useState('all');

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesInterviewStatus = interviewStatusFilter === 'all' || candidate.interviewStatus === interviewStatusFilter;
    
    return matchesSearch && matchesStatus && matchesInterviewStatus;
  });

  const handleApproveCandidate = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: 'approved' as const }
          : candidate
      )
    );
  };

  const handleRejectCandidate = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: 'rejected' as const }
          : candidate
      )
    );
  };

  const handleAssignInterviewer = (candidateId: string, interviewerId: string) => {
    const interviewer = mockInterviewers.find(i => i.id === interviewerId);
    if (interviewer) {
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === candidateId 
            ? { 
                ...candidate, 
                assignedInterviewer: { id: interviewer.id, name: interviewer.name },
                interviewStatus: 'scheduled' as const,
                interviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 week from now
              }
            : candidate
        )
      );
    }
    setShowAssignModal(false);
    setAssigningCandidate(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterviewStatusColor = (status: string) => {
    switch (status) {
      case 'not_scheduled': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const pendingCount = candidates.filter(c => c.status === 'pending').length;
  const approvedCount = candidates.filter(c => c.status === 'approved').length;
  const scheduledCount = candidates.filter(c => c.interviewStatus === 'scheduled').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Candidates</h1>
          <p className="text-gray-600">Review, approve, and assign candidates to interviewers</p>
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
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
              </div>
              <Users className="w-8 h-8 text-gray-600" />
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
                placeholder="Search candidates..."
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Interview Status Filter */}
            <div className="flex items-center gap-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={interviewStatusFilter}
                onChange={(e) => setInterviewStatusFilter(e.target.value)}
              >
                <option value="all">All Interview Status</option>
                <option value="not_scheduled">Not Scheduled</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interview Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Interviewer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.position}</div>
                      <div className="text-sm text-gray-500">{candidate.experience} experience</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {getStatusIcon(candidate.status)}
                        <span className="ml-1 capitalize">{candidate.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInterviewStatusColor(candidate.interviewStatus)}`}>
                        {candidate.interviewStatus.replace('_', ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(candidate.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.assignedInterviewer ? (
                        <div>
                          <div className="font-medium">{candidate.assignedInterviewer.name}</div>
                          {candidate.interviewDate && (
                            <div className="text-xs text-gray-500">
                              {new Date(candidate.interviewDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {candidate.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveCandidate(candidate.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectCandidate(candidate.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        {candidate.status === 'approved' && !candidate.assignedInterviewer && (
                          <button
                            onClick={() => {
                              setAssigningCandidate(candidate.id);
                              setShowAssignModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900"
                            title="Assign Interviewer"
                          >
                            <UserPlus className="w-4 h-4" />
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

        {/* Candidate Profile Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                        {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedCandidate.name}</h3>
                        <p className="text-gray-600">{selectedCandidate.position}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedCandidate.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedCandidate.education}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedCandidate.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                          {selectedCandidate.resume}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills and Status */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Application Status:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedCandidate.status)}`}>
                            {selectedCandidate.status.charAt(0).toUpperCase() + selectedCandidate.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Interview Status:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getInterviewStatusColor(selectedCandidate.interviewStatus)}`}>
                            {selectedCandidate.interviewStatus.replace('_', ' ').split(' ').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Applied Date:</span>
                          <span className="text-sm text-gray-900">
                            {new Date(selectedCandidate.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                        {selectedCandidate.assignedInterviewer && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Assigned Interviewer:</span>
                              <span className="text-sm text-gray-900">{selectedCandidate.assignedInterviewer.name}</span>
                            </div>
                            {selectedCandidate.interviewDate && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Interview Date:</span>
                                <span className="text-sm text-gray-900">
                                  {new Date(selectedCandidate.interviewDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  {selectedCandidate.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleApproveCandidate(selectedCandidate.id);
                          setSelectedCandidate(null);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          handleRejectCandidate(selectedCandidate.id);
                          setSelectedCandidate(null);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                      >
                        <UserX className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  
                  {selectedCandidate.status === 'approved' && !selectedCandidate.assignedInterviewer && (
                    <button
                      onClick={() => {
                        setAssigningCandidate(selectedCandidate.id);
                        setShowAssignModal(true);
                        setSelectedCandidate(null);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Assign Interviewer</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assign Interviewer Modal */}
        {showAssignModal && assigningCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assign Interviewer</h2>
                <p className="text-gray-600 mb-6">
                  Select an interviewer for {candidates.find(c => c.id === assigningCandidate)?.name}
                </p>
                
                <div className="space-y-3 mb-6">
                  {mockInterviewers.map((interviewer) => (
                    <button
                      key={interviewer.id}
                      onClick={() => handleAssignInterviewer(assigningCandidate, interviewer.id)}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300"
                    >
                      <div className="font-medium text-gray-900">{interviewer.name}</div>
                      <div className="text-sm text-gray-500">{interviewer.specialization} • {interviewer.email}</div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAssignModal(false);
                      setAssigningCandidate(null);
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
      </div>
    </div>
  );
};

export default ManageCandidates;