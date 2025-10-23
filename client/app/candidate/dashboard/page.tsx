"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import StatCard from "@/app/admin/components/statCard";
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { InterviewMiniHistoryTable } from "../components/miniTable";
import { getRequest } from "@/utils";

const CandidateDashboard = () => {
  const [timeToInterview, setTimeToInterview] = useState<string>("");

  const [upcomingInterview, setUpcomingInterview] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // stable seed for placeholder random image (stays same while component mounted)
  const [placeholderSeed] = useState(() => Math.floor(Math.random() * 1000000));

  // Simple skeleton box used for loading placeholders
  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 rounded ${className} animate-pulse`} />
  );

  const skillPerformance = [
    { skill: "Algorithms", score: 85, maxScore: 100 },
    { skill: "SQL", score: 78, maxScore: 100 },
    { skill: "Problem Solving", score: 92, maxScore: 100 },
    { skill: "Communication", score: 88, maxScore: 100 },
    { skill: "System Design", score: 75, maxScore: 100 },
  ];

  const performanceTrend = [
    { date: "2025-08-10", points: 50 },
    { date: "2025-08-15", points: 65 },
    { date: "2025-08-20", points: 72 },
    { date: "2025-08-27", points: 80 },
    { date: "2025-09-05", points: 85 },
    { date: "2025-09-09", points: 90 },
  ];

  const meetingStats = {
    completed: 8,
    upcoming: 3,
    missed: 1,
  };

  // history will be populated from API
  // initial placeholder to keep types consistent
  const sampleHistory = history.length > 0 ? history : [];

  // Fetch upcoming interviews (take first) and interview history
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;

      try {
        const [upRes, historyRes, dashRes] = await Promise.all([
          getRequest(`${baseUrl}api/candidate/upcoming-interviews`, {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          }),
          getRequest(`${baseUrl}api/candidate/interviews-history`, {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          }),
          getRequest(`${baseUrl}api/candidate/dashboard`, {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          }),
        ]);

        // normalize upcoming response
        const up: any = upRes as any;
        let upcomingArr: any[] = [];
        if (up?.data && up.data.interviews) upcomingArr = up.data.interviews;
        else if (up?.interviews) upcomingArr = up.interviews;
        else if (Array.isArray(up)) upcomingArr = up;

        if (upcomingArr.length > 0) {
          const it = upcomingArr[0];
          const scheduled = it?.scheduled_at ? new Date(it.scheduled_at) : null;
          const startTime = scheduled
            ? scheduled.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";
          const date = scheduled ? scheduled.toISOString().split("T")[0] : "";
          const interviewer = it?.user;
          const companyName = it?.user?.first_name
            ? `${it.user.first_name} ${it.user.last_name ?? ""}`.trim()
            : (it?.user?.email ?? "Company");

          setUpcomingInterview({
            id: it.id,
            companyLogo: it?.companyLogo ?? "",
            companyName,
            interviewerName: interviewer
              ? `${interviewer.first_name ?? ""} ${interviewer.last_name ?? ""}`.trim()
              : "Interviewer",
            interviewerRole: interviewer?.role ?? "",
            interviewType: it?.type ?? "Technical",
            date,
            startTime,
            endTime: "",
            meetingLink: it?.session_link ?? it?.meetingLink ?? "",
            raw: it,
          });
        } else {
          setUpcomingInterview(null);
        }

        // normalize history response
        const hres: any = historyRes as any;
        let historyArr: any[] = [];
        if (hres?.data && hres.data.interviews)
          historyArr = hres.data.interviews;
        else if (hres?.interviews) historyArr = hres.interviews;
        else if (Array.isArray(hres)) historyArr = hres;

        const mappedHistory = historyArr.map((it: any) => {
          const feedback =
            (it?.feedbacks && it.feedbacks.length > 0 && it.feedbacks[0]) ||
            null;
          const scheduled = it?.scheduled_at ? new Date(it.scheduled_at) : null;
          return {
            id: it.id,
            companyLogo: it?.companyLogo ?? "",
            companyName: it?.user?.first_name
              ? `${it.user.first_name} ${it.user.last_name ?? ""}`.trim()
              : (it?.user?.email ?? "Company"),
            interviewerName: it?.user
              ? `${it.user.first_name ?? ""} ${it.user.last_name ?? ""}`.trim()
              : "Interviewer",
            date: scheduled
              ? scheduled.toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : (it?.created_at ?? ""),
            status: it?.status ?? (feedback ? "shortlisted" : "pending"),
            score: feedback?.score,
            positiveReview: feedback?.comments ?? "",
            negativeReview: "",
            rating: feedback?.rating,
          };
        });

        setHistory(mappedHistory);
        // normalize dashboard response
        const dres: any = dashRes as any;
        const ddata = dres?.data ?? dres;
        setDashboardData(ddata ?? null);
      } catch (err: any) {
        console.error("Error fetching candidate dashboard data", err);
        setError(err?.message ?? "Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Recalculate time remaining for upcoming interview
  useEffect(() => {
    const calculateTimeToInterview = () => {
      if (
        !upcomingInterview ||
        !upcomingInterview.date ||
        !upcomingInterview.startTime
      ) {
        setTimeToInterview("No upcoming interviews");
        return;
      }

      const timeMatch = upcomingInterview.startTime.match(
        /(\d{1,2}):(\d{2})\s*(AM|PM)?/i
      );
      if (!timeMatch) {
        setTimeToInterview("TBD");
        return;
      }

      let hour = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3];
      if (ampm) {
        const isPM = ampm.toUpperCase() === "PM";
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
      }

      const interviewDateTime = new Date(upcomingInterview.date);
      interviewDateTime.setHours(hour, minutes, 0, 0);

      const now = new Date();
      const diff = interviewDateTime.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) setTimeToInterview(`${days}d ${hrs}h`);
        else if (hrs > 0) setTimeToInterview(`${hrs}h ${mins}m`);
        else setTimeToInterview(`${mins}m`);
      } else {
        setTimeToInterview("In Progress");
      }
    };

    calculateTimeToInterview();
    const interval = setInterval(calculateTimeToInterview, 60000);
    return () => clearInterval(interval);
  }, [upcomingInterview]);

  const getInterviewTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      Technical: "💻",
      Behavioral: "💬",
      System: "🏗️",
      Cultural: "🤝",
      HR: "👥",
      Coding: "⌨️",
    };
    return <span className="text-2xl">{icons[type] || "📋"}</span>;
  };

  const getInterviewTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      Technical: "bg-blue-100 text-blue-700",
      Behavioral: "bg-purple-100 text-purple-700",
      System: "bg-green-100 text-green-700",
      Cultural: "bg-orange-100 text-orange-700",
      HR: "bg-cyan-100 text-cyan-700",
      Coding: "bg-pink-100 text-pink-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const isInterviewNear = () => {
    if (
      !upcomingInterview ||
      !upcomingInterview.startTime ||
      !upcomingInterview.date
    )
      return false;

    const timeMatch = upcomingInterview.startTime.match(
      /(\d{1,2}):(\d{2})\s*(AM|PM)?/i
    );
    if (!timeMatch) return false;

    let hour = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3];
    if (ampm) {
      const isPM = ampm.toUpperCase() === "PM";
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
    }

    const interviewDateTime = new Date(upcomingInterview.date);
    interviewDateTime.setHours(hour, minutes, 0, 0);

    const now = new Date();
    const diff = interviewDateTime.getTime() - now.getTime();
    return diff > 0 && diff <= 30 * 60 * 1000; // Within 30 minutes
  };

  const formattedDate = upcomingInterview?.date
    ? new Date(upcomingInterview.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    : "No upcoming interviews";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const totalInterviews =
    meetingStats.completed + meetingStats.upcoming + meetingStats.missed;

  const averageScore = Math.round(
    skillPerformance.reduce((acc, s) => acc + s.score, 0) /
      skillPerformance.length
  );

  const handleViewFeedback = (id: string) => {
    console.log("Parent notified: view feedback for interview", id);
  };

  const DateDisplay = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    } as const;

    const formattedDate = today.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, Darkdevil! Here's what's happening today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Today</p>
            <p className="font-semibold text-gray-900">{DateDisplay()}</p>
          </div>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={loading ? <Skeleton className="w-20 h-8" /> : dashboardData?.interviewsCount ?? totalInterviews}
          icon={Calendar}
          color="blue"
          subtitle={loading ? '' : `Completed: ${meetingStats.completed} • Upcoming: ${meetingStats.upcoming}`}
        />

        <StatCard
          title="Total Points"
          value={loading ? <Skeleton className="w-20 h-8" /> : dashboardData?.feedbackStats?.sumScore ?? performanceTrend.reduce((acc, cur) => acc + cur.points, 0)}
          icon={CheckCircle}
          color="green"
          subtitle={loading ? '' : 'Cumulative Interview Points'}
        />

        <StatCard
          title="Average Score"
          value={loading ? <Skeleton className="w-12 h-8" /> : Math.round(dashboardData?.feedbackStats?.averageScore ?? averageScore)}
          icon={Target}
          color="purple"
          subtitle={loading ? '' : 'Across core skills'}
        />

        <StatCard
          title="Shortlist Status"
          value={loading ? <Skeleton className="w-8 h-8" /> : dashboardData?.interviewsSortListedCount ?? 0}
          icon={Award}
          color="orange"
          subtitle={loading ? '' : 'Based on interviews'}
        />
      </div>

      {/* Upcoming Interview Card - Matching Dashboard Style */}
      <div className="bg-gray-100 rounded-2xl shadow-md border border-gray-300 mb-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
              {upcomingInterview?.companyLogo ? (
                <img
                  src={upcomingInterview.companyLogo}
                  alt={upcomingInterview.companyName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`https://i.pravatar.cc/200?u=${placeholderSeed}`}
                  alt={upcomingInterview?.companyName ?? 'Company placeholder'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Interview</p>
              <h2 className="text-lg font-bold text-gray-900">
                {upcomingInterview?.companyName ?? "No upcoming interviews"}
              </h2>
            </div>
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getInterviewTypeBadgeColor(
              upcomingInterview?.interviewType ?? "Technical"
            )}`}
          >
            {upcomingInterview?.interviewType ?? "—"}
          </span>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                  DATE
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                  TIME
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {upcomingInterview?.startTime ?? "—"}
                </p>
              </div>
            </div>

            {/* Interviewer */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                {getInitials(upcomingInterview?.interviewerName ?? "--")}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                  INTERVIEWER
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {upcomingInterview?.interviewerName ?? "—"}
                </p>
                <p className="text-xs text-gray-500">
                  {upcomingInterview?.interviewerRole ?? ""}
                </p>
              </div>
            </div>
          </div>

          {/* Time Remaining + Actions */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                TIME REMAINING
              </p>
              <p
                className={`text-xl font-bold ${isInterviewNear() ? "text-red-600" : "text-indigo-600"}`}
              >
                {timeToInterview}
              </p>
              {isInterviewNear() && (
                <span className="text-xs text-red-600 font-medium animate-pulse">
                  Starting Soon!
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={upcomingInterview?.meetingLink ?? "#"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all ${
                  isInterviewNear()
                    ? "bg-red-600 hover:bg-red-700 animate-pulse"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                <Video className="w-5 h-5" />
                <span>Join Interview</span>
              </a>

              <button
                className="px-5 py-3 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition-all flex items-center gap-2"
                onClick={() => {
                  alert("Open interview details (implement navigation)");
                }}
              >
                <span>Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Radar Chart */}
        <div className="bg-gray-100 rounded-xl shadow-md border border-gray-300 p-5">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Skill Performance
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={skillPerformance}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip formatter={(value: number) => `${value}%`} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-100 rounded-xl shadow-md border border-gray-300 p-5">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Performance Trend
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  labelFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                  formatter={(value: number) => [`${value} pts`, "Points"]}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Showing performance points over time
          </div>
        </div>
      </div>
      {loading ? (
        <div className="p-6 text-center text-gray-600">
          Loading interview data...
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">{error}</div>
      ) : (
        <InterviewMiniHistoryTable
          interviews={history}
          onViewFeedback={handleViewFeedback}
        />
      )}
    </div>
  );
};

export default CandidateDashboard;
