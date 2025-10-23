// store/formStore.ts

import { postRequest } from "@/utils";
import { URL } from "@/utils/axios/endPoint";
import { create } from "zustand";
import { useRegisterStore } from "../account/register";

type FormData = {
  // Candidate Personal
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  language:string;
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
  skills: string; // comma-separated labels for UI enablement
  selectedSkillIds?: number[]; // ids to submit to API

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

  handleOnboard: () => Promise<any>;
};

export const useFormStore = create<FormStore>((set, get) => ({
  // Candidate Personal
  profilePhoto: null,
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  language:"",
  country:"",

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
  selectedSkillIds: [],

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

  handleOnboard: async () => {
    const {
      firstName,
      lastName,
      email,
      mobile,
      dob,
      gender,
      country,
      tenth,
      twelfth,
      language,
      passingYear,
      github,
      linkedin,
      specialization,
      portfolio,
      selectedSkillIds,
    } = get();
    
    // Get password from register store
    const { password } = useRegisterStore.getState();
    
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      phone: mobile,
      dob: dob+"T00:00:00.000Z",
      genderId: Number(gender),
      countryId: Number(country),
      languageId: Number(language),
      github_url: github,
      linkedin_url: linkedin,
      portfolio_url: portfolio,
      resume_url: "https://example.com/resume.pdf",
      profile_picture_url: "https://example.com/profile.jpg",
      skills: Array.isArray(selectedSkillIds) && selectedSkillIds.length
        ? selectedSkillIds.map((id) => ({ id }))
        : [],
      education: {
        instituteId: 1,
        educationLevelId: 1,
        specialization: specialization,
        year_of_passing: Number(passingYear),
      },
      sslc: {
        marks_obtained: Number(tenth),
      },
      hsl: {
        marks_obtained: Number(twelfth),
      },
    };
    try {
      const response = await postRequest(URL.CANDIDATE_ONBOARDING, payload);
      return response;
    } catch (error) {
      console.error("Error during onboarding:", error);
      throw error;
    }
  },
}));
