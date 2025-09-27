// store/formStore.ts

import { postRequest } from "@/utils";
import { URL } from "@/utils/axios/endPoint";
import { create } from "zustand";

type FormData = {
  // Candidate Personal
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: any;
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

  handleOnboard: async () => {
    const { firstName, lastName, email, mobile, dob, gender, country, language,passingYear } = get();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: "securePassword123",
      phone: mobile,
      dob: dob,
      genderId: gender,
      countryId: country,
      languageId: language,
      github_url: "https://github.com/johndoe",
      linkedin_url: "https://linkedin.com/in/johndoe",
      portfolio_url: "https://johndoe.portfolio.com",
      resume_url: "https://example.com/resume.pdf",
      profile_picture_url: "https://example.com/profile.jpg",
      skills: [{ id: 1 }, { id: 2 }],
      education: {
        instituteId: 1,
        educationLevelId: 1,
        specialization: "cse",
        year_of_passing: passingYear,
      },
      sslc: {
        marks_obtained: 100,
      },
      hsl: {
        marks_obtained: 100,
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
