// ManageInterviewers.tsx
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

import { TextField } from "@mui/material";
import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaIndustry,
  FaPhone,
  FaUser,
} from "react-icons/fa";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  useDisclosure as useDrawerDisclosure,
} from "@nextui-org/react";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  Search,
  Target,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import StatCard from "../components/statCard";
import { interviewers as rawInterviewers } from "../utils";
import { getRequest, putRequest } from "@/utils/axios/axios";

// Ensure interviewer.status is typed correctly
const interviewers: Interviewer[] = rawInterviewers.map((iv) => ({
  ...iv,
  status:
    iv.status === "Active"
      ? "Active"
      : iv.status === "Inactive"
        ? "Inactive"
        : undefined,
}));

interface Interviewer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  yearsOfExperience: number;
  role: string;
  department: string;
  profileImage?: string;
  status?: "Active" | "Pending" | "Inactive";
  stats: {
    totalInterviews: number;
    completedInterviews: number;
    pendingInterviews: number;
    totalHires: number;
  };
}

const ManageInterviewers = () => {
  // pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  // search & filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [departmentFilter, setDepartmentFilter] =
    useState<string>("All Departments");

  // Modal management: useDisclosure from hero ui to handle open/close in accessible way.
  // We'll still use selectedInterviewer to store currently viewed interviewer.
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedInterviewer, setSelectedInterviewer] =
    useState<Interviewer | null>(null);

  // Helpers to safely render values that may be objects like { value: ... }
  const safeDisplay = (v: any) => {
    if (v === null || v === undefined) return "";
    if (typeof v === "object") {
      if ("value" in v) return String(v.value ?? "");
      if (Array.isArray(v)) return v.join(", ");
      try {
        return String(v.toString ? v.toString() : JSON.stringify(v));
      } catch (e) {
        return JSON.stringify(v);
      }
    }
    return String(v);
  };

  const toNumber = (v: any) => {
    if (v === null || v === undefined) return 0;
    if (typeof v === "object") {
      if ("value" in v) return Number(v.value) || 0;
      return Number(v) || 0;
    }
    return Number(v) || 0;
  };

  // data source (replace with real import)

  // Derived lists for filter dropdowns:
  const uniqueRoles = useMemo(
    () => Array.from(new Set(interviewers.map((i) => i.role))),
    [interviewers]
  );
  const uniqueDepartments = useMemo(
    () => Array.from(new Set(interviewers.map((i) => i.department))),
    [interviewers]
  );

  // Combined filtering logic (search term + role + department + status)
  const filteredInterviewers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return interviewers.filter((iv) => {
      const matchesSearch =
        q === "" ||
        iv.name.toLowerCase().includes(q) ||
        iv.email.toLowerCase().includes(q) ||
        (iv.phone && iv.phone.toLowerCase().includes(q));

      const matchesRole = roleFilter === "All Roles" || iv.role === roleFilter;
      const matchesDepartment =
        departmentFilter === "All Departments" ||
        iv.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All Status" || iv.status === statusFilter;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [interviewers, searchTerm, roleFilter, departmentFilter, statusFilter]);

  // Open modal with an interviewer
  const openModal = (interviewer: Interviewer) => {
    // Normalize server object shape (first_name/last_name, mobile_number, userPositions, stats etc.)
    const normalized: Interviewer = {
      id: (interviewer as any).id || (interviewer as any)._id || "",
      name:
        ((interviewer as any).first_name || (interviewer as any).name || "") +
        " " +
        ((interviewer as any).last_name || ""),
      email: (interviewer as any).email || "",
      phone:
        (interviewer as any).mobile_number || (interviewer as any).phone || "",
      gender: (interviewer as any).gender || "",
      yearsOfExperience: (interviewer as any).yearsOfExperience || 0,
      role:
        (interviewer as any).userPositions?.position?.title ||
        (interviewer as any).role ||
        "",
      department:
        (interviewer as any).userPositions?.position?.department ||
        (interviewer as any).department ||
        "",
      profileImage: (interviewer as any).profilePhoto || undefined,
      status: (interviewer as any).status || undefined,
      stats: (interviewer as any).stats || {
        totalInterviews: (interviewer as any).Interview?.length || 0,
        completedInterviews: 0,
        pendingInterviews: 0,
        totalHires: 0,
      },
    };

    setSelectedInterviewer(normalized);
    onOpen(); // heroui disclosure open
  };

  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const updateCandidateStatus = async (userId: string, status: string) => {
    setActionLoading(true);
    try {
      const payload = { userId, status };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // call PUT api/candidate/status-update
      await putRequest(`${baseUrl}api/candidate/status-update`, payload, headers);

      // optimistically update UI
      if (selectedInterviewer) {
        setSelectedInterviewer({ ...selectedInterviewer, status: status as any });
      }

      // refresh the table to reflect changes
      InitalCall();
      console.log("Status updated", payload);
    } catch (err) {
      console.error("Failed to update status:", err);
      // optionally show user-facing error here
    } finally {
      setActionLoading(false);
    }
  };

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onOpenChange: onDrawerOpenChange,
  } = useDrawerDisclosure();

  /* Pagination handlers */
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

  // role badge classes
  const getRoleBadgeColor = (role: string) => {
    const colors: { [key: string]: string } = {
      "Technical Lead": "bg-purple-200 text-purple-800",
      "Senior Developer": "bg-blue-200 text-blue-800",
      "HR Specialist": "bg-green-200 text-green-800",
      "Senior Manager": "bg-orange-200 text-orange-800",
      "Lead Designer": "bg-pink-200 text-pink-800",
    };
    return colors[role] || "bg-gray-200 text-gray-800";
  };

  // ensure page is within bounds when filtered size reduces
  React.useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(filteredInterviewers.length / rowsPerPage) - 1
    );
    if (page > maxPage) {
      setPage(maxPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredInterviewers.length, rowsPerPage]);

  const token = localStorage.getItem("authToken");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
  const [table, setTableData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState<number | null>(null);
  const [cards, setCards] = useState<any>();
  const [cardsLoading, setCardsLoading] = useState<boolean>(false);

  const fetchCards = async () => {
    setCardsLoading(true);
    try {
      const resp: any = await getRequest(
        `${baseUrl}api/admin/interviewers`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      // api shape may vary; prefer resp.data or resp.results
      const items = resp?.data?.data ;
      setCards(items);
    } catch (err) {
      console.error("Failed to fetch interviewer cards:", err);
      setCards([]);
    } finally {
      setCardsLoading(false);
    }
  };
  const InitalCall = async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(
        `${baseUrl}api/admin/interviewers-table?status=${encodeURIComponent(
          statusFilter === "All Status" ? "" : statusFilter
        )}&searchQuery=${encodeURIComponent(searchTerm)}&page=${page + 1}&limit=${rowsPerPage}&department=${encodeURIComponent(
          departmentFilter === "All Departments" ? "" : departmentFilter
        )}&role=${encodeURIComponent(roleFilter === "All Roles" ? "" : roleFilter)}`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setTableData(response?.data ?? []);
      const total =
        response?.total ||
        response?.totalCount ||
        response?.meta?.total ||
        null;
      setTotalRecords(typeof total === "number" ? total : null);
    } catch (error) {
      console.error("Failed to fetch interviewers table:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };



  // Debounce search input to avoid firing API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    // Fetch table whenever filters/pagination/search change
    InitalCall();
    // fetch top 4 cards when filters/search/status/role/department change
    // cards shouldn't depend on page/rowsPerPage
    fetchCards();
  }, [
    page,
    rowsPerPage,
    searchTerm,
    statusFilter,
    roleFilter,
    departmentFilter,
  ]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-100 border border-gray-300 shadow-md px-6 py-5 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Interviewers
            </h1>
            <p className="text-gray-600">
              Review, approve, and manage interviewer roles and performance
            </p>
          </div>

          <div className="flex gap-3">
            {/* Example action buttons (feel free to remove) */}
            <button
              onClick={onDrawerOpen}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Interviewer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={cards?.totalInterviewerUsers}
          icon={Calendar}
          color="orange"
        />
        <StatCard
          title="Active Interviewers"
          value={cards?.totalApprovedInterviewerUsers ?? 0}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Interviewers"
          value={cards?.totalPendingInterviewerUsers ?? 0}
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Average Rating"
          value={4.7}
          icon={Award}
          color="violet"
        />
      </div>

 

      {/* Search & Filters */}
      <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm border border-gray-300 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search interviewers..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-3 mr-12 border w-[35rem] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <select
            aria-label="Status filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All Status</option>
            <option value={"APPROVED"}>Active</option>
            <option value={"REJECTED"}>Inactive</option>
          </select>

          <select
            aria-label="Role filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            aria-label="Department filter"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All Departments</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table className="bg-gray-100">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>Interviewer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <CircularProgress />
                    <div className="text-sm text-gray-600">
                      Loading interviewers…
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : table != null && table?.length > 0 ? (
            <TableBody>
              {table.map((interviewer: any) => (
                <TableRow key={interviewer.id || interviewer._id} hover>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                        {(interviewer.first_name + " " + interviewer.last_name)
                          .toUpperCase()
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {(
                            interviewer.first_name +
                            " " +
                            interviewer.last_name
                          ).toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {interviewer.mobile_number}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{interviewer.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        interviewer.status === "APPROVED"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {interviewer.status || "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${getRoleBadgeColor(interviewer.userPositions?.position?.title)}`}
                    >
                      {interviewer.userPositions[0]?.position?.title ||
                        "Lead Designer"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {interviewer.userPositions[0]?.position?.department ||
                      "Unknown"}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => openModal(interviewer)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-gray-600">No interviewers found.</div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          className="bg-gray-100"
          count={totalRecords ?? table?.length ?? 0}
    rowsPerPageOptions={[10, 20, 25, 50, 100]}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows"
        />
      </TableContainer>

      <Modal
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={(val) => {
          if (!val) {
            setSelectedInterviewer(null);
          }
          onOpenChange();
        }}
      >
        <ModalContent className="max-w-4xl w-full">
          {(onClose) => (
            <>
              <div className="w-full bg-white rounded-xl overflow-hidden">
                {/* Header */}
                <ModalHeader className="flex items-start justify-between p-6 border-b">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                      {selectedInterviewer
                        ? safeDisplay(selectedInterviewer.name)
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : ""}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {safeDisplay(selectedInterviewer?.name)}
                      </h2>
                      <p className="text-gray-600">
                        {safeDisplay(selectedInterviewer?.email)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      setSelectedInterviewer(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </ModalHeader>

                {/* Body */}
                <ModalBody>
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Personal Details */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Personal Details
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Email
                              </p>
                              <p className="text-sm text-gray-900">
                                {safeDisplay(selectedInterviewer?.email)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Phone Number
                              </p>
                              <p className="text-sm text-gray-900">
                                {safeDisplay(selectedInterviewer?.phone)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Gender
                              </p>
                              <p className="text-sm text-gray-900">
                                {safeDisplay(selectedInterviewer?.gender)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Years of Experience
                              </p>
                              <p className="text-sm text-gray-900">
                                {safeDisplay(selectedInterviewer?.yearsOfExperience)} years
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Award className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Role & Department
                              </p>
                              <div className="flex gap-3 items-center">
                                <p className="text-sm text-gray-900">
                                  {safeDisplay(selectedInterviewer?.role)}
                                </p>
                                <p className="flex items-center">-</p>
                                <p className="text-sm text-gray-900">
                                  {safeDisplay(selectedInterviewer?.department)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Stats */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Performance Overview
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          {/* Total Interviews */}
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center gap-3">
                            <Calendar className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-blue-600">
                                Total Interviews
                              </p>
                              <p className="text-2xl font-bold text-blue-700">
                                {toNumber(selectedInterviewer?.stats?.totalInterviews ?? 0)}
                              </p>
                            </div>
                          </div>

                          {/* Completed */}
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center gap-3">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-green-600">
                                Completed
                              </p>
                              <p className="text-2xl font-bold text-green-700">
                                {toNumber(selectedInterviewer?.stats?.completedInterviews ?? 0)}
                              </p>
                            </div>
                          </div>

                          {/* Pending */}
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-center gap-3">
                            <Clock className="h-8 w-8 text-orange-500" />
                            <div>
                              <p className="text-sm font-medium text-orange-600">
                                Pending
                              </p>
                              <p className="text-2xl font-bold text-orange-700">
                                {toNumber(selectedInterviewer?.stats?.pendingInterviews ?? 0)}
                              </p>
                            </div>
                          </div>

                          {/* Total Hires */}
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center gap-3">
                            <Target className="h-8 w-8 text-purple-500" />
                            <div>
                              <p className="text-sm font-medium text-purple-600">
                                Total Hires
                              </p>
                              <p className="text-2xl font-bold text-purple-700">
                                {toNumber(selectedInterviewer?.stats?.totalHires ?? 0)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 flex gap-4 justify-end">
                          <Button variant="solid" color="success" className="text-white">
                            Approve
                          </Button>
                          <Button variant="bordered" color="danger">
                            reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                {/* Modal Footer - Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t bg-white">
                  <button
                    onClick={async () => {
                      // Reject -> CANCELLED
                      if (!selectedInterviewer) return;
                      await updateCandidateStatus(selectedInterviewer.id || "", "CANCELLED");
                      onClose();
                      setSelectedInterviewer(null);
                    }}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-60"
                  >
                    {actionLoading ? "Processing..." : "Reject"}
                  </button>

                  <button
                    onClick={async () => {
                      // Accept -> APPROVED
                      if (!selectedInterviewer) return;
                      await updateCandidateStatus(selectedInterviewer.id || "", "APPROVED");
                      onClose();
                      setSelectedInterviewer(null);
                    }}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
                  >
                    {actionLoading ? "Processing..." : "Accept"}
                  </button>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      <Drawer isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              {/* Header */}
              <DrawerHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Add Interviewer</h2>
                    <p className="text-blue-100 mt-1 text-sm">
                      Enter interviewer details below
                    </p>
                  </div>
                </div>
              </DrawerHeader>

              {/* Body */}
              <DrawerBody className="space-y-6 p-6 bg-gray-50">
                {/* Full Name */}
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-500 text-lg" />
                  <TextField
                    fullWidth
                    id="name"
                    label="Full Name"
                    variant="outlined"
                    size="medium"
                  />
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-500 text-lg" />
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    size="medium"
                  />
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-500 text-lg" />
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    type="text"
                    variant="outlined"
                    size="medium"
                  />
                </div>
                {/* Company Name */}
                <div className="flex items-center gap-3">
                  <FaIndustry className="text-gray-500 text-lg" />
                  <TextField
                    fullWidth
                    id="company"
                    label="Company Name"
                    variant="outlined"
                    size="medium"
                  />
                </div>

                {/* Job Role */}
                <div className="flex items-center gap-3">
                  <FaBriefcase className="text-gray-500 text-lg" />
                  <TextField
                    fullWidth
                    id="role"
                    label="Job Role"
                    variant="outlined"
                    size="medium"
                  />
                </div>

                {/* Department */}
                <div className="flex items-center gap-3">
                  <FaBuilding className="text-gray-500 text-lg" />
                  <TextField
                    fullWidth
                    id="department"
                    label="Department"
                    variant="outlined"
                    size="medium"
                  />
                </div>
              </DrawerBody>

              {/* Footer */}
              <DrawerFooter className="bg-white border-t border-gray-100 p-6">
                <div className="flex gap-3">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="flex-1 py-3.5 px-6 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Save Interviewer
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ManageInterviewers;
