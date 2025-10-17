"use client";

import StatCard from "@/app/admin/components/statCard";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Filter,
  Plus,
  Search,
  Target,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type InterviewType = {
  id: string;
  companyLogo?: string;
  companyName: string;
  candidateName: string;
  candidateRole: string;
  interviewType: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingLink: string;
};

type InterviewerInterviewCardProps = {
  interview: InterviewType;
  onEdit: (interview: InterviewType) => void;
  onDelete: (id: string) => void;
  onJoin: (link: string) => void;
};

const InterviewerInterviewCard = ({
  interview,
  onEdit,
  onDelete,
  onJoin,
}: InterviewerInterviewCardProps) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-200">
      {/* Company Header */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-300">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {interview.companyLogo ? (
            <img
              src={interview.companyLogo}
              alt={interview.companyName}
              className="w-full h-full object-cover"
            />
          ) : (
            <Briefcase className="w-8 h-8 text-blue-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {interview.companyName}
          </h3>
          <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {interview.interviewType}
          </span>
        </div>
      </div>

      {/* Candidate Details */}
      <div className="space-y-3 mb-5">
        {/* Candidate Info */}
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <span className="font-medium">{interview.candidateName}</span>
            {interview.candidateRole && (
              <span className="text-sm text-gray-500 ml-2">
                • {interview.candidateRole}
              </span>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div className="flex items-center text-sm">
            <span className="font-medium mr-2">Date:</span>
            <span className="text-gray-600">{interview.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-5 h-5 text-gray-500" />
          <div className="flex items-center text-sm">
            <span className="font-medium mr-2">Time:</span>
            <span className="text-gray-600">
              {interview.startTime} - {interview.endTime}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-300">
        <button
          onClick={() => onEdit(interview)}
          className="flex-1 px-4 py-2 hover:bg-gray-300 bg-gray-200 border-gray-300 border text-gray-700 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(interview.id)}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 border border-red-300 text-red-600 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={() => onJoin(interview.meetingLink)}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition flex items-center justify-center gap-2"
        >
          <Video className="w-4 h-4" />
          Start
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function InterviewerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedView, setSelectedView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([
    "Technical",
    "HR Round",
    "Managerial",
    "Behavioral",
  ]);

  const router = useRouter();

  const itemsPerPage = 6;

  const sampleInterviews = [
    {
      id: "1",
      companyLogo:
        "https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg",
      companyName: "TechCorp Solutions",
      candidateName: "Arjun Patel",
      candidateRole: "Full Stack Developer",
      interviewType: "Technical",
      date: "29 Sep",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      meetingLink: "https://the-codemeet.vercel.app/rooms/33",
    },
    {
      id: "2",
      companyName: "InnovateLabs",
      candidateName: "Sneha Reddy",
      candidateRole: "Frontend Developer",
      interviewType: "HR Round",
      date: "30 Sep",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      meetingLink: "https://the-codemeet.vercel.app/rooms/33",
    },
    {
      id: "3",
      companyName: "DataSystems Inc",
      candidateName: "Vikram Singh",
      candidateRole: "Backend Developer",
      interviewType: "Technical",
      date: "1 Oct",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      meetingLink: "https://the-codemeet.vercel.app/rooms/33",
    },
    {
      id: "4",
      companyName: "CloudNine Technologies",
      candidateName: "Ananya Iyer",
      candidateRole: "DevOps Engineer",
      interviewType: "Managerial",
      date: "2 Oct",
      startTime: "3:00 PM",
      endTime: "4:00 PM",
      meetingLink: "https://the-codemeet.vercel.app/rooms/33",
    },
  ];

  const filteredInterviews = sampleInterviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interview.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.includes(interview.interviewType);
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInterviews = filteredInterviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEdit = (interview: any) => {
    console.log("Edit interview:", interview);
    alert(`Edit interview with ${interview.candidateName}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete interview:", id);
    if (confirm("Are you sure you want to delete this interview?")) {
      alert("Interview deleted");
    }
  };

  const handleJoin = (link: string | URL | undefined) => {
  if (link) {
    window.open(link.toString(), "_self");
  }
};

  const handleCreateNew = () => {
    alert("Create new interview");
    router.push("/interviewer/createInterview");
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-gray-100 border border-gray-300 shadow-md px-6 py-5 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Interviews</h1>
            <p className="text-gray-600">
              Manage and conduct your scheduled interviews.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-blue-600 flex gap-1 items-center text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Schedule New
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={24}
          icon={Calendar}
          color="blue"
          subtitle="Completed: 18 • Upcoming: 6"
        />
        <StatCard
          title="This Week"
          value={6}
          icon={Clock}
          color="green"
          subtitle="Scheduled interviews"
        />
        <StatCard
          title="Completion Rate"
          value={"92 %"}
          icon={CheckCircle}
          color="purple"
          subtitle="On-time completion"
        />
        <StatCard
          title="Avg Duration"
          value={"45 m"}
          icon={Target}
          color="orange"
          subtitle="Per interview session"
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 bg-transparent">
            <div className="relative flex-1 max-w-md bg-transparent">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by candidate or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              {filterOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Interview Type
                  </p>
                  <div className="space-y-2">
                    {["Technical", "HR Round", "Managerial", "Behavioral"].map(
                      (type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setSelectedView("grid")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedView === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setSelectedView("table")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedView === "table"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {selectedView === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {paginatedInterviews.length > 0 ? (
            paginatedInterviews.map((interview) => (
              <InterviewerInterviewCard
                key={interview.id}
                interview={interview}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onJoin={handleJoin}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No interviews found matching your criteria
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6 mb-8">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-gray-200 text-gray-700 font-semibold text-sm py-3 px-4 rounded-lg mb-2">
              <div>CANDIDATE</div>
              <div>COMPANY</div>
              <div>TYPE</div>
              <div>DATE</div>
              <div>TIME</div>
              <div className="text-center">ACTIONS</div>
            </div>

            {/* Table Body */}
            {paginatedInterviews.length > 0 ? (
              paginatedInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="grid grid-cols-6 border border-gray-200 bg-gray-50 hover:bg-gray-100 items-center py-3 px-4 rounded-lg mb-2 transition"
                >
                  <div className="font-medium text-gray-900">
                    {interview.candidateName}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {interview.companyLogo ? (
                        <img
                          src={interview.companyLogo}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Briefcase className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {interview.companyName}
                    </span>
                  </div>

                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {interview.interviewType}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700">{interview.date}</div>

                  <div className="text-sm text-gray-600">
                    {interview.startTime} - {interview.endTime}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(interview)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(interview.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    <button
                      onClick={() => handleJoin(interview.meetingLink)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" />
                      Start
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No interviews found matching your criteria
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages >= 1 && (
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 border rounded-lg text-sm transition ${
                      currentPage === idx + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
