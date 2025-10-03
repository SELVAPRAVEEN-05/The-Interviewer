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
  Clock,
  Code,
  Target,
  TrendingUp,
  User,
  Video,
} from "lucide-react";

const CandidateDashboard = () => {
  const [timeToInterview, setTimeToInterview] = useState<string>("");

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

  useEffect(() => {
    const calculateTimeToInterview = () => {
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

  const averageScore = Math.round(
    skillPerformance.reduce((acc, s) => acc + s.score, 0) /
      skillPerformance.length
  );

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

      <div className="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-xl shadow-lg border border-indigo-200 mb-8 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                {getInterviewTypeIcon(upcomingInterview.type)}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Next Interview
                </h2>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium">
                      {new Date(
                        `${upcomingInterview.date}T${upcomingInterview.time}`
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {upcomingInterview.interviewer.name} •{" "}
                      {upcomingInterview.interviewer.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Time Remaining</p>
                <p
                  className={`text-2xl font-bold ${isInterviewNear() ? "text-red-600" : "text-indigo-700"}`}
                >
                  {timeToInterview}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getInterviewTypeBadgeColor(upcomingInterview.type)}`}
                >
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

      {/* Performance Trend (Date wise points) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* 🔄 Line Chart: Performance Trend (Date wise) */}
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
    </div>
  );
};

export default CandidateDashboard;
