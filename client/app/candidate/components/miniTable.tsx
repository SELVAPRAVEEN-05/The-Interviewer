"use client";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Briefcase, Eye, History, Star } from "lucide-react";
import { useState } from "react";

export interface InterviewHistory {
  id: string;
  companyLogo?: string;
  companyName?: string;
  interviewerName?: string;
  date?: string;
  status: string;
  score?: number;
  positiveReview?: string;
  negativeReview?: string;
  rating?: number; // 0–5
}

export const InterviewMiniHistoryTable = ({
  interviews,
  onViewFeedback,
}: {
  interviews: InterviewHistory[];
  onViewFeedback?: (id: string) => void;
}) => {
  const [selected, setSelected] = useState<InterviewHistory | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 interviews per page
  const totalPages = Math.ceil(interviews.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleOpen = (interview: InterviewHistory) => {
    setSelected(interview);
    onOpen();
    if (onViewFeedback) onViewFeedback(interview.id);
  };

  // Slice data for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInterviews = interviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="overflow-hidden bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
            <History className="w-5 h-5 text-purple-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              Interview History
            </h3>
          </div>
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 shadow-md bg-gray-200 px-4 py-5 font-semibold text-gray-700 border-gray-400 rounded-lg">
          <div>Company</div>
          <div>Interviewer</div>
          <div>Date</div>
          <div>Status</div>
          <div>Score</div>
          <div>Feedback</div>
        </div>

        {/* Table Rows */}
        {currentInterviews.map((interview) => (
          <div
            key={interview.id}
            className="grid grid-cols-6 gap-4 px-4 py-3 my-5 items-center border bg-gray-100 border-gray-300 hover:bg-gray-50 rounded-lg"
          >
            {/* Company */}
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden ${
                  interview.companyLogo
                    ? ""
                    : "border border-gray-300 rounded-full"
                }`}
              >
                {interview.companyLogo ? (
                  <img
                    src={interview.companyLogo}
                    alt={interview.companyName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Briefcase className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <span className="font-medium text-gray-900 truncate">
                {interview.companyName}
              </span>
            </div>

            {/* Interviewer */}
            <div className="text-gray-900">{interview.interviewerName}</div>

            {/* Date */}
            <div className="text-gray-900">{interview.date}</div>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(
                  interview.status
                )}`}
              >
                {interview.status}
              </span>
            </div>

            {/* Score */}
            <div className="font-semibold text-gray-900">
              {interview.status !== "pending" && interview.score !== undefined
                ? `${interview.score}/100`
                : "-"}
            </div>

            {/* Feedback Button */}
            <div>
              <button
                onClick={() => handleOpen(interview)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" radius="lg">
        <ModalContent>
          {() => (
            <div className="p-6 space-y-6">
              {/* Header with company + interviewer */}
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Interview Feedback
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selected?.companyName} · Interviewer:{" "}
                  <span className="font-medium text-gray-700">
                    {selected?.interviewerName}
                  </span>
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-green-600 font-bold"> Positive:</span>
                <p className="text-green-700">
                  {selected?.positiveReview || "No positive feedback yet."}
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-red-600 font-bold">
                  Needs Improvement:
                </span>
                <p className="text-red-700">
                  {selected?.negativeReview || "No improvement points yet."}
                </p>
              </div>

              {/* Rating */}
              <div className="pt-4 border-t flex items-center gap-2">
                <span className="text-gray-700 font-medium">
                  Overall Rating:
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < (selected?.rating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
