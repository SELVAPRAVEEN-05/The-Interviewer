"use client";
import { TrendingUp, Users } from "lucide-react";
import { InterviewHistoryTable } from "../components/interviewHistorytable";

import { Slider } from "@nextui-org/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function RecentInterviews() {
  const meetingStats = {
    completed: 38,
    upcoming: 13,
    missed: 5,
  };

  const pieData = [
    { name: "Completed", value: meetingStats.completed, color: "#10b981" },
    { name: "Upcoming", value: meetingStats.upcoming, color: "#3b82f6" },
    { name: "Missed", value: meetingStats.missed, color: "#ef4444" },
  ];

  const skillPerformance = [
    { skill: "Algorithms", score: 85, maxScore: 100, change: +5 },
    { skill: "SQL", score: 78, maxScore: 100, change: +3 },
    { skill: "Problem Solving", score: 92, maxScore: 100, change: +8 },
    { skill: "Communication", score: 88, maxScore: 100, change: +2 },
  ];

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
    {
      id: "3",
      companyName: "DataSystems Inc",
      interviewerName: "Amit Patel",
      date: "18 Sep 2025",
      status: "rejected",
      score: 45,
      positiveReview: "Good communication skills.",
      negativeReview: "Answers lacked depth and detail.",
      rating: 2,
    },
    {
      id: "4",
      companyName: "CloudNet Global",
      interviewerName: "Neha Verma",
      date: "15 Sep 2025",
      status: "shortlisted",
      score: 90,
      positiveReview: "Excellent problem-solving and clarity of thought.",
      negativeReview: "Work on optimizing SQL queries further.",
      rating: 5,
    },
    {
      id: "5",
      companyName: "AIWorks Pvt Ltd",
      interviewerName: "Sandeep Rao",
      date: "10 Sep 2025",
      status: "rejected",
      score: 50,
      positiveReview: "Basic concepts were clear.",
      negativeReview: "Struggled with advanced AI/ML questions.",
      rating: 2,
    },
  ];

  const handleViewFeedback = (id: string) => {
    console.log("Parent notified: view feedback for interview", id);
  };

  return (
    <div className="min-h-full">
      <div className="flex items-center mb-6 justify-between bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Interview History
          </h1>
          <p className="text-gray-600">
            Review your past interviews and feedback to improve your skills.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 rounded-xl shadow-md border border-gray-300 p-5 grid grid-cols-2 gap-4 ">
          <div className="h-72">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Meetings Overview
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="40%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                  paddingAngle={5}
                  width={200}
                  height={200}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2 flex flex-col justify-center">
            {pieData.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
                <div className="font-semibold text-gray-900">{entry.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl shadow-md border border-gray-300 p-5 grid grid-cols-1 gap-4">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Skill Performance
            </h3>
          </div>
          {skillPerformance.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {/* Skill Name */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{item.skill}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-semibold">
                    {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                  </span>
                  <span className="font-bold text-gray-900">{item.score}%</span>
                </div>
              </div>

              {/* Read-only Progress Bar */}
              <Slider
                aria-label={item.skill}
                value={item.score}
                maxValue={item.maxScore}
                hideThumb
                isDisabled
                classNames={{
                  track: "h-2 rounded-full",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <InterviewHistoryTable
        interviews={sampleHistory}
        onViewFeedback={handleViewFeedback}
      />
    </div>
  );
}
