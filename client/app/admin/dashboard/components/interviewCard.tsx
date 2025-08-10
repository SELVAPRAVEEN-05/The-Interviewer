'use client';

import React from 'react';
import { User, Clock, Video } from 'lucide-react';

type OngoingInterview = {
  id: number;
  candidateName: string;
  interviewerName: string;
  position: string;
  startTime: string;
  duration: string;
  status: 'In Progress' | 'Starting Soon' | string;
  roomId: string;
};

type UpcomingInterview = {
  id: number;
  candidateName: string;
  interviewerName: string;
  position: string;
  time: string;
  date: string;
};

type InterviewCardProps = {
  interview: OngoingInterview | UpcomingInterview;
  isOngoing?: boolean;
};

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, isOngoing = false }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
          <p className="text-sm text-gray-500">{interview.position}</p>
        </div>
      </div>
      {isOngoing && 'status' in interview && (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            interview.status === 'In Progress' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {interview.status}
        </span>
      )}
    </div>

    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center">
        <User className="h-4 w-4 mr-2" />
        <span>Interviewer: {interview.interviewerName}</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span>
          {isOngoing && 'startTime' in interview
            ? `Started at ${interview.startTime}`
            : 'time' in interview && 'date' in interview
              ? `${interview.time} - ${interview.date}`
              : ''}
        </span>
      </div>
      {isOngoing && 'roomId' in interview && (
        <div className="flex items-center">
          <Video className="h-4 w-4 mr-2" />
          <span>Room: {interview.roomId}</span>
        </div>
      )}
    </div>

    {isOngoing && (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Monitor Interview →</button>
      </div>
    )}
  </div>
);

export default InterviewCard;
