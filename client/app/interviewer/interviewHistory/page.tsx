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
import { useState, useEffect } from "react";
import { getRequest } from "@/utils";

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
                    className={`w-6 h-6 ${i < (interview.rating || 0)
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

  // State for dashboard data
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for interview history data
  const [historyData, setHistoryData] = useState<any>(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      try {
        const response = await getRequest(`${baseUrl}api/interviewer/dashboard`, {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        });

        const result: any = response as any;
        const data = result?.data ?? result;

        console.log("📊 Interview History - Dashboard Data:", data);
        setDashboardData(data);
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        setError(err?.message ?? "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch interview history data from API
  useEffect(() => {
    const fetchHistoryData = async () => {
      setHistoryLoading(true);
      setHistoryError(null);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      try {
        const response: any = await getRequest(`${baseUrl}api/interviewer/history?page=${currentPage}`, {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        });

        console.log("📋 Interview History - Raw Response:", response);

        // The getRequest already returns response.data from axios interceptor
        // So response is already the API response body: { message, Failed, data: [...], meta }
        setHistoryData(response);

        // Set total pages from meta data
        if (response?.meta?.pages) {
          setTotalPages(response.meta.pages);
        }

        console.log("📋 History Data Set:", {
          dataArray: response?.data,
          meta: response?.meta,
          dataLength: response?.data?.length
        });
      } catch (err: any) {
        console.error("Error fetching history data:", err);
        setHistoryError(err?.message ?? "Failed to load interview history");
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistoryData();
  }, [currentPage]);

  // Loading skeleton component
  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 rounded ${className} animate-pulse`} />
  );

  // Calculate stats from backend data
  const interviewStats = {
    totalConducted: dashboardData?.interviewCount ?? 0,
    totalCompleted: dashboardData?.interviewData?.completed ?? 0,
    avgRating: dashboardData?.AvgPerformance?.[0]?.averageRating ?? 0,
    candidatesShortlisted: dashboardData?.shortlisted ?? 0,
    scheduled: dashboardData?.interviewData?.scheduled ?? 0,
    cancelled: dashboardData?.interviewData?.cancelled ?? 0,
  };

  const performanceData = [
    { name: "Completed", value: interviewStats.totalCompleted, color: "#10b981" },
    { name: "Scheduled", value: interviewStats.scheduled, color: "#3b82f6" },
    { name: "Cancelled", value: interviewStats.cancelled, color: "#ef4444" },
    { name: "Shortlisted", value: interviewStats.candidatesShortlisted, color: "#f59e0b" },
  ];

  // Skills data from backend
  const skillTrends = loading || !dashboardData?.SkillsAssessment
    ? []
    : dashboardData.SkillsAssessment.map((item: any) => ({
      skill: item.skillName,
      avg: Math.round(item.percentage ?? 0),
    }));

  // Transform API data to match the component's expected format
  const transformedHistory = historyLoading || !historyData?.data
    ? []
    : historyData.data.map((interview: any) => {
      const feedback = interview.feedbacks?.[0];
      const participant = interview.participants?.[0];
      const candidateName = participant?.user
        ? `${participant.user.first_name} ${participant.user.last_name}`
        : "N/A";
      const candidateEmail = participant?.user?.email ?? "";

      const interviewerPosition = interview.user?.userPositions?.[0];
      const companyName = interviewerPosition?.brand?.name ?? "N/A";

      const date = new Date(interview.scheduled_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const status = interview.status?.toLowerCase() ?? "pending";
      const decision = participant?.sortlisted
        ? "shortlisted"
        : (status === "completed" ? "rejected" : "pending");

      const skills = feedback?.feedbackSkills?.map((fs: any) => ({
        name: fs.skill?.name ?? "Unknown",
        score: fs.value ?? 0,
      })) ?? [];

      return {
        id: interview.id,
        candidateName,
        candidateEmail,
        candidateRole: interviewerPosition?.position?.title ?? "N/A",
        companyName,
        date,
        status,
        decision,
        score: feedback?.score ?? undefined,
        rating: feedback?.rating ?? undefined,
        positiveReview: feedback?.positive_aspects ?? undefined,
        negativeReview: feedback?.negative_aspects ?? undefined,
        skills,
        interviewType: interview.type,
        interviewName: interview.name,
        sessionLink: interview.session_link,
      };
    });

  const paginatedHistory = transformedHistory;

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
          value={loading ? <Skeleton className="w-16 h-8" /> : interviewStats.totalConducted}
          icon={Calendar}
          color="blue"
          subtitle={loading ? '' : `Completed: ${interviewStats.totalCompleted}`}
        />
        <StatCard
          title="Avg Rating Given"
          value={loading ? <Skeleton className="w-12 h-8" /> : interviewStats.avgRating}
          icon={Star}
          color="purple"
          subtitle="Out of 5 stars"
        />
        <StatCard
          title="Shortlisted"
          value={loading ? <Skeleton className="w-12 h-8" /> : interviewStats.candidatesShortlisted}
          icon={CheckCircle}
          color="green"
          subtitle="Candidates recommended"
        />
        <StatCard
          title="Avg Duration"
          value={loading ? <Skeleton className="w-16 h-8" /> : `${dashboardData?.avgDuration ?? 0}m`}
          icon={Target}
          color="orange"
          subtitle="Per interview"
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
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : (
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
          )}
        </div>

        {/* Skill Performance Trends */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Avg Candidate Performance
            </h3>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i: number) => (
                <Skeleton key={i} className="h-12 rounded" />
              ))}
            </div>
          ) : skillTrends.length === 0 ? (
            <div className="flex items-center justify-center h-[160px] text-gray-500">
              No skills data available
            </div>
          ) : (
            <div className="space-y-4">
              {skillTrends.map((item: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800 text-sm">
                      {item.skill}
                    </span>
                    <span className="font-bold text-gray-900">{item.avg}%</span>
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
          )}
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

        {/* Loading State */}
        {historyLoading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-4 px-4 py-3 bg-white border border-gray-300 rounded-lg"
              >
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {historyError && !historyLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading interview history</p>
            <p className="text-sm mt-1">{historyError}</p>
          </div>
        )}

        {/* Empty State */}
        {!historyLoading && !historyError && paginatedHistory.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No interview history found</p>
            <p className="text-sm text-gray-500 mt-1">
              Your completed interviews will appear here
            </p>
          </div>
        )}

        {/* Table Rows */}
        {!historyLoading && !historyError && paginatedHistory.map((interview: any) => (
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
              {interview.score !== undefined ? `${interview.score}` : "-"}
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
        {!historyLoading && !historyError && totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
              {historyData?.meta?.total && ` • ${historyData.meta.total} total interviews`}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                // Show first page, last page, current page, and pages around current
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 border rounded-lg text-sm transition ${currentPage === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

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
