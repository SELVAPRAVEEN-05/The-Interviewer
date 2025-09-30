"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  Modal,
  ModalContent,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Eye,
  GraduationCap,
  Search,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import StatCard from "../components/statCard";
import { candidates } from "../utils";
import { EducationTab } from "./components/education";
import { PersonalTab } from "./components/personal";
import { SkillsTab } from "./components/skills";

type TabType = "overview" | "approved" | "pending" | "rejected";

const ManageCandidatesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [candidateList, setCandidateList] = useState(candidates);
  const filteredCandidates = candidateList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.assignedInterviewer.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "approved")
      return matchesSearch && c.status === "approved";
    if (activeTab === "pending") return matchesSearch && c.status === "pending";
    if (activeTab === "rejected")
      return matchesSearch && c.status === "canceled";

    return matchesSearch;
  });

  const totalCandidates = candidates.length;
  const approvedCount = candidates.filter(
    (c) => c.status === "approved"
  ).length;
  const pendingCount = candidates.filter((c) => c.status === "pending").length;
  const canceledCount = candidates.filter(
    (c) => c.status === "canceled"
  ).length;

  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const updateCandidateStatus = (
    id: number,
    newStatus: "approved" | "pending" | "canceled"
  ) => {
    setCandidateList((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 text-xs w-fit font-medium rounded-full flex items-center gap-1";
    switch (status) {
      case "approved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle size={12} />
            Approved
          </span>
        );
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock size={12} />
            Pending
          </span>
        );
      case "canceled":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle size={12} />
            Rejected
          </span>
        );
      default:
        return <span className={baseClasses}>Unknown</span>;
    }
  };

  const getInterviewStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 text-xs w-fit font-medium rounded-full flex items-center gap-1";
    switch (status) {
      case "scheduled":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <Calendar size={12} />
            Scheduled
          </span>
        );
      case "not_scheduled":
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            <Clock size={12} />
            Not Scheduled
          </span>
        );
      default:
        return <span className={baseClasses}>Unknown</span>;
    }
  };

  const getTabButtonClasses = (tabType: TabType) => {
    const baseClasses =
      "flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-800";
    return activeTab === tabType
      ? `${baseClasses} text-white bg-blue-600`
      : `${baseClasses} border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50`;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="">
      {/* Stats Cards */}

      <div className="bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Candidates
            </h1>
            <p className="text-gray-600">
              View and manage all candidate applications.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Candidates"
          value={totalCandidates}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Approved Candidates"
          value={approvedCount}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Pending Candidates"
          value={pendingCount}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Rejected Candidates"
          value={canceledCount}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Tabs and Search */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm mb-6">
        <div className="flex  items-center justify-between p-4 ">
          <div className="flex gap-3 border border-gray-300 bg-gray-50 p-2 rounded-lg">
            <button
              onClick={() => setActiveTab("overview")}
              className={getTabButtonClasses("overview")}
            >
              <Users size={16} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={getTabButtonClasses("approved")}
            >
              <CheckCircle size={16} />
              Approved
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={getTabButtonClasses("pending")}
            >
              <Clock size={16} />
              Pending
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={getTabButtonClasses("rejected")}
            >
              <XCircle size={16} />
              Rejected
            </button>
          </div>

          {/* Search Bar */}
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

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#f3f4f6", border: "none", boxShadow: "none" }}
          className="px-4 bg-gray-100"
        >
          <Table className="bg-gray-100 border border-gray-300 rounded-t-md">
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell>Candidate</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Interview</TableCell>
                <TableCell>Interviewer</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredCandidates.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredCandidates
              ).map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="flex items-center gap-3">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={candidate.profilePhoto}
                        alt={candidate.name}
                      />
                      <span className="ml-2 font-medium text-gray-900">
                        {candidate.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                  <TableCell>
                    {getInterviewStatusBadge(candidate.interviewStatus)}
                  </TableCell>
                  <TableCell>{candidate.assignedInterviewer}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        onOpen();
                      }}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            className="bg-gray-100"
            count={filteredCandidates.length}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        radius="lg"
        scrollBehavior="inside"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <div className="bg-white rounded-lg w-full">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={selectedCandidate?.profilePhoto}
                    alt={selectedCandidate?.name}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedCandidate?.name}
                    </h2>
                    <p className="text-gray-600 font-medium">
                      {selectedCandidate?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCandidate(null);
                    onClose();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 py-4">
                <Tabs variant="underlined" color="primary">
                  <Tab
                    key="personal"
                    title={
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>Personal</span>
                      </div>
                    }
                  >
                    <PersonalTab
                      personalDetails={selectedCandidate?.personalDetails}
                    />
                  </Tab>

                  <Tab
                    key="education"
                    title={
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} />
                        <span>Education</span>
                      </div>
                    }
                  >
                    <EducationTab education={selectedCandidate?.education} />
                  </Tab>

                  <Tab
                    key="skills"
                    title={
                      <div className="flex items-center gap-2">
                        <Code size={16} />
                        <span>Skills</span>
                      </div>
                    }
                  >
                    <SkillsTab skills={selectedCandidate?.skills} />
                  </Tab>
                </Tabs>
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                  {/* Reject button */}
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, "canceled");
                      onClose();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedCandidate?.status === "canceled"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                    disabled={selectedCandidate?.status === "canceled"}
                  >
                    {selectedCandidate?.status === "canceled"
                      ? "Already Rejected"
                      : "Reject"}
                  </button>

                  {/* Approve button */}
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, "approved");
                      onClose();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedCandidate?.status === "approved"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    disabled={selectedCandidate?.status === "approved"}
                  >
                    {selectedCandidate?.status === "approved"
                      ? "Already Approved"
                      : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManageCandidatesPage;
