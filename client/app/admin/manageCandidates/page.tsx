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
  CircularProgress,
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
import React, { useEffect, useState } from "react";
import StatCard from "../components/statCard";
import { candidates } from "../utils";
import { EducationTab } from "./components/education";
import { PersonalTab } from "./components/personal";
import { SkillsTab } from "./components/skills";
import { getRequest, putRequest } from "@/utils/axios/axios";
import { URL } from "@/utils/axios/endPoint";

type TabType = "overview" | "approved" | "pending" | "rejected";

const ManageCandidatesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
  const [tableData, setTableData] = useState<any>([]);
  const [candidateData, setCandidateData] = useState<any>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
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

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 text-xs w-fit font-medium rounded-full flex items-center gap-1";
    switch (status) {
      case "APPROVED":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle size={12} />
            Approved
          </span>
        );
      case "PENDING":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock size={12} />
            Pending
          </span>
        );
      case "CANCELED":
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

  const InitialCall = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
      const response: any = await getRequest(URL?.MANAGE_CANDIDATES, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      setCandidateData(response?.data?.data);
    } catch (err) {
      throw err;
    }
    // fetch paginated/filtered table and show loading state while doing so
    setIsTableLoading(true);
    try {
      const statusParam =
        activeTab === "overview"
          ? ""
          : activeTab === "approved"
            ? "APPROVED"
            : activeTab === "pending"
              ? "PENDING"
              : activeTab === "rejected"
                ? "CANCELED"
                : "";

      const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
      const response = await getRequest(
        `${baseURL}api/admin/candidates-table?status=${encodeURIComponent(
          statusParam
        )}&searchQuery=${encodeURIComponent(searchQuery)}&page=${page + 1}&limit=${rowsPerPage}`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setTableData(response?.data ?? []);
    } catch (error) {
      console.error("Failed to fetch candidates table:", error);
      setTableData([]);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    InitialCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-fetch when pagination, filters or search query change
  useEffect(() => {
    InitialCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, activeTab, searchQuery]);

  const updateCandidateStatus = async (userId: string, status: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
      const payload = { userId, status };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // call PUT api/candidate/status-update
      await putRequest(
        `${baseURL}api/candidate/status-update`,
        payload,
        headers
      );

      // optimistic UI update for modal / table
      setTableData((prev: any) =>
        prev.map((row: any) =>
          row.id === userId ? { ...row, status: status } : row
        )
      );

      // refresh table from server to ensure consistency
      InitialCall();
    } catch (err) {
      console.error("Failed to update candidate status:", err);
    }
  };

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
      {candidateData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Candidates"
            value={candidateData?.totalCandidateUsers || totalCandidates}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Approved Candidates"
            value={candidateData?.totalApprovedCandidates || approvedCount}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Pending Candidates"
            value={candidateData?.totalPendingCandidates ?? pendingCount}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Rejected Candidates"
            value={candidateData?.totalRejectedInterviews ?? canceledCount}
            icon={XCircle}
            color="red"
          />
        </div>
      )}
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
              {isTableLoading ? (
                Array.from({ length: Math.min(Math.max(rowsPerPage, 5), 10) }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                tableData.map((candidate: any) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="flex items-center gap-3">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={candidate.profilePhoto}
                          alt={candidate.name}
                        />
                        <span className="ml-2 font-medium text-gray-900">
                          {candidate.first_name + " " + candidate.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.email}</TableCell>
                    <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                    <TableCell>
                      {getInterviewStatusBadge(
                        candidate.interviewStatus > 0
                          ? "scheduled"
                          : "not_scheduled"
                      )}
                    </TableCell>
                    <TableCell>{candidate.assignedInterviewer}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          // normalize candidate shape so modal can read expected fields
                          // build normalized shapes expected by the tab components
                          const personalDetails = {
                            firstName:
                              candidate.personalDetails?.firstName ||
                              candidate.personal_details?.first_name ||
                              candidate.first_name ||
                              candidate.firstName ||
                              "",
                            lastName:
                              candidate.personalDetails?.lastName ||
                              candidate.personal_details?.last_name ||
                              candidate.last_name ||
                              candidate.lastName ||
                              "",
                            // prefer API field mobile_number
                            mobileNo:
                              candidate.personalDetails?.mobileNo ||
                              candidate.personal_details?.mobileNo ||
                              candidate.mobile_number ||
                              candidate.mobile ||
                              candidate.phone ||
                              "",
                            email:
                              candidate.email ||
                              candidate.personalDetails?.email ||
                              candidate.personal_details?.email ||
                              "",
                            // prefer date_of_birth from API
                            dateOfBirth:
                              candidate.personalDetails?.dateOfBirth ||
                              candidate.personal_details?.date_of_birth ||
                              candidate.date_of_birth ||
                              candidate.dob ||
                              "",
                            // gender may be nested as { value: 'Male' }
                            gender:
                              candidate.personalDetails?.gender ||
                              candidate.personal_details?.gender ||
                              candidate.gender?.value ||
                              candidate.gender ||
                              "",
                          };

                          // derive a single education object from educationDetails array (API: educationDetails)
                          const eduArray =
                            candidate.educationDetails ||
                            candidate.education_details ||
                            [];
                          // find college/higher-ed entry (prefer one with institute or not 10th/12th)
                          const collegeEntry =
                            eduArray.find(
                              (e: any) =>
                                e.institute ||
                                (e.educationLevel &&
                                  e.educationLevel.level_name &&
                                  !["10th", "12th"].includes(
                                    String(e.educationLevel.level_name)
                                  ))
                            ) ||
                            eduArray[0] ||
                            null;

                          // prefer entries that include marks_obtained/max_marks for accurate percentage
                          const tenthEntry =
                            eduArray.find(
                              (e: any) =>
                                e.educationLevel?.level_name === "10th" &&
                                (e.marks_obtained ?? e.marks ?? e.percentage)
                            ) ||
                            eduArray.find(
                              (e: any) =>
                                e.educationLevel?.level_name === "10th"
                            );

                          const twelfthEntry =
                            eduArray.find(
                              (e: any) =>
                                e.educationLevel?.level_name === "12th" &&
                                (e.marks_obtained ?? e.marks ?? e.percentage)
                            ) ||
                            eduArray.find(
                              (e: any) =>
                                e.educationLevel?.level_name === "12th"
                            );

                          const parseNumber = (v: any) => {
                            if (v === null || v === undefined || v === "")
                              return null;
                            const n = Number(v);
                            return isNaN(n) ? null : n;
                          };

                          const computePercent = (entry: any) => {
                            if (!entry) return "";
                            const marks = parseNumber(
                              entry.marks_obtained ??
                              entry.marks ??
                              entry.marksObtained
                            );
                            const max = parseNumber(
                              entry.max_marks ?? entry.maxMarks ?? entry.max
                            );
                            if (marks !== null && max !== null && max > 0) {
                              return String(Math.round((marks / max) * 100));
                            }
                            // if only marks provided and looks like percent already, return it
                            if (entry.marks_obtained)
                              return String(entry.marks_obtained);
                            if (entry.percentage) return String(entry.percentage);
                            return "";
                          };

                          const education = {
                            collegeName:
                              collegeEntry?.institute?.name ||
                              collegeEntry?.institute_name ||
                              collegeEntry?.institute?.collegeName ||
                              "",
                            qualification:
                              collegeEntry?.specialization ||
                              collegeEntry?.qualification ||
                              "",
                            // prefer specialization as department if present
                            department:
                              collegeEntry?.specialization ||
                              collegeEntry?.department ||
                              "",
                            yearOfPassing:
                              collegeEntry?.year_of_passing ||
                              collegeEntry?.yearOfPassing ||
                              "",
                            cgpa:
                              collegeEntry?.marks_obtained || collegeEntry?.cgpa ||
                              "",
                            collegeEmail:
                              collegeEntry?.institute?.email ||
                              collegeEntry?.institute_email ||
                              "",
                            percentage10th: computePercent(tenthEntry),
                            percentage12th: computePercent(twelfthEntry),
                          };

                          const skills = {
                            // map API link fields
                            resumeLink:
                              candidate.skills?.resumeLink ||
                              candidate.skills?.resume_link ||
                              candidate.resume ||
                              candidate.resume_link ||
                              candidate.resume_url ||
                              candidate.resumeUrl ||
                              "",
                            gitLink:
                              candidate.skills?.gitLink ||
                              candidate.skills?.git_link ||
                              candidate.git_link ||
                              candidate.github_url ||
                              candidate.githubUrl ||
                              "",
                            linkedinLink:
                              candidate.skills?.linkedinLink ||
                              candidate.skills?.linkedin_link ||
                              candidate.linkedin ||
                              candidate.linkedin_url ||
                              candidate.linkedinUrl ||
                              "",
                            portfolioLink:
                              candidate.skills?.portfolioLink ||
                              candidate.skills?.portfolio_link ||
                              candidate.portfolio ||
                              candidate.portfolio_url ||
                              candidate.portfolioUrl ||
                              "",
                            skillsList: Array.isArray(
                              candidate.skills?.skillsList
                            )
                              ? candidate.skills.skillsList
                              : Array.isArray(candidate.skill_set)
                                ? candidate.skill_set.map((s: any) =>
                                  typeof s === "string"
                                    ? s
                                    : s?.name || s?.skill?.name || ""
                                )
                                : Array.isArray(candidate.userSkills)
                                  ? candidate.userSkills
                                    .map((us: any) => us?.skill?.name || us?.name)
                                    .filter(Boolean)
                                  : typeof candidate.skills === "string"
                                    ? candidate.skills.split(",").map((s: string) => s.trim())
                                    : Array.isArray(candidate.skills)
                                      ? candidate.skills
                                      : [],
                          };

                          const normalized = {
                            ...candidate,
                            id:
                              candidate.id || candidate.userId || candidate._id,
                            name:
                              candidate.name ||
                              [
                                personalDetails.firstName,
                                personalDetails.lastName,
                              ]
                                .filter(Boolean)
                                .join(" ") ||
                              "",
                            profilePhoto:
                              candidate.profilePhoto ||
                              candidate.profile_photo ||
                              candidate.avatar ||
                              "",
                            personalDetails,
                            education,
                            skills,
                            email: candidate.email || personalDetails.email || "",
                            status: (candidate.status || "").toUpperCase(),
                          };

                          setSelectedCandidate(normalized);
                          onOpen();
                        }}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
                    onClick={async () => {
                      if (!selectedCandidate) return;
                      await updateCandidateStatus(
                        selectedCandidate.id,
                        "CANCELED"
                      );
                      setSelectedCandidate(
                        (prev: any) => prev && { ...prev, status: "CANCELED" }
                      );
                      onClose();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${selectedCandidate?.status === "CANCELED"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    disabled={selectedCandidate?.status === "CANCELED"}
                  >
                    {selectedCandidate?.status === "CANCELED"
                      ? "Already Rejected"
                      : "Reject"}
                  </button>

                  {/* Approve button */}
                  <button
                    onClick={async () => {
                      if (!selectedCandidate) return;
                      await updateCandidateStatus(
                        selectedCandidate.id,
                        "APPROVED"
                      );
                      setSelectedCandidate(
                        (prev: any) => prev && { ...prev, status: "APPROVED" }
                      );
                      onClose();
                    }}
                    className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${selectedCandidate?.status === "APPROVED"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    disabled={selectedCandidate?.status === "APPROVED"}
                  >
                    {selectedCandidate?.status === "APPROVED"
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
