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

const CandidateDashboard = () => {
  const [timeToInterview, setTimeToInterview] = useState<string>("");

  const upcomingInterview = {
    id: "1",
    companyLogo:
      "https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80",
    companyName: "TechCorp Solutions",
    interviewerName: "Rajesh Kumar",
    interviewerRole: "Senior Technical Lead",
    interviewType: "Technical",
    date: "2025-09-29",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    meetingLink: "https://the-codemeet.vercel.app/rooms/33",
  };

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

  const sampleHistory = [
    {
      id: "1",
      companyName: "TechCorp Solutions",
      interviewerName: "Rajesh Kumar",
      date: "25 Sep 2025",
      status: "shortlisted",
      score: 85,
      positiveReview: "You explained algorithms very clearly.",
      negativeReview: "Improve time management during coding tasks.",
      rating: 4,
    },
    {
      id: "2",
      companyName: "InnovateLabs",
      interviewerName: "Priya Sharma",
      date: "22 Sep 2025",
      status: "pending",
      score: undefined,
      positiveReview: "Strong fundamentals in system design.",
      negativeReview: "Need to practice more live coding problems.",
      rating: 3,
    },
  ];

  useEffect(() => {
    const calculateTimeToInterview = () => {
      // Parse date and start time
      const [hours, minutes] =
        upcomingInterview.startTime.match(/(\d+):(\d+)/)?.slice(1) || [];
      const isPM = upcomingInterview.startTime.includes("PM");
      let hour = parseInt(hours);
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      const interviewDateTime = new Date(upcomingInterview.date);
      interviewDateTime.setHours(hour, parseInt(minutes), 0, 0);

      const now = new Date();
      const diff = interviewDateTime.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeToInterview(`${days}d ${hrs}h`);
        } else if (hrs > 0) {
          setTimeToInterview(`${hrs}h ${mins}m`);
        } else {
          setTimeToInterview(`${mins}m`);
        }
      } else {
        setTimeToInterview("In Progress");
      }
    };

    calculateTimeToInterview();
    const interval = setInterval(calculateTimeToInterview, 60000);

    return () => clearInterval(interval);
  }, [upcomingInterview.date, upcomingInterview.startTime]);

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
    const [hours, minutes] =
      upcomingInterview.startTime.match(/(\d+):(\d+)/)?.slice(1) || [];
    const isPM = upcomingInterview.startTime.includes("PM");
    let hour = parseInt(hours);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    const interviewDateTime = new Date(upcomingInterview.date);
    interviewDateTime.setHours(hour, parseInt(minutes), 0, 0);

    const now = new Date();
    const diff = interviewDateTime.getTime() - now.getTime();
    return diff > 0 && diff <= 30 * 60 * 1000; // Within 30 minutes
  };

  const formattedDate = new Date(upcomingInterview.date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
    }
  );

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
            <p className="font-semibold text-gray-900">
              Sunday, August 24, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={totalInterviews}
          icon={Calendar}
          color="blue"
          subtitle={`Completed: ${meetingStats.completed} • Upcoming: ${meetingStats.upcoming}`}
        />

        <StatCard
          title="Total Points"
          value={performanceTrend.reduce((acc, cur) => acc + cur.points, 0)}
          icon={CheckCircle}
          color="green"
          subtitle="Cumulative Interview Points"
        />

        <StatCard
          title="Average Score"
          value={averageScore}
          icon={Target}
          color="purple"
          subtitle="Across core skills"
        />

        <StatCard
          title="Shortlist Status"
          value={5}
          icon={Award}
          color="orange"
          subtitle="Based on interviews"
        />
      </div>

      {/* Upcoming Interview Card - Matching Dashboard Style */}
      <div className="bg-gray-100 rounded-2xl shadow-md border border-gray-300 mb-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
              <img
                src={upcomingInterview.companyLogo}
                alt={upcomingInterview.companyName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Interview</p>
              <h2 className="text-lg font-bold text-gray-900">
                {upcomingInterview.companyName}
              </h2>
            </div>
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getInterviewTypeBadgeColor(upcomingInterview.interviewType)}`}
          >
            {upcomingInterview.interviewType}
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
                  {upcomingInterview.startTime}
                </p>
              </div>
            </div>

            {/* Interviewer */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                {getInitials(upcomingInterview.interviewerName)}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                  INTERVIEWER
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {upcomingInterview.interviewerName}
                </p>
                <p className="text-xs text-gray-500">
                  {upcomingInterview.interviewerRole}
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
                href={upcomingInterview.meetingLink}
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
      <InterviewMiniHistoryTable
        interviews={sampleHistory}
        onViewFeedback={handleViewFeedback}
      />
    </div>
  );
};

export default CandidateDashboard;
