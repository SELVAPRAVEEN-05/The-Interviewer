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
  interviewerGender: string; // legacy string gender
  interviewerProfileImage: File | null;

  // New / API-aligned fields
  first_name: string;
  last_name: string;
  phone: string;
  dob_iso: string; // ISO date string
  genderId: number | null;
  countryId: number | null;
  languageId: number | null;

  position: string; // id as string
  company: string; // id as string
  department: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  resume_url: string;
  profile_picture_url: string;
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

  // New API aligned defaults
  first_name: "",
  last_name: "",
  phone: "",
  dob_iso: "",
  genderId: null,
  countryId: null,
  languageId: null,

  position: "",
  department: "",
  github_url: "",
  linkedin_url: "",
  portfolio_url: "",
  resume_url: "",
  profile_picture_url: "",

  setFormData: (data) => set((state) => ({ ...state, ...data })),
}));
