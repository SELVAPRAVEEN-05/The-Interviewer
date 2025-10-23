"use client";

import StatCard from "@/app/admin/components/statCard";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Filter,
  Search,
  Target,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { InterviewCard } from "../components/interviewCard";
import { getRequest } from "@/utils";

// Main Component
export default function InterviewDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(["Technical", "HR Round"]);
  const [selectedView, setSelectedView] = useState("grid");

  // state to hold interviews fetched from API
  const [apiInterviews, setApiInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiPagination, setApiPagination] = useState<any | null>(null);
  const [dashboardData, setDashboardData] = useState<any | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  // helper to map server interview object to InterviewCard shape
  const mapServerInterview = (it: any) => {
    // Extract company name from user.userPositions[0].brand.name
    const brandName = it?.user?.userPositions?.[0]?.brand?.name ?? null;
    const interviewer = it?.user;
    const interviewerName = interviewer
      ? `${interviewer.first_name ?? ''} ${interviewer.last_name ?? ''}`.trim()
      : 'Interviewer';

    // Build profile URL for interviewer
    const profileUrl = interviewer?.profile_url
      ? (interviewer.profile_url.startsWith('http')
        ? interviewer.profile_url
        : `${baseUrl}${interviewer.profile_url.replace(/\\/g, '/')}`)
      : null;

    const scheduled = it?.scheduled_at ? new Date(it.scheduled_at) : null;
    const date = scheduled
      ? scheduled.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
      : '';
    const startTime = scheduled
      ? scheduled.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      : '';

    return {
      id: it.id,
      companyLogo: profileUrl ?? it?.companyLogo ?? '',
      companyName: brandName || interviewerName || 'Unknown Company',
      interviewerName: interviewerName,
      interviewerRole: interviewer?.role ?? interviewer?.email ?? 'Recruiter',
      interviewType: it?.type ?? 'Technical',
      interviewName: it?.name ?? '',
      date,
      startTime,
      endTime: '',
      meetingLink: it?.session_link ?? it?.meetingLink ?? '',
      status: it?.status ?? 'SCHEDULED',
      raw: it,
    };
  };

  const fetchInterviews = async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await getRequest(
        `${baseUrl}api/candidate/upcoming-interviews`,
        {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        }
      );
      console.log("Fetched upcoming interviews:", res);

      // API returns { message, Failed, data: [...] }
      let interviewsData: any[] = [];
      let pagination: any = null;

      if (res?.data && Array.isArray(res.data)) {
        interviewsData = res.data;
      } else if (res?.data && res?.pagination) {
        interviewsData = res.data;
        pagination = res.pagination;
      } else if (res?.interviews) {
        interviewsData = res.interviews;
      } else if (res?.data?.interviews) {
        interviewsData = res.data.interviews;
      } else if (Array.isArray(res)) {
        interviewsData = res;
      }

      // Filter only SCHEDULED interviews for upcoming view
      const scheduledInterviews = interviewsData.filter((it: any) =>
        it.status === 'SCHEDULED'
      );

      setApiPagination(pagination);
      setApiInterviews(scheduledInterviews.map(mapServerInterview));
    } catch (err: any) {
      console.error('Error fetching upcoming interviews', err);
      setError(err?.message ?? 'Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch both interviews and dashboard stats
    const fetchData = async () => {
      await Promise.all([
        fetchInterviews(1, 50),
        fetchDashboardStats()
      ]);
    };
    fetchData();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const dashRes: any = await getRequest(
        `${baseUrl}api/candidate/dashboard`,
        {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        }
      );
      const ddata = dashRes?.data ?? dashRes;
      setDashboardData(ddata ?? null);
    } catch (err: any) {
      console.error('Error fetching dashboard stats', err);
    }
  };

  // combine apiInterviews with client filters
  const filteredInterviews = apiInterviews.filter((interview) => {
    const matchesSearch =
      interview.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.interviewerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.includes(interview.interviewType);
    return matchesSearch && matchesType;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Show 20 per page in table view

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInterviews = filteredInterviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-full">
      <div className="flex items-center mb-6 justify-between bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Upcoming Interviews
          </h1>
          <p className="text-gray-600">
            Prepare for your upcoming interviews with these resources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={dashboardData?.interviewsCount ?? 0}
          icon={Calendar}
          color="blue"
          subtitle={`Total scheduled interviews`}
        />
        <StatCard
          title="Total Points"
          value={dashboardData?.feedbackStats?.sumScore ?? 0}
          icon={CheckCircle}
          color="green"
          subtitle="Cumulative Interview Points"
        />
        <StatCard
          title="Average Score"
          value={Math.round(dashboardData?.feedbackStats?.averageScore ?? 0)}
          icon={Target}
          color="purple"
          subtitle="Across core skills"
        />
        <StatCard
          title="Shortlist Status"
          value={dashboardData?.interviewsSortListedCount ?? 0}
          icon={Award}
          color="orange"
          subtitle="Based on interviews"
        />
      </div>

      {/* Search, Filter, and Tabs in one line */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Input
            isClearable
            placeholder="Search by company or interviewer..."
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="w-80"
          />

          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button
                variant="bordered"
                startContent={<Filter className="w-4 h-4" />}
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="px-1 py-2 w-full">
                <p className="text-small font-bold text-foreground mb-2">
                  Interview Type
                </p>
                <CheckboxGroup
                  value={selectedTypes}
                  onValueChange={setSelectedTypes}
                >
                  <Checkbox value="Technical">Technical</Checkbox>
                  <Checkbox value="HR Round">HR Round</Checkbox>
                  <Checkbox value="Managerial">Managerial</Checkbox>
                  <Checkbox value="Behavioral">Behavioral</Checkbox>
                </CheckboxGroup>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tabs
          variant="bordered"
          color="primary"
          selectedKey={selectedView}
          onSelectionChange={(key) =>
            setSelectedView(key ? String(key) : "grid")
          }
        >
          <Tab key="grid" title="Grid View" />
          <Tab key="table" title="Table View" />
        </Tabs>
      </div>

      {/* Content Area */}
      {selectedView === "grid" ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 bg-gray-50 p-6 border-gray-200 shadow-lg rounded-lg">
          {loading ? (
            <div className="col-span-3 text-center py-12 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="col-span-3 text-center py-12 text-red-500">{error}</div>
          ) : filteredInterviews.length > 0 ? (
            filteredInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No interviews found matching your criteria
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 border-gray-200 shadow-lg rounded-lg">
          <div className="bg-transparent overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gray-200 border border-gray-300 text-gray-700 font-semibold text-sm py-2 rounded-lg">
              <div className="p-3">COMPANY</div>
              <div className="p-3">INTERVIEWER</div>
              <div className="p-3">TYPE</div>
              <div className="p-3">DATE & TIME</div>
              <div className="p-3">ACTIONS</div>
            </div>

            {/* Table Body */}
            {paginatedInterviews.length > 0 ? (
              paginatedInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="grid grid-cols-5 border my-2 border-gray-200 bg-gray-100 hover:bg-gray-50 items-center rounded-lg"
                >
                  {/* Company */}
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {interview.companyLogo ? (
                        <img
                          src={interview.companyLogo}
                          alt={interview.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <span className="font-semibold">
                      {interview.companyName}
                    </span>
                  </div>

                  {/* Interviewer */}
                  <div className="p-3">
                    <div className="font-medium">
                      {interview.interviewerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {interview.interviewerRole}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="p-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {interview.interviewType}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="p-3 text-sm">
                    <div>{interview.date}</div>
                    <div className="text-gray-500">
                      {interview.startTime} - {interview.endTime}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 p-3">
                    <Button size="sm" variant="bordered" color="danger">
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      color="primary"
                      startContent={<Video className="w-4 h-4" />}
                      onPress={() =>
                        interview.meetingLink &&
                        window.open(interview.meetingLink, "_self")
                      }
                    >
                      Join
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500 col-span-5">
                No interviews found matching your criteria
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages >= 1 && (
            <div className="flex justify-between items-center mt-6 px-2">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 border rounded-md text-sm text-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 border rounded-md text-sm ${currentPage === idx + 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 border rounded-md text-sm text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
