"use client";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";
import { postRequest } from "@/utils/axios/axios";
import { URL } from "@/utils/axios/endPoint";

export default function CreateInterviewPage() {
  const [formData, setFormData] = useState({
    companyLogo: "",
    companyName: "",
    interviewerName: "",
    interviewerRole: "",
    interviewType: "Technical",
    date: "",
    startTime: "",
    endTime: "",
    meetingLink: "",
    participants: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Build ISO schedule datetime from date + startTime
    const { date, startTime, participants } = formData as any;
    if (!date || !startTime) {
      alert("Please provide a date and start time.");
      return;
    }

    const schedule = new Date(`${date}T${startTime}`);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    // Parse participants input (comma-separated ids)
    const participantList = participants
      ? participants
          .split(",")
          .map((p: string) => p.trim())
          .filter(Boolean)
      : [];

    setLoading(true);
    postRequest(
      URL.INTERVIEW || "api/interview",
      {
        schedule,
        participants: "5387ee4b-74d9-45e7-93fa-50f08c3558ec",
      },
      {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    )
      .then((res) => {
        console.log("Interview Created:", res);
        alert("Interview scheduled successfully!");
        // Optionally reset form or navigate
      })
      .catch((err) => {
        console.error("Failed to schedule interview:", err);
        alert("Failed to schedule interview. Check console for details.");
      })
      .finally(() => setLoading(false));
  };

  const [loading, setLoading] = useState(false);

  const interviewTypes = [
    "Technical",
    "HR",
    "Managerial",
    "Behavioral",
    "System Design",
  ];

  return (
    <div className="min-h-screen">
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
            <div className="mb-8">
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
            </div>

            {/* Interviewer Details */}
            <div className="mb-8">
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
            </div>

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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Video className="w-4 h-4 inline mr-1" />
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleChange}
                    placeholder="https://zoom.us/j/example"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Participants (comma-separated user IDs)
                  </label>
                  <input
                    type="text"
                    name="participants"
                    value={formData.participants}
                    onChange={handleChange}
                    placeholder="userId1,userId2"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
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
    </div>
  );
}
