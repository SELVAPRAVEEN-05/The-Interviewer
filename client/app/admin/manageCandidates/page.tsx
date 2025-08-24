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
import React, { useState, useMemo } from "react";
import StatCard from "../components/statCard";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

interface Candidate {
  id: number;
  name: string;
  email: string;
  status: "approved" | "pending" | "canceled";
  interviewStatus: "scheduled" | "not_scheduled";
  assignedInterviewer: string;
  profilePhoto: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    mobileNo: string;
    email: string;
    dateOfBirth: string;
    gender: string;
  };
  education: {
    collegeName: string;
    qualification: string;
    department: string;
    yearOfPassing: string;
    cgpa: string;
    collegeEmail: string;
    percentage10th: string;
    percentage12th: string;
  };
  skills: {
    resumeLink: string;
    gitLink: string;
    linkedinLink: string;
    portfolioLink: string;
    skillsList: string[];
  };
}

type TabType = "overview" | "approved" | "pending" | "rejected";

const ManageCandidatesPage: React.FC = () => {
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

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "approved",
      interviewStatus: "scheduled",
      assignedInterviewer: "Sarah Wilson",
      profilePhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "John",
        lastName: "Doe",
        mobileNo: "+1-555-0123",
        email: "john.doe@example.com",
        dateOfBirth: "1995-06-15",
        gender: "Male",
      },
      education: {
        collegeName: "MIT",
        qualification: "B.Tech",
        department: "Computer Science",
        yearOfPassing: "2020",
        cgpa: "8.5",
        collegeEmail: "john.doe@mit.edu",
        percentage10th: "92%",
        percentage12th: "89%",
      },
      skills: {
        resumeLink: "https://example.com/resume.pdf",
        gitLink: "https://github.com/johndoe",
        linkedinLink: "https://linkedin.com/in/johndoe",
        portfolioLink: "https://johndoe.dev",
        skillsList: ["React", "Node.js", "TypeScript", "Python", "AWS"],
      },
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      status: "pending",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "Not Assigned",
      profilePhoto:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Alice",
        lastName: "Smith",
        mobileNo: "+1-555-0124",
        email: "alice.smith@example.com",
        dateOfBirth: "1997-03-22",
        gender: "Female",
      },
      education: {
        collegeName: "Stanford University",
        qualification: "M.Tech",
        department: "Software Engineering",
        yearOfPassing: "2022",
        cgpa: "9.1",
        collegeEmail: "alice.smith@stanford.edu",
        percentage10th: "95%",
        percentage12th: "93%",
      },
      skills: {
        resumeLink: "https://example.com/alice-resume.pdf",
        gitLink: "https://github.com/alicesmith",
        linkedinLink: "https://linkedin.com/in/alicesmith",
        portfolioLink: "https://alicesmith.dev",
        skillsList: ["Vue.js", "Django", "PostgreSQL", "Docker", "Kubernetes"],
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      status: "canceled",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "David Brown",
      profilePhoto:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Mike",
        lastName: "Johnson",
        mobileNo: "+1-555-0125",
        email: "mike.johnson@example.com",
        dateOfBirth: "1994-11-08",
        gender: "Male",
      },
      education: {
        collegeName: "UC Berkeley",
        qualification: "B.Tech",
        department: "Information Technology",
        yearOfPassing: "2018",
        cgpa: "7.8",
        collegeEmail: "mike.johnson@berkeley.edu",
        percentage10th: "88%",
        percentage12th: "85%",
      },
      skills: {
        resumeLink: "https://example.com/mike-resume.pdf",
        gitLink: "https://github.com/mikejohnson",
        linkedinLink: "https://linkedin.com/in/mikejohnson",
        portfolioLink: "https://mikejohnson.dev",
        skillsList: ["Angular", "Spring Boot", "MySQL", "Jenkins", "Git"],
      },
    },
    {
      id: 4,
      name: "Sophia Lee",
      email: "sophia.lee@example.com",
      status: "approved",
      interviewStatus: "scheduled",
      assignedInterviewer: "Emma Clark",
      profilePhoto:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Sophia",
        lastName: "Lee",
        mobileNo: "+1-555-0126",
        email: "sophia.lee@example.com",
        dateOfBirth: "1996-02-10",
        gender: "Female",
      },
      education: {
        collegeName: "Harvard University",
        qualification: "B.Sc",
        department: "AI & Data Science",
        yearOfPassing: "2021",
        cgpa: "9.3",
        collegeEmail: "sophia.lee@harvard.edu",
        percentage10th: "96%",
        percentage12th: "94%",
      },
      skills: {
        resumeLink: "https://example.com/sophia-resume.pdf",
        gitLink: "https://github.com/sophialee",
        linkedinLink: "https://linkedin.com/in/sophialee",
        portfolioLink: "https://sophialee.dev",
        skillsList: ["Python", "TensorFlow", "Pandas", "NLP", "Azure"],
      },
    },
    {
      id: 5,
      name: "David Kim",
      email: "david.kim@example.com",
      status: "pending",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "Not Assigned",
      profilePhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "David",
        lastName: "Kim",
        mobileNo: "+1-555-0127",
        email: "david.kim@example.com",
        dateOfBirth: "1998-09-05",
        gender: "Male",
      },
      education: {
        collegeName: "Carnegie Mellon",
        qualification: "M.Sc",
        department: "Cybersecurity",
        yearOfPassing: "2023",
        cgpa: "8.9",
        collegeEmail: "david.kim@cmu.edu",
        percentage10th: "91%",
        percentage12th: "90%",
      },
      skills: {
        resumeLink: "https://example.com/david-resume.pdf",
        gitLink: "https://github.com/davidkim",
        linkedinLink: "https://linkedin.com/in/davidkim",
        portfolioLink: "https://davidkim.dev",
        skillsList: ["C++", "Cybersecurity", "Ethical Hacking", "Linux", "AWS"],
      },
    },
    {
      id: 6,
      name: "Emma Brown",
      email: "emma.brown@example.com",
      status: "approved",
      interviewStatus: "scheduled",
      assignedInterviewer: "James Miller",
      profilePhoto:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Emma",
        lastName: "Brown",
        mobileNo: "+1-555-0128",
        email: "emma.brown@example.com",
        dateOfBirth: "1996-07-18",
        gender: "Female",
      },
      education: {
        collegeName: "Oxford University",
        qualification: "B.Tech",
        department: "Electronics",
        yearOfPassing: "2019",
        cgpa: "8.2",
        collegeEmail: "emma.brown@oxford.edu",
        percentage10th: "89%",
        percentage12th: "87%",
      },
      skills: {
        resumeLink: "https://example.com/emma-resume.pdf",
        gitLink: "https://github.com/emmabrown",
        linkedinLink: "https://linkedin.com/in/emmabrown",
        portfolioLink: "https://emmabrown.dev",
        skillsList: ["Embedded C", "IoT", "MATLAB", "FPGA", "Python"],
      },
    },
    {
      id: 7,
      name: "James Wilson",
      email: "james.wilson@example.com",
      status: "canceled",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "Not Assigned",
      profilePhoto:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "James",
        lastName: "Wilson",
        mobileNo: "+1-555-0129",
        email: "james.wilson@example.com",
        dateOfBirth: "1993-12-11",
        gender: "Male",
      },
      education: {
        collegeName: "University of Toronto",
        qualification: "B.Sc",
        department: "Software Systems",
        yearOfPassing: "2017",
        cgpa: "7.6",
        collegeEmail: "james.wilson@utoronto.edu",
        percentage10th: "86%",
        percentage12th: "83%",
      },
      skills: {
        resumeLink: "https://example.com/james-resume.pdf",
        gitLink: "https://github.com/jameswilson",
        linkedinLink: "https://linkedin.com/in/jameswilson",
        portfolioLink: "https://jameswilson.dev",
        skillsList: ["Java", "Spring", "Hibernate", "SQL", "Docker"],
      },
    },
    {
      id: 8,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      status: "approved",
      interviewStatus: "scheduled",
      assignedInterviewer: "Michael Scott",
      profilePhoto:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Olivia",
        lastName: "Martinez",
        mobileNo: "+1-555-0130",
        email: "olivia.martinez@example.com",
        dateOfBirth: "1999-05-27",
        gender: "Female",
      },
      education: {
        collegeName: "Yale University",
        qualification: "B.Tech",
        department: "Information Security",
        yearOfPassing: "2022",
        cgpa: "9.0",
        collegeEmail: "olivia.martinez@yale.edu",
        percentage10th: "94%",
        percentage12th: "92%",
      },
      skills: {
        resumeLink: "https://example.com/olivia-resume.pdf",
        gitLink: "https://github.com/oliviamartinez",
        linkedinLink: "https://linkedin.com/in/oliviamartinez",
        portfolioLink: "https://oliviamartinez.dev",
        skillsList: ["Go", "Kubernetes", "Prometheus", "Grafana", "Cloud"],
      },
    },
    {
      id: 9,
      name: "Liam Anderson",
      email: "liam.anderson@example.com",
      status: "pending",
      interviewStatus: "not_scheduled",
      assignedInterviewer: "Not Assigned",
      profilePhoto:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Liam",
        lastName: "Anderson",
        mobileNo: "+1-555-0131",
        email: "liam.anderson@example.com",
        dateOfBirth: "1997-10-03",
        gender: "Male",
      },
      education: {
        collegeName: "University of Washington",
        qualification: "M.Tech",
        department: "Cloud Computing",
        yearOfPassing: "2023",
        cgpa: "9.2",
        collegeEmail: "liam.anderson@uw.edu",
        percentage10th: "93%",
        percentage12th: "90%",
      },
      skills: {
        resumeLink: "https://example.com/liam-resume.pdf",
        gitLink: "https://github.com/liamanderson",
        linkedinLink: "https://linkedin.com/in/liamanderson",
        portfolioLink: "https://liamanderson.dev",
        skillsList: ["AWS", "Terraform", "CI/CD", "Python", "Node.js"],
      },
    },
    {
      id: 10,
      name: "Ava Thompson",
      email: "ava.thompson@example.com",
      status: "approved",
      interviewStatus: "scheduled",
      assignedInterviewer: "Rachel Adams",
      profilePhoto:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      personalDetails: {
        firstName: "Ava",
        lastName: "Thompson",
        mobileNo: "+1-555-0132",
        email: "ava.thompson@example.com",
        dateOfBirth: "1998-01-19",
        gender: "Female",
      },
      education: {
        collegeName: "Princeton University",
        qualification: "B.Tech",
        department: "Machine Learning",
        yearOfPassing: "2020",
        cgpa: "8.7",
        collegeEmail: "ava.thompson@princeton.edu",
        percentage10th: "90%",
        percentage12th: "88%",
      },
      skills: {
        resumeLink: "https://example.com/ava-resume.pdf",
        gitLink: "https://github.com/avathompson",
        linkedinLink: "https://linkedin.com/in/avathompson",
        portfolioLink: "https://avathompson.dev",
        skillsList: ["Python", "Deep Learning", "NLP", "Pytorch", "Flask"],
      },
    },
  ]);

  const totalCandidates = candidates.length;
  const approvedCount = candidates.filter(
    (c) => c.status === "approved"
  ).length;
  const pendingCount = candidates.filter((c) => c.status === "pending").length;
  const canceledCount = candidates.filter(
    (c) => c.status === "canceled"
  ).length;

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [selectedCandidateActiveTab, setSelectedCandidateActiveTab] = useState<
    "personal" | "education" | "skills"
  >("personal");

  // Filter candidates based on active tab and search query
  const filteredCandidates = useMemo(() => {
    let filtered = candidates;

    // Filter by tab
    switch (activeTab) {
      case "approved":
        filtered = candidates.filter((c) => c.status === "approved");
        break;
      case "pending":
        filtered = candidates.filter((c) => c.status === "pending");
        break;
      case "rejected":
        filtered = candidates.filter((c) => c.status === "canceled");
        break;
      case "overview":
      default:
        filtered = candidates;
        break;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.assignedInterviewer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [candidates, activeTab, searchQuery]);

  const updateCandidateStatus = (
    id: number,
    newStatus: "approved" | "pending" | "canceled"
  ) => {
    setCandidates((prev) =>
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

  const renderPersonalTab = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          First Name
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.personalDetails.firstName}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Last Name
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.personalDetails.lastName}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Mobile No
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.personalDetails.mobileNo}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Email
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.personalDetails.email}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Date of Birth
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.personalDetails.dateOfBirth}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Gender
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.personalDetails.gender}
        </p>
      </div>
    </div>
  );

  const renderEducationTab = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          College Name
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.collegeName}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Qualification
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.qualification}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Department
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.department}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Year of Passing
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.yearOfPassing}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          CGPA
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.cgpa}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          College Email
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.collegeEmail}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          10th Percentage
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.percentage10th}
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          12th Percentage
        </label>
        <p className="text-sm text-gray-900">
          {selectedCandidate?.education.percentage12th}
        </p>
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Resume Link
          </label>
          <a
            href={selectedCandidate?.skills.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            View Resume
          </a>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            GitHub Link
          </label>
          <a
            href={selectedCandidate?.skills.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            View GitHub Profile
          </a>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            LinkedIn
          </label>
          <a
            href={selectedCandidate?.skills.linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            View LinkedIn Profile
          </a>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Portfolio
          </label>
          <a
            href={selectedCandidate?.skills.portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            View Portfolio
          </a>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {selectedCandidate?.skills.skillsList.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="bg-gray-50">
      {/* Stats Cards */}

      <div className="bg-white shadow-lg px-6 py-4 rounded-lg mb-6">
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
          color="text-blue-600"
        />
        <StatCard
          title="Approved Candidates"
          value={approvedCount}
          icon={CheckCircle}
          color="text-green-600"
        />
        <StatCard
          title="Pending Candidates"
          value={pendingCount}
          icon={Clock}
          color="text-yellow-600"
        />
        <StatCard
          title="Rejected Candidates"
          value={canceledCount}
          icon={XCircle}
          color="text-red-600"
        />
      </div>

      {/* Tabs and Search */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex  items-center justify-between p-4 ">
          <div className="flex gap-3 border p-2 rounded-lg">
            <button
              onClick={() => setActiveTab("overview")}
              className={getTabButtonClasses("overview")}
            >
              <Users size={16} />
              Overview ({totalCandidates})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={getTabButtonClasses("approved")}
            >
              <CheckCircle size={16} />
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={getTabButtonClasses("pending")}
            >
              <Clock size={16} />
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={getTabButtonClasses("rejected")}
            >
              <XCircle size={16} />
              Rejected ({canceledCount})
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
        <TableContainer component={Paper} className="shadow-sm">
          <Table>
            <TableHead>
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
              {filteredCandidates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="flex items-center gap-3">
                      <div className="flex items-center">
                        {" "}
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={candidate.profilePhoto}
                          alt={candidate.name}
                        />{" "}
                        <span className="ml-2 font-medium text-gray-900">
                          {" "}
                          {candidate.name}{" "}
                        </span>{" "}
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
                        onClick={()=>setSelectedCandidate(candidate)}
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
            count={filteredCandidates.length}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>{(onClose) => <>hii</>}</ModalContent>
      </Modal>

      {/* Profile Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={selectedCandidate.profilePhoto}
                  alt={selectedCandidate.name}
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCandidate.name}
                  </h2>
                  <p className="text-gray-600 font-medium">
                    {selectedCandidate.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setSelectedCandidateActiveTab("personal")}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    selectedCandidateActiveTab === "personal"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <User size={16} />
                  Personal
                </button>
                <button
                  onClick={() => setSelectedCandidateActiveTab("education")}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    selectedCandidateActiveTab === "education"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <GraduationCap size={16} />
                  Education
                </button>
                <button
                  onClick={() => setSelectedCandidateActiveTab("skills")}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    selectedCandidateActiveTab === "skills"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Code size={16} />
                  Skills
                </button>
              </div>

              <div className="min-h-[230px]">
                {selectedCandidateActiveTab === "personal" &&
                  renderPersonalTab()}
                {selectedCandidateActiveTab === "education" &&
                  renderEducationTab()}
                {selectedCandidateActiveTab === "skills" && renderSkillsTab()}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() =>
                    updateCandidateStatus(selectedCandidate.id, "canceled")
                  }
                  className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCandidate.status === "canceled"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                  disabled={selectedCandidate.status === "canceled"}
                >
                  {selectedCandidate.status === "canceled"
                    ? "Already Rejected"
                    : "Reject"}
                </button>
                <button
                  onClick={() =>
                    updateCandidateStatus(selectedCandidate.id, "approved")
                  }
                  className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCandidate.status === "approved"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  disabled={selectedCandidate.status === "approved"}
                >
                  {selectedCandidate.status === "approved"
                    ? "Already Approved"
                    : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCandidatesPage;
