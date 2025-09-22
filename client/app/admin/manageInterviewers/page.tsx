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
import React, { useMemo, useState } from "react";
import StatCard from "../components/statCard";
import { interviewers as rawInterviewers } from "../utils";

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
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // search & filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [departmentFilter, setDepartmentFilter] =
    useState<string>("All Departments");

  // Modal management: useDisclosure from hero ui to handle open/close in accessible way.
  // We'll still use selectedInterviewer to store currently viewed interviewer.
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedInterviewer, setSelectedInterviewer] =
    useState<Interviewer | null>(null);

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
    setSelectedInterviewer(interviewer);
    onOpen(); // heroui disclosure open
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
          value={248}
          icon={Calendar}
          color="orange"
        />
        <StatCard
          title="Active Interviewers"
          value={117}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Interviewers"
          value={148}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 mr-12 border w-[38rem] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <select
            aria-label="Status filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
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

          <TableBody>
            {(rowsPerPage > 0
              ? filteredInterviewers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredInterviewers
            ).map((interviewer) => (
              <TableRow key={interviewer.id} hover>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      {interviewer.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {interviewer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {interviewer.phone}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{interviewer.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      interviewer.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {interviewer.status || "Active"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded ${getRoleBadgeColor(interviewer.role)}`}
                  >
                    {interviewer.role}
                  </span>
                </TableCell>
                <TableCell>{interviewer.department}</TableCell>
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
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          className="bg-gray-100"
          count={filteredInterviewers.length}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {selectedInterviewer
                        ? selectedInterviewer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : ""}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedInterviewer?.name}
                      </h2>
                      <p className="text-gray-600">
                        {selectedInterviewer?.email}
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
                                {selectedInterviewer?.email}
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
                                {selectedInterviewer?.phone}
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
                                {selectedInterviewer?.gender}
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
                                {selectedInterviewer?.yearsOfExperience} years
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
                                  {selectedInterviewer?.role}
                                </p>
                                <p className="flex items-center">-</p>
                                <p className="text-sm text-gray-900">
                                  {selectedInterviewer?.department}
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
                                {selectedInterviewer?.stats.totalInterviews ??
                                  0}
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
                                {selectedInterviewer?.stats
                                  .completedInterviews ?? 0}
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
                                {selectedInterviewer?.stats.pendingInterviews ??
                                  0}
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
                                {selectedInterviewer?.stats.totalHires ?? 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Success Rate */}
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">
                              Success Rate
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {selectedInterviewer
                                ? (
                                    (selectedInterviewer.stats.totalHires /
                                      Math.max(
                                        1,
                                        selectedInterviewer.stats
                                          .completedInterviews
                                      )) *
                                    100
                                  ).toFixed(1)
                                : "0.0"}
                              %
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  selectedInterviewer
                                    ? Math.min(
                                        100,
                                        (selectedInterviewer.stats.totalHires /
                                          Math.max(
                                            1,
                                            selectedInterviewer.stats
                                              .completedInterviews
                                          )) *
                                          100
                                      )
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
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
