"use client";
import { TrendingUp, Users } from "lucide-react";
import { InterviewHistoryTable } from "../components/interviewHistorytable";
import { useEffect, useState } from "react";

import { Slider } from "@nextui-org/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getRequest } from "@/utils";

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

  const [sampleHistory, setSampleHistory] = useState<any[]>([
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
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/";

  // Map server interview object to InterviewHistoryTable shape
  const mapInterviewHistory = (it: any) => {
    const interviewer = it?.user;
    const feedback = (it?.feedbacks && it.feedbacks.length > 0 && it.feedbacks[0]) || null;
    const status = it?.status ?? (feedback ? 'shortlisted' : 'pending');
    const scheduled = it?.scheduled_at ? new Date(it.scheduled_at) : null;

    return {
      id: it.id,
      companyLogo: it?.companyLogo ?? '',
      companyName: it?.user?.first_name
        ? `${it.user.first_name} ${it.user.last_name ?? ''}`.trim()
        : it?.user?.email ?? 'Company',
      interviewerName: interviewer ? `${interviewer.first_name ?? ''} ${interviewer.last_name ?? ''}`.trim() : 'Interviewer',
      date: scheduled
        ? scheduled.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
        : it?.created_at ?? '',
      status: status,
      score: feedback?.score,
      positiveReview: feedback?.comments ?? feedback?.positiveReview ?? '',
      negativeReview: '',
      rating: feedback?.rating,
    };
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const res: any = await getRequest(`${baseUrl}api/candidate/interviews-history`, {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        });

        // candidate controller returns { message, Failed, data }
        let interviewsData: any[] = [];
        if (res?.data && res.data.interviews) {
          interviewsData = res.data.interviews;
        } else if (res?.interviews) {
          interviewsData = res.interviews;
        } else if (Array.isArray(res)) {
          interviewsData = res;
        }

        if (interviewsData.length > 0) {
          setSampleHistory(interviewsData.map(mapInterviewHistory));
        }
      } catch (err: any) {
        console.error('Failed to fetch interview history', err);
        setError(err?.message ?? 'Failed to load interview history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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
      {loading ? (
        <div className="p-6 text-center text-gray-600">Loading interview history...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">{error}</div>
      ) : (
        <InterviewHistoryTable
          interviews={sampleHistory}
          onViewFeedback={handleViewFeedback}
        />
      )}
    </div>
  );
}
