// store/formStore.ts

import { postRequest } from "@/utils/axios/axios";
import { URL } from "@/utils/axios/endPoint";
import { create } from "zustand";

type FormData = {
  //Login States
  emailId: string;
  password: string;
  rememberMe: boolean;
};

type FormStore = FormData & {
  setData: (data: Partial<FormData>) => void;

  handleLogin: (payload: { email: string; password: string }) => any;
};

export const useLoginStore = create<FormStore>((set) => ({
  emailId: "",
  password: "",
  rememberMe: false,
  setData: (data) => set((state) => ({ ...state, ...data })),

  handleLogin: async (payload) => {
    console.log("Login Payload:", payload);
    try {
      const response = await postRequest(URL?.LOGIN, payload);
      return response;
    } catch (error) {
      console.error("Login Error:", error);
    }
  },
}));
