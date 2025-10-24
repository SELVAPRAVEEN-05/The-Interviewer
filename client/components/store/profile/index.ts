// store/profileStore.ts

import { getRequest } from "@/utils";
import { URL } from "@/utils/axios/endPoint";
import { create } from "zustand";

type AdminData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
};

type ProfileStore = AdminData & {
  getProfile: (token: string) => Promise<any>;
  setProfileData: (data: Partial<AdminData>) => void;
  resetProfile: () => void;
};

const defaultAdminData: AdminData = {
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  department: "",
  joinDate: "",
  lastLogin: "",
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  ...defaultAdminData,

  setProfileData: (data) => set((state) => ({ ...state, ...data })),

  resetProfile: () => set(defaultAdminData),

  getProfile: async (token: string) => {
    try {
      const response = await getRequest(URL?.USER_PROFILE, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
}));
