"use client";

import StatCard from "@/app/admin/components/statCard";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { Award, Calendar, CheckCircle, Target } from "lucide-react";
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Interviews"
          value={12}
          icon={Calendar}
          color="blue"
          subtitle={`Completed: ${8} • Upcoming: ${4}`}
        />

        <StatCard
          title="Total Points"
          value={840}
          icon={CheckCircle}
          color="green"
          subtitle="Cumulative Interview Points"
        />

        <StatCard
          title="Average Score"
          value={81}
          icon={Target}
          color="purple"
          subtitle="Across core skills"
        />

        <StatCard
          title="Shortlist Status"
          value={5}
          icon={Award}
          color="orange"
          subtitle="Based on interviews"
        />
      </div>
      <Tabs variant="bordered" color="primary">
        <Tab title={<div>Grid View</div>}>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 bg-gray-50 p-6 border-gray-200 shadow-lg rounded-lg">
            {sampleInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </Tab>
        <Tab title={<div>Table View</div>}>
          <Button>Table</Button>
        </Tab>
      </Tabs>
    </div>
  );
}
