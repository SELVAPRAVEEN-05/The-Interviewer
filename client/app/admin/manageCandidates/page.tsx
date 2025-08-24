"use client";

import React, { useState } from 'react';
import { Eye, X, User, GraduationCap, Code, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  email: string;
  status: 'approved' | 'pending' | 'canceled';
  interviewStatus: 'scheduled' | 'not_scheduled';
  assignedInterviewer: string;
  profilePhoto: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    mobileNo: string;
    email: string;
    dateOfBirth: string;
    gender: string;
  };
  education: {
    collegeName: string;
    qualification: string;
    department: string;
    yearOfPassing: string;
    cgpa: string;
    collegeEmail: string;
    percentage10th: string;
    percentage12th: string;
  };
  skills: {
    resumeLink: string;
    gitLink: string;
    linkedinLink: string;
    portfolioLink: string;
    skillsList: string[];
  };
}

const ManageCandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "approved",
      interviewStatus: "scheduled",
      assignedInterviewer: "Sarah Wilson",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "John",
        lastName: "Doe",
        mobileNo: "+1-555-0123",
        email: "john.doe@example.com",
        dateOfBirth: "1995-06-15",
        gender: "Male"
      },
      education: {
        collegeName: "MIT",
        qualification: "B.Tech",
        department: "Computer Science",
        yearOfPassing: "2020",
        cgpa: "8.5",
        collegeEmail: "john.doe@mit.edu",
        percentage10th: "92%",
        percentage12th: "89%"
      },
      skills: {
        resumeLink: "https://example.com/resume.pdf",
        gitLink: "https://github.com/johndoe",
        linkedinLink: "https://linkedin.com/in/johndoe",
        portfolioLink: "https://johndoe.dev",
        skillsList: ["React", "Node.js", "TypeScript", "Python", "AWS"]
      }
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      status: "pending",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "Not Assigned",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Alice",
        lastName: "Smith",
        mobileNo: "+1-555-0124",
        email: "alice.smith@example.com",
        dateOfBirth: "1997-03-22",
        gender: "Female"
      },
      education: {
        collegeName: "Stanford University",
        qualification: "M.Tech",
        department: "Software Engineering",
        yearOfPassing: "2022",
        cgpa: "9.1",
        collegeEmail: "alice.smith@stanford.edu",
        percentage10th: "95%",
        percentage12th: "93%"
      },
      skills: {
        resumeLink: "https://example.com/alice-resume.pdf",
        gitLink: "https://github.com/alicesmith",
        linkedinLink: "https://linkedin.com/in/alicesmith",
        portfolioLink: "https://alicesmith.dev",
        skillsList: ["Vue.js", "Django", "PostgreSQL", "Docker", "Kubernetes"]
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      status: "canceled",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "David Brown",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Mike",
        lastName: "Johnson",
        mobileNo: "+1-555-0125",
        email: "mike.johnson@example.com",
        dateOfBirth: "1994-11-08",
        gender: "Male"
      },
      education: {
        collegeName: "UC Berkeley",
        qualification: "B.Tech",
        department: "Information Technology",
        yearOfPassing: "2018",
        cgpa: "7.8",
        collegeEmail: "mike.johnson@berkeley.edu",
        percentage10th: "88%",
        percentage12th: "85%"
      },
      skills: {
        resumeLink: "https://example.com/mike-resume.pdf",
        gitLink: "https://github.com/mikejohnson",
        linkedinLink: "https://linkedin.com/in/mikejohnson",
        portfolioLink: "https://mikejohnson.dev",
        skillsList: ["Angular", "Spring Boot", "MySQL", "Jenkins", "Git"]
      }
    }
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'skills'>('personal');

  const updateCandidateStatus = (id: number, newStatus: 'approved' | 'pending' | 'canceled') => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    ));
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1";
    switch (status) {
      case 'approved':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle size={12} />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock size={12} />
            Pending
          </span>
        );
      case 'canceled':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle size={12} />
            Canceled
          </span>
        );
      default:
        return <span className={baseClasses}>Unknown</span>;
    }
  };

  const getInterviewStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1";
    switch (status) {
      case 'scheduled':
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <Calendar size={12} />
            Scheduled
          </span>
        );
      case 'not_scheduled':
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            <Clock size={12} />
            Not Scheduled
          </span>
        );
      default:
        return <span className={baseClasses}>Unknown</span>;
    }
  };

  const renderPersonalTab = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.personalDetails.firstName}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.personalDetails.lastName}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.personalDetails.mobileNo}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.personalDetails.email}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.personalDetails.dateOfBirth}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.personalDetails.gender}</p>
      </div>
    </div>
  );

  const renderEducationTab = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.collegeName}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.qualification}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.department}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.yearOfPassing}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.cgpa}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">College Email</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.collegeEmail}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">10th Percentage</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.percentage10th}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">12th Percentage</label>
        <p className="text-sm text-gray-900">{selectedCandidate?.education.percentage12th}</p>
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link</label>
          <a href={selectedCandidate?.skills.resumeLink} target="_blank" rel="noopener noreferrer" 
             className="text-sm text-blue-600 hover:text-blue-800 underline">
            View Resume
          </a>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
          <a href={selectedCandidate?.skills.gitLink} target="_blank" rel="noopener noreferrer" 
             className="text-sm text-blue-600 hover:text-blue-800 underline">
            View GitHub Profile
          </a>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <a href={selectedCandidate?.skills.linkedinLink} target="_blank" rel="noopener noreferrer" 
             className="text-sm text-blue-600 hover:text-blue-800 underline">
            View LinkedIn Profile
          </a>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
          <a href={selectedCandidate?.skills.portfolioLink} target="_blank" rel="noopener noreferrer" 
             className="text-sm text-blue-600 hover:text-blue-800 underline">
            View Portfolio
          </a>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
        <div className="flex flex-wrap gap-2">
          {selectedCandidate?.skills.skillsList.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Manage Candidates</h1>
            <p className="text-gray-600 mt-1">View and manage all candidate applications</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interview Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Interviewer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={candidate.profilePhoto} alt={candidate.name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{candidate.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(candidate.status)}
                        <select 
                          value={candidate.status}
                          onChange={(e) => updateCandidateStatus(candidate.id, e.target.value as 'approved' | 'pending' | 'canceled')}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getInterviewStatusBadge(candidate.interviewStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.assignedInterviewer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setSelectedCandidate(candidate)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Eye size={16} />
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  className="h-16 w-16 rounded-full object-cover" 
                  src={selectedCandidate.profilePhoto} 
                  alt={selectedCandidate.name} 
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                  <p className="text-gray-600">{selectedCandidate.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    activeTab === 'personal' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <User size={16} />
                  Personal
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    activeTab === 'education' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <GraduationCap size={16} />
                  Education
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    activeTab === 'skills' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Code size={16} />
                  Skills
                </button>
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'personal' && renderPersonalTab()}
                {activeTab === 'education' && renderEducationTab()}
                {activeTab === 'skills' && renderSkillsTab()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCandidatesPage;