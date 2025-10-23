"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import {
  Calendar,
  CalendarDays,
  CheckCircle,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { getRequest } from "@/utils";
import { URL } from "@/utils/axios/endPoint";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import StatCard from "../components/statCard";
import { upcomingInterviews } from "../utils";
import { QuickActionButton } from "@/components/quickCard/quickActionButton";

const AdminDashboard = () => {
  // fallback stats (used while API loads)
  const [stats] = useState({
    totalCandidates: 245,
    approvedCandidates: 189,
    pendingCandidates: 56,
    totalInterviewers: 34,
    approvedInterviewers: 28,
    pendingInterviewers: 6,
    interviewsScheduled: 42,
    completedInterviews: 156,
    pendingApprovals: 62,
  });

  // raw API payload (kept for any direct usage)
  const [data, setData] = useState<any>(null);

  // UI-friendly structures derived from API
  const [cards, setCards] = useState<any[]>([]);
  const [graphItems, setGraphItems] = useState<any[]>([]);
  const [quickActions, setQuickActions] = useState<any[]>([]);

  // default graph items until API returns
  const [interviewData] = useState([
    { name: "Completed", value: 156, color: "#22c55e" },
    { name: "Scheduled", value: 42, color: "#3b82f6" },
    { name: "Cancelled", value: 18, color: "#ef4444" },
  ]);

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
  // Pagination + Search state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [table, tableData] = useState<any>(null);

  // ✅ filter AFTER searchQuery is defined
  const filteredInterviews = upcomingInterviews.filter(
    (interview) =>
      interview.candidateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interview.interviewerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const token = localStorage.getItem("authToken");
  const InitialCall = async () => {
    try {
      const response = await getRequest(URL?.ADMIN_DASHBOARD, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      // Normalize response shape: server may return { data: { ... }, isFailed } or directly the data
      const normalized = response?.data ?? response;
      if (normalized?.Failed) {
        // keep existing data or show fallback
        setData(null);
      } else {
        // data might be wrapped: { data: {...} }
        const payload = normalized?.data ?? normalized;
        setData(payload);

        // Build cards for StatCard components
        const derivedCards = [
          {
            title: "Total Candidates",
            value: payload?.totalCandidateUsers ?? payload?.totalCandidates ?? stats.totalCandidates,
            icon: Users,
            color: "blue",
            subtitle: `${payload?.totalPendingCandidates ?? stats.pendingCandidates} pending approval`,
          },
          {
            title: "Total Interviewers",
            value: payload?.totalRecruiterUsers ?? payload?.totalInterviewers ?? stats.totalInterviewers,
            icon: UserCheck,
            color: "green",
            subtitle: `${payload?.totalPendingRecruiters ?? stats.pendingInterviewers} pending approval`,
          },
          {
            title: "Interviews Scheduled",
            value: payload?.totalScheduledInterviews ?? stats.interviewsScheduled,
            icon: Calendar,
            color: "purple",
          },
          {
            title: "Completed Interviews",
            value: payload?.totalCompletedInterviews ?? stats.completedInterviews,
            icon: CheckCircle,
            color: "orange",
          },
        ];
        setCards(derivedCards);

        // Build graph items
        const derivedGraph = [
          {
            name: "Completed",
            value: payload?.totalCompletedInterviews ?? payload?.interview?.totalCompletedInterviews ?? 156,
            color: "#22c55e",
          },
          {
            name: "Scheduled",
            value: payload?.totalScheduledInterviews ?? payload?.interview?.totalScheduledInterviews ?? 42,
            color: "#3b82f6",
          },
          {
            name: "Cancelled",
            value: payload?.totalCancelledInterviews ?? payload?.interview?.totalCancelledInterviews ?? 18,
            color: "#ef4444",
          },
        ];
        setGraphItems(derivedGraph);

        // Quick actions
        const derivedQuick = [
          {
            title: "Approve Candidates",
            description: `${payload?.totalPendingCandidates ?? stats.pendingCandidates} pending approval`,
            icon: Users,
            color: "blue",
            href: "/admin/manageCandidates",
          },
          {
            title: "Approve Interviewers",
            description: `${payload?.totalPendingRecruiters ?? stats.pendingInterviewers} pending approval`,
            icon: UserCheck,
            color: "green",
            href: "/admin/manageInterviewers",
          },
          {
            title: "Schedule Interview",
            description: "Create new interview session",
            icon: Calendar,
            color: "orange",
            href: "/admin/createInterview",
          },
        ];
        setQuickActions(derivedQuick);
      }
    } catch (error) {
      throw error;
    }

    try {
      const res = await getRequest(
        `${baseUrl}api/admin/upcoming-interviews?page=${page + 1}&limit=${rowsPerPage}`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      tableData(res);
    } catch (error) {
      throw error;
    }
  };

  console.log(table);

  useEffect(() => {
    InitialCall();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg">
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

      {data && (
        <div className="py-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {(cards && cards.length > 0 ? cards : [
              {
                title: "Total Candidates",
                value: data?.totalCandidateUsers ?? stats.totalCandidates,
                icon: Users,
                color: "blue",
                subtitle: `${stats.approvedCandidates} approved, ${stats.pendingCandidates} pending`,
              },
              {
                title: "Total Interviewers",
                value: data?.totalRecruiterUsers ?? stats.totalInterviewers,
                icon: UserCheck,
                color: "green",
                subtitle: `${stats.approvedInterviewers} approved, ${stats.pendingInterviewers} pending`,
              },
              {
                title: "Interviews Scheduled",
                value: data?.totalScheduledInterviews ?? stats.interviewsScheduled,
                icon: Calendar,
                color: "purple",
              },
              {
                title: "Completed Interviews",
                value: data?.totalCompletedInterviews ?? stats.completedInterviews,
                icon: CheckCircle,
                color: "orange",
              },
            ]).map((c: any, idx: number) => (
              <StatCard
                key={idx}
                title={c.title}
                value={c.value}
                icon={c.icon}
                color={c.color}
                subtitle={c.subtitle}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Interview Analytics */}
            <div className="lg:col-span-2 bg-gray-100 rounded-xl shadow-sm border border-gray-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Interview Analytics
                </h2>
              </div>
              <div className="flex justify-center items-center h-64">
                <PieChart
                  series={[
                    {
                      data: (graphItems && graphItems.length > 0
                        ? graphItems
                        : interviewData
                      ).map((item: any, index: number) => ({
                        id: index,
                        value: item.value,
                        label: item.name,
                        color: item.color,
                      })),
                    },
                  ]}
                  width={400}
                  height={250}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                {(quickActions && quickActions.length > 0
                  ? quickActions
                  : [
                      {
                        title: "Approve Candidates",
                        description: `${stats.pendingCandidates} pending approval`,
                        icon: Users,
                        color: "blue",
                        href: "/admin/manageCandidates",
                      },
                      {
                        title: "Approve Interviewers",
                        description: `${stats.pendingInterviewers} pending approval`,
                        icon: UserCheck,
                        color: "green",
                        href: "/admin/manageInterviewers",
                      },
                      {
                        title: "Schedule Interview",
                        description: "Create new interview session",
                        icon: Calendar,
                        color: "orange",
                        href: "/admin/createInterview",
                      },
                    ]).map((q: any, i: number) => (
                  <QuickActionButton
                    key={i}
                    title={q.title}
                    description={q.description}
                    icon={q.icon}
                    color={q.color}
                    onClick={() => (window.location.href = q.href ?? "/admin")}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Interviews with MUI Table */}
          <div className="lg:col-span-2 bg-gray-100 rounded-xl shadow-sm border border-gray-300 p-6">
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  Upcoming Interviews
                </h2>
                <CalendarDays className="w-5 h-5 text-gray-400 mt-1" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border w-[20rem] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table
                className="bg-gray-100 border-none shadow-none"
                sx={{ minWidth: 650 }}
                aria-label="upcoming interviews table"
              >
                <TableHead className="bg-gray-200 border-b-1 border-gray-300">
                  <TableRow>
                    <TableCell>
                      <b>S.No</b>
                    </TableCell>
                    <TableCell>
                      <b>Candidate</b>
                    </TableCell>
                    <TableCell>
                      <b>Interviewer</b>
                    </TableCell>
                    <TableCell>
                      <b>Date</b>
                    </TableCell>
                    <TableCell>
                      <b>Time</b>
                    </TableCell>
                    <TableCell>
                      <b>Status</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {table && table?.data?.length > 0 && (
                  <TableBody>
                    {table.data.map((interview: any, index: any) => (
                      <TableRow key={interview.id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>
                          {(
                            interview.participants[0].user.first_name +
                            " " +
                            interview.participants[0].user.last_name
                          ).toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {(
                            interview?.user?.first_name +
                            " " +
                            interview?.user?.last_name
                          ).toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {interview?.scheduled_at?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {
                            interview?.scheduled_at
                              ?.split("T")[1]
                              ?.split(".")[0]
                          }
                        </TableCell>

                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              interview.status === "SCHEDULED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {interview.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={6}
                      count={table?.pagination?.totalItems}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      slotProps={{
                        select: {
                          inputProps: { "aria-label": "rows per page" },
                          native: true,
                        },
                      }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
