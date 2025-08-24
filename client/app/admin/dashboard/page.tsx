"use client";

import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  CheckCircle,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import StatCard from "../components/statCard";

// ---------------- Pagination Actions ----------------
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: "2.5rem" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

// ---------------- Admin Dashboard ----------------
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

  const [upcomingInterviews] = useState([
    {
      id: 1,
      candidateName: "Sarah Johnson",
      interviewerName: "John Smith",
      date: "2025-08-25",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      interviewerName: "Emily Davis",
      date: "2025-08-25",
      time: "2:30 PM",
      status: "Scheduled",
    },
    {
      id: 3,
      candidateName: "Alex Rodriguez",
      interviewerName: "David Wilson",
      date: "2025-08-26",
      time: "11:00 AM",
      status: "Pending",
    },
    {
      id: 4,
      candidateName: "Lisa Thompson",
      interviewerName: "Jennifer Brown",
      date: "2025-08-26",
      time: "3:00 PM",
      status: "Scheduled",
    },
    {
      id: 5,
      candidateName: "Robert Garcia",
      interviewerName: "Mark Johnson",
      date: "2025-08-27",
      time: "9:30 AM",
      status: "Scheduled",
    },
    {
      id: 6,
      candidateName: "Lisa Thompson",
      interviewerName: "Jennifer Brown",
      date: "2025-08-26",
      time: "3:00 PM",
      status: "Scheduled",
    },
    {
      id: 7,
      candidateName: "Robert Garcia",
      interviewerName: "Mark Johnson",
      date: "2025-08-27",
      time: "9:30 AM",
      status: "Scheduled",
    },
  ]);

  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  
  // ---------------- Quick Action Button ----------------
  type QuickActionButtonProps = {
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
    color: string;
  };

  const QuickActionButton = ({
    title,
    description,
    icon: Icon,
    onClick,
    color,
  }: QuickActionButtonProps) => (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-blue-200 text-left group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-lg ${color.replace("text", "bg").replace("-600", "-100")}`}
          >
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </button>
  );

  // ---------------- Return ----------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg px-6 py-4 rounded-lg">
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
            color="text-blue-600"
            subtitle={`${stats.approvedCandidates} approved, ${stats.pendingCandidates} pending`}
          />
          <StatCard
            title="Total Interviewers"
            value={stats.totalInterviewers}
            icon={UserCheck}
            color="text-green-600"
            subtitle={`${stats.approvedInterviewers} approved, ${stats.pendingInterviewers} pending`}
          />
          <StatCard
            title="Interviews Scheduled"
            value={stats.interviewsScheduled}
            icon={Calendar}
            color="text-purple-600"
          />
          <StatCard
            title="Completed Interviews"
            value={stats.completedInterviews}
            icon={CheckCircle}
            color="text-emerald-600 "
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Interview Analytics */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <QuickActionButton
                title="Approve Candidates"
                description={`${stats.pendingCandidates} pending approval`}
                icon={Users}
                color="text-blue-600"
                onClick={() => (window.location.href = "/manage-candidates")}
              />
              <QuickActionButton
                title="Approve Interviewers"
                description={`${stats.pendingInterviewers} pending approval`}
                icon={UserCheck}
                color="text-green-600"
                onClick={() => (window.location.href = "/manage-interviewers")}
              />
              <QuickActionButton
                title="Schedule Interview"
                description="Create new interview session"
                icon={Calendar}
                color="text-purple-600"
                onClick={() => (window.location.href = "/scheduling")}
              />
            </div>
          </div>
        </div>

          {/* Upcoming Interviews with MUI Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Interviews
              </h2>
              <CalendarDays className="w-5 h-5 text-gray-400" />
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="upcoming interviews table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>S.No</b></TableCell>
                    <TableCell><b>Candidate</b></TableCell>
                    <TableCell><b>Interviewer</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Time</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? upcomingInterviews.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : upcomingInterviews
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
                      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                      colSpan={6}
                      count={upcomingInterviews.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
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
