"use client";

import React, { useState } from "react";
import { Modals } from "@/components/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    positive: string;
    negative: string;
    rating: number;
  }) => void;
};

export const InterviewerFeedback = ({ isOpen, onClose, onSubmit }: Props) => {
  const [positive, setPositive] = useState("");
  const [negative, setNegative] = useState("");
  const [rating, setRating] = useState(5);

  const Stars = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => {
    return (
      <div className="flex items-center space-x-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const idx = i + 1;
          return (
            <button
              key={idx}
              onClick={() => onChange(idx)}
              className={`text-2xl transition-colors duration-150 focus:outline-none ${
                idx <= value ? "text-yellow-400" : "text-gray-400"
              }`}
              aria-label={`Rate ${idx}`}
            >
              ★
            </button>
          );
        })}
      </div>
    );
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit({ positive, negative, rating });
    onClose();
  };

  return (
    <Modals
      isopen={isOpen}
      onClose={onClose}
      size="md"
      ModalContents={
        <div className="p-2">
          <h3 className="text-lg font-semibold mb-2">Thanks for conducting the interview</h3>
          <p className="text-sm text-gray-600 mb-4">Share a quick positive note, areas to improve and a star rating.</p>

          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Positive</label>
            <textarea
              value={positive}
              onChange={(e) => setPositive(e.target.value)}
              className="w-full p-2 border rounded resize-none h-20 focus:ring-2 focus:ring-blue-300"
              placeholder="What went well? (e.g. communication, problem understanding)"
            />

            <label className="text-sm font-medium">Negative</label>
            <textarea
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
              className="w-full p-2 border rounded resize-none h-20 focus:ring-2 focus:ring-red-100"
              placeholder="What could be improved? (e.g. optimization, edge-cases)"
            />

            <div>
              <label className="text-sm font-medium">Rating</label>
              <div className="mt-2">
                <Stars value={rating} onChange={setRating} />
              </div>
            </div>
          </div>
        </div>
      }
      ModalFooterContent={
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      }
    />
  );
};

export default InterviewerFeedback;
