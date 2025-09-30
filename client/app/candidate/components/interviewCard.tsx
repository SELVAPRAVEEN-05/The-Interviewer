"use client";
import { Briefcase, Calendar, User, Video } from "lucide-react";

interface Interview {
  id?: string;
  companyLogo?: string;
  companyName: string;
  interviewerName: string;
  interviewerRole: string;
  interviewType: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  meetingLink?: string;
}


export const InterviewCard = ({ interview }: { interview: Interview }) => {
  const handleJoinNow = () => {
    if (interview.meetingLink) {
      window.open(interview.meetingLink, "_blank");
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Company Header */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
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
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {interview.companyName}
          </h3>
        </div>
      </div>

      {/* Interview Details */}
      <div className="space-y-3 mb-5">
        {/* Interviewer */}
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-5 h-5 text-gray-500" />
          <span className="font-medium">{interview.interviewerName}</span>
          <span className="text-gray-500">- {interview.interviewerRole}</span>
        </div>

        {/* Interview Type */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            Interview Type:
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {interview.interviewType}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-start gap-2 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-medium">Date & Time:</span>
            <span className="text-sm text-gray-600">
              {interview.date}, {interview.startTime} - {interview.endTime} (
              {interview.timezone})
            </span>
          </div>
        </div>

      </div>

      {/* Join Button */}
      <button
        onClick={handleJoinNow}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Video className="w-5 h-5" />
        Join Now
      </button>
    </div>
  );
};
