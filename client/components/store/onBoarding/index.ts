// store/formStore.ts

import { create } from "zustand";

type FormData = {
  // Personal
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  language: string;
  country: string;

  // Education
  college: string;
  qualification: string;
  specialization: string;
  passingYear: string;
  cgpa: string;
  tenth: string;
  twelfth: string;
  educationEmail: string;

  // Skills
  resumeFile: File | null;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: string;
};

type FormStore = FormData & {
  setFormData: (data: Partial<FormData>) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  // Initial values
  profilePhoto: null,
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  language: "",
  country: "",

  college: "",
  qualification: "",
  specialization: "",
  passingYear: "",
  cgpa: "",
  tenth: "",
  twelfth: "",
  educationEmail: "",

  resumeFile: null,
  github: "",
  linkedin: "",
  portfolio: "",
  skills: "",

  setFormData: (data) => set((state) => ({ ...state, ...data })),
}));
