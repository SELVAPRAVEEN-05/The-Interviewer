"use client";
import { TrendingUp, Users } from "lucide-react";
import { InterviewHistoryTable } from "../components/interviewHistorytable";
import { useEffect, useState } from "react";

import { Slider } from "@nextui-org/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getRequest } from "@/utils";

export default function RecentInterviews() {
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [sampleHistory, setSampleHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";

  // Derive meeting stats from dashboard data
  const meetingStats = {
    completed: dashboardData?.interviewsCount ?? 0,
    upcoming: 0, // API doesn't provide this separately
    missed: 0, // API doesn't provide this
  };

  const pieData = [
    { name: "Completed", value: meetingStats.completed, color: "#10b981" },
    { name: "Upcoming", value: meetingStats.upcoming, color: "#3b82f6" },
    { name: "Missed", value: meetingStats.missed, color: "#ef4444" },
  ];

  // Derive skill performance from dashboard data
  const skillPerformance = dashboardData?.score
    ? dashboardData.score.map((s: any) => ({
      skill: s.skillName ?? "Unknown",
      score: s._sum?.value ?? 0,
      maxScore: 100,
      change: 0, // API doesn't provide change percentage
    }))
    : [
      { skill: "Algorithms", score: 85, maxScore: 100, change: +5 },
      { skill: "SQL", score: 78, maxScore: 100, change: +3 },
      { skill: "Problem Solving", score: 92, maxScore: 100, change: +8 },
      { skill: "Communication", score: 88, maxScore: 100, change: +2 },
    ];

  // Map server interview object to InterviewHistoryTable shape
  const mapInterviewHistory = (it: any) => {
    const interviewer = it?.user;
    const feedback = (it?.feedbacks && it.feedbacks.length > 0 && it.feedbacks[0]) || null;
    const scheduled = it?.scheduled_at ? new Date(it.scheduled_at) : null;

    // Extract company name from user.userPositions[0].brand.name
    const brandName = it?.user?.userPositions?.[0]?.brand?.name ?? null;
    const interviewerName = interviewer
      ? `${interviewer.first_name ?? ''} ${interviewer.last_name ?? ''}`.trim()
      : 'Interviewer';

    // Build profile URL
    const profileUrl = interviewer?.profile_url
      ? (interviewer.profile_url.startsWith('http')
        ? interviewer.profile_url
        : `${baseUrl}${interviewer.profile_url.replace(/\\/g, '/')}`)
      : null;

    return {
      id: it.id,
      companyLogo: profileUrl ?? it?.companyLogo ?? '',
      companyName: brandName || interviewerName || 'Company',
      interviewerName: interviewerName,
      date: scheduled
        ? scheduled.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
        : it?.created_at ?? '',
      status: it?.status?.toLowerCase() ?? (feedback ? 'completed' : 'pending'),
      score: feedback?.score,
      positiveReview: feedback?.positive_aspects ?? '',
      negativeReview: feedback?.negative_aspects ?? '',
      rating: feedback?.rating,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

        // Fetch both dashboard stats and interview history in parallel
        const [dashRes, historyRes] = await Promise.all([
          getRequest(`${baseUrl}api/candidate/dashboard`, {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          }),
          getRequest(`${baseUrl}api/candidate/interviews-history`, {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          })
        ]);

        // Process dashboard data
        const ddata = dashRes?.data ?? dashRes;
        setDashboardData(ddata ?? null);

        // Process interview history data
        const hres: any = historyRes as any;
        let interviewsData: any[] = [];
        if (hres?.data && Array.isArray(hres.data)) {
          interviewsData = hres.data;
        } else if (hres?.data && hres.data.interviews) {
          interviewsData = hres.data.interviews;
        } else if (hres?.interviews) {
          interviewsData = hres.interviews;
        } else if (Array.isArray(hres)) {
          interviewsData = hres;
        }

        if (interviewsData.length > 0) {
          setSampleHistory(interviewsData.map(mapInterviewHistory));
        }
      } catch (err: any) {
        console.error('Failed to fetch data', err);
        setError(err?.message ?? 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          {skillPerformance.map((item: any, idx: number) => (
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
