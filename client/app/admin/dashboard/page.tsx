"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import {
  Calendar,
  CalendarDays,
  CheckCircle,
  Search,
  UserCheck,
  Users
} from "lucide-react";
import React, { useState } from "react";

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
import { QuickActionButton } from "../components/quickActionButton";

const AdminDashboard = () => {
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

  const [interviewData] = useState([
    { name: "Completed", value: 156, color: "#22c55e" },
    { name: "Scheduled", value: 42, color: "#3b82f6" },
    { name: "Cancelled", value: 18, color: "#ef4444" },
  ]);

  // Pagination + Search state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState("");

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
            <p className="font-semibold text-gray-900">
              Sunday, August 24, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Candidates"
            value={stats.totalCandidates}
            icon={Users}
            color="blue"
            subtitle={`${stats.approvedCandidates} approved, ${stats.pendingCandidates} pending`}
          />
          <StatCard
            title="Total Interviewers"
            value={stats.totalInterviewers}
            icon={UserCheck}
            color="green"
            subtitle={`${stats.approvedInterviewers} approved, ${stats.pendingInterviewers} pending`}
          />
          <StatCard
            title="Interviews Scheduled"
            value={stats.interviewsScheduled}
            icon={Calendar}
            color="purple"
          />
          <StatCard
            title="Completed Interviews"
            value={stats.completedInterviews}
            icon={CheckCircle}
            color="orange"
          />
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
                    data: interviewData.map((item, index) => ({
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
              <QuickActionButton
                title="Approve Candidates"
                description={`${stats.pendingCandidates} pending approval`}
                icon={Users}
                color="blue"
                onClick={() => (window.location.href = "/admin/manageCandidates")}
              />
              <QuickActionButton
                title="Approve Interviewers"
                description={`${stats.pendingInterviewers} pending approval`}
                icon={UserCheck}
                color="green"
                onClick={() => (window.location.href = "/admin/manageInterviewers")}
              />
              <QuickActionButton
                title="Schedule Interview"
                description="Create new interview session"
                icon={Calendar}
                color="orange"
                onClick={() => (window.location.href = "/admim")}
              />
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
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredInterviews.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredInterviews
                ).map((interview, index) => (
                  <TableRow key={interview.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{interview.candidateName}</TableCell>
                    <TableCell>{interview.interviewerName}</TableCell>
                    <TableCell>
                      {new Date(interview.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{interview.time}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          interview.status === "Scheduled"
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
                    count={filteredInterviews.length}
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
    </div>
  );
};

export default AdminDashboard;
