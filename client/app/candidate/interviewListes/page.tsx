"use client";

import { Search } from "lucide-react";
import { InterviewCard } from "../components/interviewCard";

const sampleInterviews = [
  {
    id: "1",
    companyLogo:
      "https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80",
    companyName: "TechCorp Solutions",
    interviewerName: "Rajesh Kumar",
    interviewerRole: "Senior Technical Lead",
    interviewType: "Technical",
    date: "29 Sep",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    timezone: "IST",
    mode: "Online (Zoom)",
    meetingLink: "https://zoom.us/j/example",
  },
  {
    id: "2",
    companyName: "InnovateLabs",
    interviewerName: "Priya Sharma",
    interviewerRole: "HR Manager",
    interviewType: "HR Round",
    date: "30 Sep",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    timezone: "IST",
    mode: "Online (Google Meet)",
    meetingLink: "https://meet.google.com/example",
  },
];

export default function InterviewListes() {
  return (
    <div className="min-h-full">
      <div className="flex items-center mb-6 justify-between bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Upcoming Interviews
          </h1>
          <p className="text-gray-600">
            Prepare for your upcoming interviews with these resources.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Interviews..."
            className="pl-10 pr-4 py-3 border w-[20rem] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {sampleInterviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </div>
  );
}
