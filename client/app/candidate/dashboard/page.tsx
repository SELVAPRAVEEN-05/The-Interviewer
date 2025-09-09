"use client";

import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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

import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Target,
  TrendingUp,
  User,
  Users,
  Video,
} from "lucide-react";

/**
 * CandidateDashboard
 *
 * Layout:
 * 1) Top row: 4 status cards
 * 2) Middle: Upcoming Interview (full width)
 * 3) Bottom row: 3 charts side-by-side (Radar, Line, Pie)
 *
 * Replace mock data with your API data as needed.
 */

const CandidateDashboard: React.FC = () => {
  const [timeToInterview, setTimeToInterview] = useState<string>("");

  // ----------------------------
  // Mock data (replace with API calls)
  // ----------------------------
  const upcomingInterview = {
    id: "1",
    date: "2025-09-12",
    time: "14:30",
    interviewer: {
      name: "Sarah Johnson",
      role: "Senior Technical Lead",
    },
    type: "Technical",
    status: "upcoming",
    meetingLink: "https://meet.example.com/abcd",
  };

  const skillPerformance = [
    { skill: "Algorithms", score: 85, maxScore: 100 },
    { skill: "SQL", score: 78, maxScore: 100 },
    { skill: "Problem Solving", score: 92, maxScore: 100 },
    { skill: "Communication", score: 88, maxScore: 100 },
    { skill: "System Design", score: 75, maxScore: 100 },
  ];

  const performanceTrend = [
    { round: "Round 1", score: 65, date: "2025-08-15" },
    { round: "Round 2", score: 72, date: "2025-08-22" },
    { round: "Round 3", score: 78, date: "2025-08-29" },
    { round: "Round 4", score: 85, date: "2025-09-05" },
  ];

  const meetingStats = {
    completed: 8,
    upcoming: 3,
    missed: 1,
  };

  const pieData = [
    { name: "Completed", value: meetingStats.completed, color: "#10b981" },
    { name: "Upcoming", value: meetingStats.upcoming, color: "#3b82f6" },
    { name: "Missed", value: meetingStats.missed, color: "#ef4444" },
  ];

  // ----------------------------
  // Countdown timer effect
  // ----------------------------
  useEffect(() => {
    const calculateTimeToInterview = () => {
      // Use explicit timezone correctness if required; here we parse local ISO-ish string.
      const interviewDateTime = new Date(
        `${upcomingInterview.date}T${upcomingInterview.time}`
      );
      const now = new Date();
      const diff = interviewDateTime.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeToInterview(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeToInterview(`${hours}h ${minutes}m`);
        } else {
          setTimeToInterview(`${minutes}m`);
        }
      } else {
        setTimeToInterview("Interview time passed");
      }
    };

    calculateTimeToInterview();
    const interval = setInterval(calculateTimeToInterview, 60000);

    return () => clearInterval(interval);
  }, [upcomingInterview.date, upcomingInterview.time]);

  // ----------------------------
  // helpers
  // ----------------------------
  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "HR":
        return <User className="w-6 h-6 text-blue-500" />;
      case "Technical":
        return <Code className="w-6 h-6 text-green-500" />;
      case "Coding":
        return <BarChart3 className="w-6 h-6 text-purple-500" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-500" />;
    }
  };

  const getInterviewTypeBadgeColor = (type: string) => {
    switch (type) {
      case "HR":
        return "bg-blue-100 text-blue-800";
      case "Technical":
        return "bg-green-100 text-green-800";
      case "Coding":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isInterviewNear = () => {
    const interviewDateTime = new Date(
      `${upcomingInterview.date}T${upcomingInterview.time}`
    );
    const now = new Date();
    const diff = interviewDateTime.getTime() - now.getTime();
    return diff > 0 && diff <= 2 * 60 * 60 * 1000; // Within 2 hours
  };

  const totalInterviews =
    meetingStats.completed + meetingStats.upcoming + meetingStats.missed;

  type ShortlistStatus = any;
  const shortlistStatus: ShortlistStatus = "pending";

  // compute average score
  const averageScore = Math.round(
    skillPerformance.reduce((acc, s) => acc + s.score, 0) / skillPerformance.length
  );

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h1>
          <p className="text-gray-600">Overview of your interviews & coding performance</p>
        </div>

        {/* -------------------------
            1) TOP ROW - STATUS CARDS
           ------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Interviews */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Interviews</p>
                <p className="text-2xl font-semibold text-gray-900">{totalInterviews}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">Completed: {meetingStats.completed} • Upcoming: {meetingStats.upcoming}</div>
          </div>

          {/* Tests Completed */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Tests Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{performanceTrend.length}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">Latest test: {performanceTrend[performanceTrend.length - 1].round}</div>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-semibold text-gray-900">{averageScore}%</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">Across core skills</div>
          </div>

          {/* Shortlist Status */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Shortlist Status</p>
                <div className="mt-1">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      shortlistStatus === "shortlisted"
                        ? "bg-green-100 text-green-800"
                        : shortlistStatus === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {shortlistStatus.charAt(0).toUpperCase() + shortlistStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">Decision pending from recruiter</div>
          </div>
        </div>

        {/* -------------------------
            2) MIDDLE - UPCOMING INTERVIEW (FULL WIDTH)
           ------------------------- */}
        <div className="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-xl shadow-lg border border-indigo-200 mb-8 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  {getInterviewTypeIcon(upcomingInterview.type)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Next Interview</h2>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        {new Date(`${upcomingInterview.date}T${upcomingInterview.time}`).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {upcomingInterview.interviewer.name} • {upcomingInterview.interviewer.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Time Remaining</p>
                  <p className={`text-2xl font-bold ${isInterviewNear() ? "text-red-600" : "text-indigo-700"}`}>
                    {timeToInterview}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getInterviewTypeBadgeColor(upcomingInterview.type)}`}>
                    {upcomingInterview.type} Interview
                  </span>

                  <div className="flex items-center gap-3">
                    <a
                      href={upcomingInterview.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow transition-transform transform ${
                        isInterviewNear()
                          ? "bg-red-600 hover:bg-red-700 animate-pulse"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Interview</span>
                    </a>

                    <button
                      className="px-4 py-2 border rounded-lg text-sm bg-white hover:shadow-sm"
                      onClick={() => {
                        // placeholder: open details modal or navigate to meeting page
                        alert("Open interview details (implement navigation)");
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------
            3) BOTTOM ROW - 3 CHARTS IN A SINGLE ROW
           ------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar - Skill Performance */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Skill Performance</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillPerformance}>
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

          {/* Line - Performance Trend */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Performance Trend</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-sm text-gray-500">Trend over the last {performanceTrend.length} rounds</div>
          </div>

          {/* Pie - Meetings Overview */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Meetings Overview</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={38} outerRadius={78} dataKey="value" paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* legend */}
            <div className="mt-4 space-y-2">
              {pieData.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                  <div className="font-semibold text-gray-900">{entry.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* end container */}
      </div>
    </div>
  );
};

export default CandidateDashboard;
