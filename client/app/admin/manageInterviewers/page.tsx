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
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  Target,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import StatCard from "../components/statCard";
import { interviewers } from "../utils";
// Types
interface Interviewer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  yearsOfExperience: number;
  role: string;
  department: string;
  profileImage: string;
  stats: {
    totalInterviews: number;
    completedInterviews: number;
    pendingInterviews: number;
    totalHires: number;
  };
}


const ManageInterviewers: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInterviews = interviewers.filter((interview) =>
    interview.name.toLowerCase().includes(searchQuery.toLowerCase())
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
  const [selectedInterviewer, setSelectedInterviewer] =
    useState<Interviewer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");

  // Filter interviewers based on search and filters
  const filteredInterviewers = interviewers.filter((interviewer) => {
    const matchesSearch =
      interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interviewer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All Roles" || interviewer.role === roleFilter;
    const matchesDepartment =
      departmentFilter === "All Departments" ||
      interviewer.department === departmentFilter;

    return matchesSearch && matchesRole && matchesDepartment;
  });

  // Get unique roles and departments for filter options
  const uniqueRoles = Array.from(new Set(interviewers.map((i) => i.role)));
  const uniqueDepartments = Array.from(
    new Set(interviewers.map((i) => i.department))
  );

  const openModal = (interviewer: Interviewer) => {
    setSelectedInterviewer(interviewer);
  };

  const closeModal = () => {
    setSelectedInterviewer(null);
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: { [key: string]: string } = {
      "Technical Lead": "bg-purple-100 text-purple-800",
      "Senior Developer": "bg-blue-100 text-blue-800",
      "HR Specialist": "bg-green-100 text-green-800",
      "Senior Manager": "bg-orange-100 text-orange-800",
      "Lead Designer": "bg-pink-100 text-pink-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manage Interviewers
              </h1>
              <p className="text-gray-600">
                Review, approve, and manage interviewer roles and performance
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        {/* Search and Filters */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-300 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search interviewers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>

            <select
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

        <TableContainer component={Paper}>
          <Table className="bg-gray-100 ">
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell>Interviewer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredInterviews.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredInterviews
              ).map((interviewer) => (
                <TableRow key={interviewer.id}>
                  {/* Interviewer Name + Avatar */}
                  <TableCell className="flex items-center gap-3">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={interviewer.profileImage}
                        alt={interviewer.name}
                      />
                      <span className="ml-2 font-medium text-gray-900">
                        {interviewer.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell>{interviewer.email}</TableCell>

                  {/* Status (static for now = Active) */}
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>

                  {/* Role */}
                  <TableCell>{interviewer.role}</TableCell>

                  {/* Department */}
                  <TableCell>{interviewer.department}</TableCell>

                  {/* Actions */}
                  <TableCell>
                    <button
                      onClick={() => openModal(interviewer)}
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
            className=""
            count={filteredInterviewers.length}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {/* Modal */}
        {selectedInterviewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedInterviewer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedInterviewer.name}
                    </h2>
                    <p className="text-gray-600">{selectedInterviewer.email}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Details */}
                  <div className="space-y-6">
                    <div>
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
                              {selectedInterviewer.email}
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
                              {selectedInterviewer.phone}
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
                              {selectedInterviewer.gender}
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
                              {selectedInterviewer.yearsOfExperience} years
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Role & Department
                            </p>
                            <p className="text-sm text-gray-900">
                              {selectedInterviewer.role}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedInterviewer.department}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Performance Overview
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-600">
                                Total Interviews
                              </p>
                              <p className="text-2xl font-bold text-blue-700">
                                {selectedInterviewer.stats.totalInterviews}
                              </p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-500" />
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-green-600">
                                Completed
                              </p>
                              <p className="text-2xl font-bold text-green-700">
                                {selectedInterviewer.stats.completedInterviews}
                              </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </div>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-orange-600">
                                Pending
                              </p>
                              <p className="text-2xl font-bold text-orange-700">
                                {selectedInterviewer.stats.pendingInterviews}
                              </p>
                            </div>
                            <Clock className="h-8 w-8 text-orange-500" />
                          </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-purple-600">
                                Total Hires
                              </p>
                              <p className="text-2xl font-bold text-purple-700">
                                {selectedInterviewer.stats.totalHires}
                              </p>
                            </div>
                            <Target className="h-8 w-8 text-purple-500" />
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
                            {(
                              (selectedInterviewer.stats.totalHires /
                                selectedInterviewer.stats.completedInterviews) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(selectedInterviewer.stats.totalHires / selectedInterviewer.stats.completedInterviews) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-8 pt-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-700">
                        {selectedInterviewer.stats.totalInterviews}
                      </p>
                      <p className="text-sm text-blue-600">
                        Total Interviews Conducted
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-700">
                        {selectedInterviewer.stats.totalHires}
                      </p>
                      <p className="text-sm text-green-600">Successful Hires</p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-700">
                        {selectedInterviewer.yearsOfExperience}
                      </p>
                      <p className="text-sm text-purple-600">
                        Years of Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageInterviewers;
