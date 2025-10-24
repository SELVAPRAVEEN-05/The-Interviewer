"use client";

import React, { useState, useEffect } from "react";
import { Modals } from "@/components/modal";
import { getRequest, postRequest } from "@/utils";

type Skill = {
  skillId: number;
  skillName: string;
};

type Participant = {
  id: string;
  user: {
    id: string;
    first_name: string;
  };
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    positive: string;
    negative: string;
    rating: number;
    feedbackSkills: { skillId: number; value: number }[];
    participantId: string;
  }) => void;
  interviewId: string; // 👈 Pass interviewId instead of skills/participants
};

export const InterviewerFeedback = ({ isOpen, onClose, onSubmit, interviewId }: Props) => {
  const [positive, setPositive] = useState("");
  const [negative, setNegative] = useState("");
  const [rating, setRating] = useState(5);
  const [skillValues, setSkillValues] = useState<Record<number, number>>({});
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");

  // Local state for fetched data
  const [skills, setSkills] = useState<Skill[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills and participants when modal opens
  useEffect(() => {
    if (isOpen && interviewId) {
      const fetchInterviewData = async () => {
        try {
          setLoading(true);
          setError(null);
          console.log("🔍 Fetching interview data for ID:", interviewId);
          const response: any = await getRequest(`https://codemeet-gamma.vercel.app/api/skill/interview/${interviewId}`);

          console.log("📥 API Response:", response);

          if (!response.isFailed && response.data) {
            // Extract skills
            if (response.data.skill && Array.isArray(response.data.skill)) {
              const fetchedSkills = response.data.skill.map((item: any) => ({
                skillId: item.skill.id,
                skillName: item.skill.name,
              }));
              console.log("✅ Skills loaded:", fetchedSkills);
              setSkills(fetchedSkills);
            } else {
              console.warn("⚠️ No skills found, using defaults");
              setSkills([
                { skillId: 1, skillName: "Problem Solving" },
                { skillId: 2, skillName: "Communication" },
                { skillId: 3, skillName: "System Design" },
              ]);
            }

            // Extract participants
            if (response.data.participant && response.data.participant.participants) {
              console.log("✅ Participants loaded:", response.data.participant.participants);
              setParticipants(response.data.participant.participants);
            } else {
              console.warn("⚠️ No participants found");
              setParticipants([]);
            }
          } else {
            throw new Error(response.message || "Failed to fetch interview data");
          }
        } catch (err: any) {
          console.error("❌ Error fetching interview data:", err);
          setError(err.message || "Failed to load interview data");
          // Set default skills on error
          setSkills([
            { skillId: 1, skillName: "Problem Solving" },
            { skillId: 2, skillName: "Communication" },
            { skillId: 3, skillName: "System Design" },
          ]);
          setParticipants([]);
        } finally {
          setLoading(false);
        }
      };

      fetchInterviewData();
    }
  }, [isOpen, interviewId]);

  const Stars = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => (
    <div className="flex items-center space-x-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        return (
          <button
            key={idx}
            onClick={() => onChange(idx)}
            className={`text-2xl transition-colors duration-150 focus:outline-none ${idx <= value ? "text-yellow-400" : "text-gray-400"
              }`}
            aria-label={`Rate ${idx}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );

  const handleSkillChange = (id: number, value: number) => {
    setSkillValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!selectedParticipant) {
      alert("Please select a participant to provide feedback for.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Calculate total score from skill values
      const feedbackSkills = skills.map((s) => ({
        skillId: s.skillId,
        value: skillValues[s.skillId] || 0,
      }));

      // Calculate total score (sum of all skill values)
      const totalScore = feedbackSkills.reduce((sum, skill) => sum + skill.value, 0);

      // Prepare payload matching the backend API structure
      const payload = {
        given_to_user_id: selectedParticipant,
        interviewId: interviewId,
        rating: rating,
        score: totalScore,
        positiveComment: positive,
        negativeComment: negative,
        feedbackSkills: feedbackSkills,
      };

      console.log("📤 Submitting feedback:", payload);

      // Call the feedback API
      const response: any = await postRequest("api/interview/feedback", payload);

      console.log("✅ Feedback response:", response);

      if (!response.isFailed) {
        console.log("✅ Feedback submitted successfully!");

        // Call the original onSubmit callback if provided
        if (onSubmit) {
          onSubmit({
            positive,
            negative,
            rating,
            feedbackSkills,
            participantId: selectedParticipant
          });
        }

        // Show success message
        alert("Feedback submitted successfully! Thank you for your time.");

        // Close modal
        onClose();
      } else {
        throw new Error(response.message || "Failed to submit feedback");
      }
    } catch (err: any) {
      console.error("❌ Error submitting feedback:", err);
      setError(err.message || "Failed to submit feedback. Please try again.");
      alert(`Failed to submit feedback: ${err.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modals
      isopen={isOpen}
      onClose={onClose}
      size="md"
      ModalContents={
        <div className="p-2">
          <h3 className="text-lg font-semibold mb-2">Thanks for conducting the interview</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share a quick positive note, areas to improve, skill marks, and a star rating.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading interview data...</span>
            </div>
          ) : error && !submitting ? (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <p className="text-red-700 text-sm">⚠️ {error}</p>
            </div>
          ) : null}

          {submitting && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
                <p className="text-blue-700 text-sm">Submitting your feedback...</p>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            {/* Participant Selection */}
            <div>
              <label className="text-sm font-medium">Select Participant</label>
              <select
                value={selectedParticipant}
                onChange={(e) => setSelectedParticipant(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 bg-white"
                disabled={loading || submitting}
              >
                <option value="">-- Select a participant --</option>
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.user.id}>
                    {participant.user.first_name}
                  </option>
                ))}
              </select>
            </div>

            <label className="text-sm font-medium">Positive</label>
            <textarea
              value={positive}
              onChange={(e) => setPositive(e.target.value)}
              className="w-full p-2 border rounded resize-none h-20 focus:ring-2 focus:ring-blue-300"
              placeholder="What went well? (e.g. communication, problem understanding)"
              disabled={submitting}
            />

            <label className="text-sm font-medium">Negative</label>
            <textarea
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
              className="w-full p-2 border rounded resize-none h-20 focus:ring-2 focus:ring-red-100"
              placeholder="What could be improved? (e.g. optimization, edge-cases)"
              disabled={submitting}
            />

            {/* Skill Ratings Section */}
            <div>
              <label className="text-sm font-medium">Skill Marks (0–100)</label>
              <div className="mt-2 space-y-2">
                {skills.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No skills available for this interview</p>
                ) : (
                  skills.map((skill) => (
                    <div key={skill.skillId} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{skill.skillName}</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={skillValues[skill.skillId] || ""}
                        onChange={(e) =>
                          handleSkillChange(skill.skillId, Number(e.target.value) || 0)
                        }
                        className="w-20 p-1 border rounded text-center focus:ring-2 focus:ring-blue-300"
                        disabled={submitting}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-medium">Overall Rating</label>
              <div className="mt-2">
                <Stars value={rating} onChange={submitting ? () => { } : setRating} />
              </div>
            </div>
          </div>
        </div>
      }
      ModalFooterContent={
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className={`px-4 py-2 rounded ${submitting
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            className={`px-4 py-2 rounded flex items-center ${submitting || loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
          >
            {submitting && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            )}
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      }
    />
  );
};

export default InterviewerFeedback;
