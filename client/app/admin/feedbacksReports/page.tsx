"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Star, 
  Users, 
  TrendingUp, 
  Calendar,
  Eye,
  BarChart3,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';

interface Feedback {
  id: string;
  candidateName: string;
  candidateEmail: string;
  interviewerName: string;
  jobRole: string;
  date: string;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  overallScore: number;
  decision: 'Recommended' | 'Not Recommended' | 'Maybe';
  feedback: string;
  codingTaskScore: number;
}

interface Report {
  id: string;
  type: 'candidate' | 'interviewer' | 'job_role';
  title: string;
  generatedDate: string;
  recordCount: number;
}

const AdminFeedbackReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'reports'>('feedback');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDecision, setFilterDecision] = useState<string>('all');
  const [filterJobRole, setFilterJobRole] = useState<string>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  // Mock data for feedback
  const feedbackData: Feedback[] = [
    {
      id: '1',
      candidateName: 'John Smith',
      candidateEmail: 'john.smith@email.com',
      interviewerName: 'Sarah Wilson',
      jobRole: 'Frontend Developer',
      date: '2024-08-22',
      technicalScore: 8,
      communicationScore: 7,
      problemSolvingScore: 9,
      overallScore: 8,
      decision: 'Recommended',
      feedback: 'Strong technical skills, excellent problem-solving approach. Good communication during the coding session.',
      codingTaskScore: 85
    },
    {
      id: '2',
      candidateName: 'Emily Johnson',
      candidateEmail: 'emily.j@email.com',
      interviewerName: 'Mike Chen',
      jobRole: 'Full Stack Developer',
      date: '2024-08-21',
      technicalScore: 6,
      communicationScore: 8,
      problemSolvingScore: 5,
      overallScore: 6,
      decision: 'Maybe',
      feedback: 'Good communication skills but needs improvement in algorithm optimization.',
      codingTaskScore: 65
    },
    {
      id: '3',
      candidateName: 'David Brown',
      candidateEmail: 'david.brown@email.com',
      interviewerName: 'Lisa Garcia',
      jobRole: 'Backend Developer',
      date: '2024-08-20',
      technicalScore: 9,
      communicationScore: 6,
      problemSolvingScore: 8,
      overallScore: 8,
      decision: 'Recommended',
      feedback: 'Excellent technical knowledge and system design skills. Could improve presentation skills.',
      codingTaskScore: 92
    }
  ];

  // Mock data for reports
  const reportsData: Report[] = [
    {
      id: '1',
      type: 'candidate',
      title: 'Candidate Performance Report - August 2024',
      generatedDate: '2024-08-23',
      recordCount: 45
    },
    {
      id: '2',
      type: 'interviewer',
      title: 'Interviewer Activity Report - Q3 2024',
      generatedDate: '2024-08-20',
      recordCount: 12
    },
    {
      id: '3',
      type: 'job_role',
      title: 'Job Role Analysis - Frontend Positions',
      generatedDate: '2024-08-18',
      recordCount: 28
    }
  ];

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.interviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDecision = filterDecision === 'all' || feedback.decision === filterDecision;
    const matchesJobRole = filterJobRole === 'all' || feedback.jobRole === filterJobRole;
    return matchesSearch && matchesDecision && matchesJobRole;
  });

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'Recommended': return 'text-green-600 bg-green-100';
      case 'Not Recommended': return 'text-red-600 bg-red-100';
      case 'Maybe': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const generateReport = (type: 'candidate' | 'interviewer' | 'job_role') => {
    alert(`Generating ${type} report...`);
  };

  const exportResults = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`Exporting results as ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage feedback and generate comprehensive reports</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recommended</p>
                <p className="text-2xl font-bold text-green-600">89</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-blue-600">7.2</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">43</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'feedback'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Feedback & Scores</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reports</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search candidates, interviewers, or job roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterDecision}
                  onChange={(e) => setFilterDecision(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Decisions</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Maybe">Maybe</option>
                  <option value="Not Recommended">Not Recommended</option>
                </select>
                <select
                  value={filterJobRole}
                  onChange={(e) => setFilterJobRole(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Job Roles</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                </select>
              </div>

              {/* Feedback Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Candidate</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Interviewer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Job Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Overall Score</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Decision</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeedback.map((feedback) => (
                      <tr key={feedback.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{feedback.candidateName}</p>
                            <p className="text-sm text-gray-500">{feedback.candidateEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{feedback.interviewerName}</td>
                        <td className="py-3 px-4 text-gray-900">{feedback.jobRole}</td>
                        <td className="py-3 px-4 text-gray-500">{feedback.date}</td>
                        <td className="py-3 px-4">
                          <span className={`text-lg font-semibold ${getScoreColor(feedback.overallScore)}`}>
                            {feedback.overallScore}/10
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDecisionColor(feedback.decision)}`}>
                            {feedback.decision}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedFeedback(feedback)}
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Export Options */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => exportResults('pdf')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={() => exportResults('excel')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Excel</span>
                </button>
                <button
                  onClick={() => exportResults('csv')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="p-6">
              {/* Generate New Report */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => generateReport('candidate')}
                    className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 text-center group"
                  >
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium text-gray-900">Candidate Report</h4>
                    <p className="text-sm text-gray-500">Performance by candidate</p>
                  </button>
                  <button
                    onClick={() => generateReport('interviewer')}
                    className="p-4 bg-white border-2 border-green-200 rounded-lg hover:border-green-400 text-center group"
                  >
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium text-gray-900">Interviewer Report</h4>
                    <p className="text-sm text-gray-500">Activity by interviewer</p>
                  </button>
                  <button
                    onClick={() => generateReport('job_role')}
                    className="p-4 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-400 text-center group"
                  >
                    <PieChart className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium text-gray-900">Job Role Report</h4>
                    <p className="text-sm text-gray-500">Analysis by position</p>
                  </button>
                </div>
              </div>

              {/* Existing Reports */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  {reportsData.map((report) => (
                    <div key={report.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded">
                            <FileText className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{report.title}</h4>
                            <p className="text-sm text-gray-500">
                              Generated on {report.generatedDate} • {report.recordCount} records
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                            View
                          </button>
                          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-1">
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Interview Feedback Details</h2>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{selectedFeedback.candidateName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedFeedback.candidateEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Job Role</label>
                      <p className="text-gray-900">{selectedFeedback.jobRole}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Interview Date</label>
                      <p className="text-gray-900">{selectedFeedback.date}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Interviewer</label>
                      <p className="text-gray-900">{selectedFeedback.interviewerName}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Scores</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Technical Skills</span>
                      <span className={`font-semibold ${getScoreColor(selectedFeedback.technicalScore)}`}>
                        {selectedFeedback.technicalScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Communication</span>
                      <span className={`font-semibold ${getScoreColor(selectedFeedback.communicationScore)}`}>
                        {selectedFeedback.communicationScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Problem Solving</span>
                      <span className={`font-semibold ${getScoreColor(selectedFeedback.problemSolvingScore)}`}>
                        {selectedFeedback.problemSolvingScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Coding Task</span>
                      <span className={`font-semibold ${getScoreColor(selectedFeedback.codingTaskScore / 10)}`}>
                        {selectedFeedback.codingTaskScore}/100
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Overall Score</span>
                        <span className={`text-xl font-bold ${getScoreColor(selectedFeedback.overallScore)}`}>
                          {selectedFeedback.overallScore}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Decision & Feedback</h3>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDecisionColor(selectedFeedback.decision)}`}>
                    {selectedFeedback.decision}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedFeedback.feedback}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackReports;