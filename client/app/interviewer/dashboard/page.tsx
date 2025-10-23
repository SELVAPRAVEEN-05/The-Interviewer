"use client";

import StatCard from "@/app/admin/components/statCard";
import {
  AlertCircle,
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequest } from "@/utils";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Interview card component (destructured props so date/time display works)
 */
type UpcomingInterviewProps = {
  id?: number | string;
  candidateName: string;
  position: string;
  type: string;
  date: string;
  time: string;
};

const UpcomingInterviewCard: React.FC<UpcomingInterviewProps> = ({
  candidateName,
  position,
  type,
  date,
  time,
}) => {

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{candidateName}</h4>
            <p className="text-xs text-gray-500">{position}</p>
          </div>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
          {type}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>

      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
        <Video className="w-4 h-4" />
        Start Interview
      </button>
    </div>
  );
};

/**
 * Recent Activity Item
 */
type Activity = {
  type: "completed" | "scheduled" | "feedback" | "rejected" | string;
  title: string;
  description: string;
  time: string;
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "scheduled":
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case "feedback":
        return <Star className="w-5 h-5 text-yellow-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
      <div className="mt-0.5">{getIcon(activity.type)}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-900 font-medium">{activity.title}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

/**
 * Main Dashboard Component
 */
export default function InterviewerDashboard() {
  const router = useRouter();

  // State for dashboard data
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for upcoming interviews
  const [upcomingInterviews, setUpcomingInterviews] = useState<UpcomingInterviewProps[]>([]);
  const [interviewsLoading, setInterviewsLoading] = useState(true);

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

        console.log("📊 Interviewer Dashboard Data:", data);
        setDashboardData(data);
      } catch (err: any) {
        console.error("Error fetching interviewer dashboard data:", err);
        setError(err?.message ?? "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch upcoming interviews from API
  useEffect(() => {
    const fetchUpcomingInterviews = async () => {
      setInterviewsLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      try {
        const response = await getRequest(`${baseUrl}api/interviewer/upcoming?q=`, 
          {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        }
      );

        const result: any = response as any;
        const data = result?.data ?? result;

        console.log("📋 Dashboard Upcoming Interviews:", data);

        // Transform the API data to match the component's expected format
        const transformedInterviews: UpcomingInterviewProps[] = Array.isArray(data) ? data
          .filter((interview: any) => interview.status === "SCHEDULED")
          .map((interview: any) => {
            const scheduled = interview.scheduled_at ? new Date(interview.scheduled_at) : null;
            const candidate = interview.participants?.[0]?.user;
            const position = interview.user?.userPositions?.[0]?.position?.title;

            return {
              id: interview.id,
              candidateName: candidate ? `${candidate.first_name} ${candidate.last_name}`.trim() : "Unknown",
              position: position || "Position",
              type: interview.type || "Technical",
              date: scheduled ? scheduled.toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "TBD",
              time: scheduled
                ? `${scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${new Date(scheduled.getTime() + 60 * 60 * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
                : "TBD",
            };
          })
          .slice(0, 2) // Get only the first 2 interviews
          : [];

        setUpcomingInterviews(transformedInterviews);
      } catch (err: any) {
        console.error("Error fetching upcoming interviews:", err);
      } finally {
        setInterviewsLoading(false);
      }
    };

    fetchUpcomingInterviews();
  }, []);

  // Loading skeleton component
  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 rounded ${className} animate-pulse`} />
  );

  // Stats Data - using backend data when available
  const stats = {
    totalInterviews: {
      value: loading ? <Skeleton className="w-16 h-8" /> : (dashboardData?.interviewCount ?? 0),
      subtitle: "Total conducted"
    },
    thisWeek: {
      value: loading ? <Skeleton className="w-12 h-8" /> : (dashboardData?.scheduledToday ?? 0),
      subtitle: "Scheduled today"
    },
    shortlisted: {
      value: loading ? <Skeleton className="w-12 h-8" /> : (dashboardData?.shortlisted ?? 0),
      subtitle: "Candidates recommended"
    },
    avgDuration: {
      value: loading ? <Skeleton className="w-16 h-8" /> : `${dashboardData?.avgDuration ?? 0}m`,
      subtitle: "Per interview"
    },
  };

  // Pie Chart Data - Interview Status (from backend)
  const interviewStatusData = loading ? [
    { name: "Completed", value: 0, color: "#10b981" },
    { name: "Scheduled", value: 0, color: "#3b82f6" },
    { name: "Cancelled", value: 0, color: "#ef4444" },
  ] : [
    {
      name: "Completed",
      value: dashboardData?.interviewData?.completed ?? 0,
      color: "#10b981"
    },
    {
      name: "Scheduled",
      value: dashboardData?.interviewData?.scheduled ?? 0,
      color: "#3b82f6"
    },
    {
      name: "Cancelled",
      value: dashboardData?.interviewData?.cancelled ?? 0,
      color: "#ef4444"
    },
  ];

  // Bar Chart Data - Monthly Interview Trends (from backend)
  const monthlyTrendsData = loading || !dashboardData?.MonthlyInterview
    ? []
    : dashboardData.MonthlyInterview.map((item: any) => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIndex = parseInt(item.month) - 1;
      return {
        month: monthNames[monthIndex] || item.month,
        interviews: item.data?.count ?? 0,
        shortlisted: item.data?.shortlisted ?? 0,
      };
    });

  // Line Chart Data - Performance Over Time (from backend)
  const performanceData = loading || !dashboardData?.AvgPerformance
    ? []
    : dashboardData.AvgPerformance.map((item: any) => ({
      week: `Week ${item.week}`,
      score: Math.round(item.averageScore ?? 0),
      rating: item.averageRating ?? 0,
    }));

  // Skills Assessment Data (from backend)
  const skillsData = loading || !dashboardData?.SkillsAssessment
    ? []
    : dashboardData.SkillsAssessment.map((item: any) => ({
      skill: item.skillName,
      score: Math.round(item.percentage ?? 0),
    }));

  // Recent Activities
  const recentActivities: Activity[] = [
    {
      type: "completed",
      title: "Interview Completed",
      description: "Technical interview with Ananya Iyer for DevOps Engineer",
      time: "2 hours ago",
    },
    {
      type: "feedback",
      title: "Feedback Submitted",
      description: "Submitted detailed feedback for Rohan Mehta",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-100 border border-gray-300 shadow-lg px-6 py-6 rounded-xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Rajesh! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your interviews today
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today's Date</p>
            <p className="text-lg font-semibold text-gray-900">
              Wednesday, Oct 8, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={stats.totalInterviews.value}
          icon={Calendar}
          color="blue"
          subtitle={stats.totalInterviews.subtitle}
        />
        <StatCard
          title="Scheduled Today"
          value={stats.thisWeek.value}
          icon={Clock}
          color="green"
          subtitle={stats.thisWeek.subtitle}
        />
        <StatCard
          title="Shortlisted"
          value={stats.shortlisted.value}
          icon={Award}
          color="green"
          subtitle={stats.shortlisted.subtitle}
        />
        <StatCard
          title="Avg Duration"
          value={stats.avgDuration.value}
          icon={Target}
          color="blue"
          subtitle={stats.avgDuration.subtitle}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Interview Status Pie Chart */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Interview Status Distribution
              </h3>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <Skeleton className="w-32 h-32 rounded-full" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={interviewStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {interviewStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 flex-1 ml-4">
                {interviewStatusData.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm text-gray-700">{entry.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Monthly Trends Bar Chart */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Interview Trends
            </h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <Skeleton className="w-full h-full" />
            </div>
          ) : monthlyTrendsData.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-gray-500">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="interviews"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  name="Total Interviews"
                />
                <Bar
                  dataKey="shortlisted"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Shortlisted"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Performance and Skills Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Over Time */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Candidate Avg Performance Trend
            </h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <Skeleton className="w-full h-full" />
            </div>
          ) : performanceData.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-gray-500">
              No performance data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 5 }}
                  name="Avg Score"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Skills Assessment */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Avg Skills Assessment
            </h3>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="w-full h-12 mb-2" />
                </div>
              ))}
            </div>
          ) : skillsData.length === 0 ? (
            <div className="flex items-center justify-center h-[160px] text-gray-500">
              No skills data available
            </div>
          ) : (
            <div className="space-y-4">
              {skillsData.map((skill: { skill: string; score: number }, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {skill.skill}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section - Upcoming Interviews and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <div className="lg:col-span-2 bg-gray-100 border border-gray-300 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Interviews
              </h3>
            </div>
            {/* show "View All" only if there are interviews */}
            {!interviewsLoading && upcomingInterviews.length > 0 && (
              <button
                onClick={() => router.push("/interviewer/upcommingInterviewes")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            )}
          </div>

          {/* show loading, empty state, or interview cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewsLoading ? (
              // Loading skeletons
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-gray-300 rounded-lg p-4">
                  <Skeleton className="w-full h-40" />
                </div>
              ))
            ) : upcomingInterviews.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-gray-500">
                No upcoming interviews scheduled
              </div>
            ) : (
              upcomingInterviews.slice(0, 2).map((interview) => (
                // Using spread so props align with destructured UpcomingInterviewCard
                <UpcomingInterviewCard key={interview.id} {...interview} />
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4 overflow-y-auto">
            {recentActivities.map((activity, idx) => (
              <ActivityItem key={idx} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
