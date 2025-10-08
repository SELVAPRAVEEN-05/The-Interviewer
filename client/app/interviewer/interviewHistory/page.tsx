"use client";

import StatCard from "@/app/admin/components/statCard";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Eye,
  Star,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// Feedback Modal Component
const FeedbackModal = ({
  isOpen,
  onClose,
  interview,
}: {
  isOpen: any;
  onClose: any;
  interview: any;
}) => {
  if (!isOpen || !interview) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Interview Feedback
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Candidate:{" "}
                  <span className="font-medium text-gray-700">
                    {interview.candidateName}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{interview.date}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Score and Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Overall Score</p>
              <p className="text-3xl font-bold text-gray-900">
                {interview.score}
                <span className="text-lg text-gray-500">/100</span>
              </p>
            </div>
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Your Rating</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < (interview.rating || 0)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Positive Feedback */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-semibold mb-1">Strengths</p>
                <p className="text-green-700 text-sm">
                  {interview.positiveReview || "No positive feedback provided."}
                </p>
              </div>
            </div>
          </div>

          {/* Improvement Areas */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-semibold mb-1">
                  Areas for Improvement
                </p>
                <p className="text-red-700 text-sm">
                  {interview.negativeReview || "No improvement areas noted."}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          {interview.skills && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <p className="text-gray-800 font-semibold mb-3">
                Technical Skills Assessment
              </p>
              <div className="space-y-3">
                {interview.skills.map((skill: any, idx: any) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {skill.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function InterviewerHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 5;

  const interviewStats = {
    totalCompleted: 45,
    totalConducted: 52,
    avgRating: 4.2,
    candidatesShortlisted: 28,
  };

  const performanceData = [
    { name: "Completed", value: 45, color: "#10b981" },
    { name: "Pending Reviews", value: 7, color: "#3b82f6" },
    { name: "In Progress", value: 12, color: "#f59e0b" },
    { name: "On Hold", value: 5, color: "#ef4444" },
  ];

  const skillTrends = [
    { skill: "Communication", avg: 82, trend: +5 },
    { skill: "Technical Skills", avg: 78, trend: +3 },
    { skill: "Problem Solving", avg: 85, trend: +7 },
    { skill: "Cultural Fit", avg: 80, trend: +2 },
  ];

  const sampleHistory = [
    {
      id: "1",
      candidateName: "Arjun Patel",
      candidateRole: "Full Stack Developer",
      companyName: "TechCorp Solutions",
      date: "25 Sep 2025",
      status: "completed",
      decision: "shortlisted",
      score: 85,
      rating: 4,
      positiveReview:
        "Excellent problem-solving skills and clear communication. Strong understanding of React and Node.js.",
      negativeReview:
        "Could improve on system design thinking and scalability considerations.",
      skills: [
        { name: "React", score: 90 },
        { name: "Node.js", score: 85 },
        { name: "System Design", score: 70 },
      ],
    },
    {
      id: "2",
      candidateName: "Sneha Reddy",
      candidateRole: "Frontend Developer",
      companyName: "InnovateLabs",
      date: "22 Sep 2025",
      status: "completed",
      decision: "shortlisted",
      score: 92,
      rating: 5,
      positiveReview:
        "Outstanding CSS skills and attention to detail. Great portfolio of work.",
      negativeReview: "Need more experience with state management libraries.",
      skills: [
        { name: "CSS/UI", score: 95 },
        { name: "JavaScript", score: 88 },
        { name: "State Management", score: 75 },
      ],
    },
    {
      id: "3",
      candidateName: "Vikram Singh",
      candidateRole: "Backend Developer",
      companyName: "DataSystems Inc",
      date: "18 Sep 2025",
      status: "completed",
      decision: "rejected",
      score: 58,
      rating: 2,
      positiveReview: "Basic understanding of database concepts.",
      negativeReview:
        "Struggled with complex algorithmic questions and optimization techniques.",
      skills: [
        { name: "Algorithms", score: 45 },
        { name: "Databases", score: 65 },
        { name: "API Design", score: 60 },
      ],
    },
    {
      id: "4",
      candidateName: "Ananya Iyer",
      candidateRole: "DevOps Engineer",
      companyName: "CloudNine Tech",
      date: "15 Sep 2025",
      status: "completed",
      decision: "shortlisted",
      score: 88,
      rating: 4,
      positiveReview:
        "Strong knowledge of CI/CD pipelines and cloud infrastructure.",
      negativeReview: "Could benefit from more hands-on Kubernetes experience.",
      skills: [
        { name: "CI/CD", score: 90 },
        { name: "AWS", score: 88 },
        { name: "Kubernetes", score: 75 },
      ],
    },
    {
      id: "5",
      candidateName: "Rohan Mehta",
      candidateRole: "Data Scientist",
      companyName: "AIWorks Pvt Ltd",
      date: "10 Sep 2025",
      status: "pending",
      decision: "pending",
      score: undefined,
      rating: undefined,
    },
  ];

  const totalPages = Math.ceil(sampleHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = sampleHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getDecisionColor = (decision: any) => {
    switch (decision) {
      case "shortlisted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleViewFeedback = (interview: any) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 border border-gray-300 shadow-lg px-6 py-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Interview History</h1>
        <p className="text-gray-600 mt-1">
          Review past interviews and candidate performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={interviewStats.totalConducted}
          icon={Calendar}
          color="blue"
          subtitle={`Completed: ${interviewStats.totalCompleted}`}
        />
        <StatCard
          title="Avg Rating Given"
          value={interviewStats.avgRating}
          icon={Star}
          color="purple"
          subtitle="Out of 5 stars"
        />
        <StatCard
          title="Shortlisted"
          value={interviewStats.candidatesShortlisted}
          icon={CheckCircle}
          color="green"
          subtitle="Candidates recommended"
        />
        <StatCard
          title="Rejection Rate"
          value="46%"
          icon={Target}
          color="red"
          subtitle="Based on assessments"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Interview Overview Chart */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Interview Overview
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {performanceData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-300 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Performance Trends */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Avg Candidate Performance
            </h3>
          </div>
          <div className="space-y-4">
            {skillTrends.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-800 text-sm">
                    {item.skill}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${item.trend > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.trend > 0 ? `+${item.trend}%` : `${item.trend}%`}
                    </span>
                    <span className="font-bold text-gray-900">{item.avg}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview History Table */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Interviews
        </h3>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 bg-gray-200 border border-gray-400 px-4 py-3 font-semibold text-gray-700 rounded-lg mb-2">
          <div>Candidate</div>
          <div>Company</div>
          <div>Date</div>
          <div>Decision</div>
          <div>Score</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        {paginatedHistory.map((interview) => (
          <div
            key={interview.id}
            className="grid grid-cols-6 gap-4 px-4 py-3 my-2 items-center bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition"
          >
            {/* Candidate */}
            <div>
              <div className="font-medium text-gray-900">
                {interview.candidateName}
              </div>
              <div className="text-xs text-gray-500">
                {interview.candidateRole}
              </div>
            </div>

            {/* Company */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">
                {interview.companyName}
              </span>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-900">{interview.date}</div>

            {/* Decision */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getDecisionColor(interview.decision)}`}
              >
                {interview.decision}
              </span>
            </div>

            {/* Score */}
            <div className="font-semibold text-gray-900">
              {interview.score !== undefined ? `${interview.score}/100` : "-"}
            </div>

            {/* Actions */}
            <div>
              {interview.status === "completed" ? (
                <button
                  onClick={() => handleViewFeedback(interview)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
                  title="View Feedback"
                >
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <span className="text-xs text-gray-400">Pending</span>
              )}
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 border rounded-lg text-sm transition ${
                    currentPage === idx + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        interview={selectedInterview}
      />
    </div>
  );
}
