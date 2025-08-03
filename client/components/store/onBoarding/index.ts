// store/formStore.ts

import { create } from "zustand";

type FormData = {
  // Candidate Personal
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  language: string;
  country: string;

  // Candidate Education
  college: string;
  qualification: string;
  specialization: string;
  passingYear: string;
  cgpa: string;
  tenth: string;
  twelfth: string;
  educationEmail: string;

  // Candidate Skills
  resumeFile: File | null;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: string;

  // Interviewer Fields
  interviewerName: string;
  interviewerMobile: string;
  interviewerEmail: string;
  interviewerGender: string;
  company: string;
  experience: string;
  designation: string;
  domain: string;
  interviewerProfileImage: File | null;
};

type FormStore = FormData & {
  setFormData: (data: Partial<FormData>) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  // Candidate Personal
  profilePhoto: null,
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  language: "",
  country: "",

  // Candidate Education
  college: "",
  qualification: "",
  specialization: "",
  passingYear: "",
  cgpa: "",
  tenth: "",
  twelfth: "",
  educationEmail: "",

  // Candidate Skills
  resumeFile: null,
  github: "",
  linkedin: "",
  portfolio: "",
  skills: "",

  // Interviewer Fields
  interviewerName: "",
  interviewerMobile: "",
  interviewerEmail: "",
  interviewerGender: "",
  company: "",
  experience: "",
  designation: "",
  domain: "",
  interviewerProfileImage: null,

  setFormData: (data) => set((state) => ({ ...state, ...data })),
}));
