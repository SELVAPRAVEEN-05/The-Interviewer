"use client";
import { Autocomplete, TextField } from "@mui/material";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  User,
  User2,
  Video,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { postRequest, getRequest } from "@/utils/axios/axios";
import { URL } from "@/utils/axios/endPoint";

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export default function CreateInterviewPage() {
  const [formData, setFormData] = useState({
    companyLogo: "",
    companyName: "",
    interviewerName: "",
    interviewerRole: "",
    interviewType: "Technical",
    interviewName: "",
    date: "",
    startTime: "",
    endTime: "",
    meetingLink: "",
    participants: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Build ISO schedule datetime from date + startTime
    const { date, startTime, interviewName } = formData as any;
    if (!date || !startTime) {
      showNotification("Please provide a date and start time.", "error");
      return;
    }

    if (!interviewName || interviewName.trim() === "") {
      showNotification("Please provide an interview name.", "error");
      return;
    }

    if (selectedCandidates.length === 0) {
      showNotification("Please select at least one candidate.", "error");
      return;
    }

    if (selectedSkills.length === 0) {
      showNotification("Please select at least one skill.", "error");
      return;
    }

    const schedule = new Date(`${date}T${startTime}`);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    // Get all selected candidate IDs
    const participantIds = selectedCandidates.map((candidate) => candidate.id);

    // Get skill IDs from selected skill names
    const skillIds = selectedSkills.map((skillName) => {
      const skill = skills.find((s) => s.name === skillName);
      return skill?.id;
    }).filter((id): id is number => id !== undefined);

    const payload = {
      schedule: schedule.toISOString(),
      type: formData.interviewType,
      name: interviewName,
      participants: participantIds,
      skill: skillIds,
    };

    setLoading(true);
    postRequest(
      URL.INTERVIEW || "api/interview",
      payload,
      {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    )
      .then((res) => {
        console.log("Interview Created:", res);
        showNotification("Interview scheduled successfully!", "success");
        // Optionally reset form or navigate
      })
      .catch((err) => {
        console.error("Failed to schedule interview:", err);
        showNotification("Failed to schedule interview. Please try again.", "error");
      })
      .finally(() => setLoading(false));
  };

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const interviewTypes = [
    "Technical",
    "HR",
    "Managerial",
    "Behavioral",
    "System Design",
  ];

  const Names = ["sanjeev", "Naveen", "David"];
  const Skills = ["Data Base", "Naveen", "David"];

  // Fetch skills from API
  useEffect(() => {

    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
        const response: any = await getRequest(URL.SKILLS || "api/skill/all");
        setSkills(response.data || response || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setSkillsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      try {
        setCandidatesLoading(true);
        const response: any = await getRequest(`${URL.CANDIDATES || "api/candidate"}?q=${searchQuery}`, {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        });
        const candidatesData = response.data?.users || response.users || [];
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setCandidatesLoading(false);
      }
    };

    fetchCandidates();
  }, [searchQuery]);
  return (
    <div className="min-h-screen">
      {/* Success/Error Popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border-2 ${popupType === "success"
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
              }`}
          >
            {popupType === "success" ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600" />
            )}
            <div className="flex-1">
              <p
                className={`font-semibold ${popupType === "success" ? "text-green-900" : "text-red-900"
                  }`}
              >
                {popupType === "success" ? "Success!" : "Error!"}
              </p>
              <p
                className={`text-sm ${popupType === "success" ? "text-green-700" : "text-red-700"
                  }`}
              >
                {popupMessage}
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className={`p-1 rounded-full hover:bg-opacity-20 transition ${popupType === "success"
                  ? "hover:bg-green-600"
                  : "hover:bg-red-600"
                }`}
            >
              <X
                className={`w-5 h-5 ${popupType === "success" ? "text-green-600" : "text-red-600"
                  }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center mb-6 justify-between bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Schedule Interviews
          </h1>
          <p className="text-gray-600">
            Create a new interview session for candidates.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 rounded-2xl shadow-lg border border-gray-300 p-8"
          >
            {/* Company Information */}
            {/* <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                Company Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Logo URL
                  </label>
                  <input
                    type="url"
                    name="companyLogo"
                    value={formData.companyLogo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="TechCorp Solutions"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>
            </div> */}

            {/* Interviewer Details */}
            {/* <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Interviewer Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interviewer Name
                  </label>
                  <input
                    type="text"
                    name="interviewerName"
                    value={formData.interviewerName}
                    onChange={handleChange}
                    placeholder="Rajesh Kumar"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interviewer Role
                  </label>
                  <input
                    type="text"
                    name="interviewerRole"
                    value={formData.interviewerRole}
                    onChange={handleChange}
                    placeholder="Senior Technical Lead"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>
            </div> */}

            {/* Interview Configuration */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Interview Configuration
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interview Type
                  </label>
                  <select
                    name="interviewType"
                    value={formData.interviewType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    required
                  >
                    {interviewTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interview Name
                  </label>
                  <input
                    type="text"
                    name="interviewName"
                    value={formData.interviewName}
                    onChange={handleChange}
                    placeholder="e.g., Backend Stack, Frontend Developer Interview"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Video className="w-4 h-4 inline mr-1" />
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleChange}
                    placeholder="https://the-codemeet.vercel.app/rooms/33"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div> */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <User2 className="w-4 h-4 inline mr-1" />
                    Add Skills
                  </label>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-all p-2">
                    <Autocomplete
                      multiple
                      freeSolo
                      options={skills.map((skill) => skill.name)}
                      value={selectedSkills}
                      onChange={(event, newValue) => {
                        setSelectedSkills(newValue);
                      }}
                      loading={skillsLoading}
                      groupBy={(option) => {
                        const skill = skills.find((s) => s.name === option);
                        return skill?.category || "Other";
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={
                            skillsLoading
                              ? "Loading skills..."
                              : "Select or type skills"
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              border: "none",
                              boxShadow: "none",
                              backgroundColor: "transparent",
                              fontSize: "0.9rem",
                              paddingY: "4px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "& .MuiInputBase-input": {
                              paddingY: "5px",
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <User2 className="w-4 h-4 inline mr-1" />
                    Add Candidates
                  </label>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-all p-2">
                    <Autocomplete
                      multiple
                      options={candidates}
                      value={selectedCandidates}
                      onChange={(event, newValue) => {
                        setSelectedCandidates(newValue as Candidate[]);
                      }}
                      loading={candidatesLoading}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") return option;
                        return `${option.first_name} ${option.last_name} (${option.email})`;
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onInputChange={(event, newInputValue) => {
                        setSearchQuery(newInputValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={
                            candidatesLoading
                              ? "Loading candidates..."
                              : "Search and select candidates"
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              border: "none",
                              boxShadow: "none",
                              backgroundColor: "transparent",
                              fontSize: "0.9rem",
                              paddingY: "4px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "& .MuiInputBase-input": {
                              paddingY: "5px",
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                {/* <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <User2 className="w-4 h-4 inline mr-1" />
                    Add Skills
                  </label>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-all p-2">
                    <Autocomplete
                      multiple
                      freeSolo
                      options={Names}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select or type names"
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              border: "none",
                              boxShadow: "none",
                              backgroundColor: "transparent",
                              fontSize: "0.9rem",
                              paddingY: "4px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "& .MuiInputBase-input": {
                              paddingY: "5px",
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                </div> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
                disabled={loading}
              >
                {loading ? "Scheduling..." : "Schedule Interview"}
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 rounded-2xl border border-gray-300 p-6 sticky top-8 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Preview
            </h3>
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-xl p-4 hover:shadow-md transition">
                <div className="flex items-start gap-4 mb-4">
                  {formData.companyLogo ? (
                    <img
                      src={formData.companyLogo}
                      alt="Company"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">
                      {formData.companyName || "Company Name"}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {formData.interviewerName || "Interviewer Name"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formData.interviewerRole || "Role"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="text-slate-700">
                      {formData.interviewType}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="text-slate-700">
                      {formData.date || "Select date"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="text-slate-700">
                      {formData.startTime || "00:00"} -{" "}
                      {formData.endTime || "00:00"}
                    </span>
                  </div>
                </div>

                {formData.meetingLink && (
                  <a
                    href={formData.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    <Video className="w-4 h-4" />
                    Join Meeting
                  </a>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> This is how candidates will see the
                  interview details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
