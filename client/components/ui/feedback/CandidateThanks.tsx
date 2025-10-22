"use client";

import React from "react";
import { Modals } from "@/components/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
};

export const CandidateThanks = ({ isOpen, onClose, message }: Props) => {
  return (
    <Modals
      isopen={isOpen}
      onClose={onClose}
      size="sm"
      ModalContents={
        <div className="p-4 flex flex-col items-center">
          <div className="text-5xl">🙏</div>
          <h3 className="text-lg font-semibold mt-2">Thanks for attending</h3>
          <p className="text-sm text-gray-600 mt-2 text-center">{message ?? "We appreciate your time. We'll get back to you soon."}</p>
        </div>
      }
      ModalFooterContent={
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      }
    />
  );
};

export default CandidateThanks;
