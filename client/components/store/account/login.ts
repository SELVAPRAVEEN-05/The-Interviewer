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

type LoginResponse = {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: any;
  };
};

type FormStore = FormData & {
  // Auth state
  token?: string | null;
  user?: any | null;
  isLoading: boolean;
  error?: string | null;
  setData: (data: Partial<FormData>) => void;

  handleLogin: (payload: { email: string; password: string }) => any;
};

export const useLoginStore = create<FormStore>((set) => ({
  emailId: "",
  password: "",
  rememberMe: false,
  token: null,
  user: null,
  isLoading: false,
  error: null,
  setData: (data) => set((state) => ({ ...state, ...data })),

  handleLogin: async (payload) => {
    console.log("Login Payload:", payload);
    set({ isLoading: true, error: null });
    try {
      const response = (await postRequest(URL?.LOGIN, payload)) as LoginResponse;
      // response expected shape: { success: boolean, data: { token, user }, ... }
      if (response?.success) {
        const token = response.data?.token ?? null;
        const user = response.data?.user ?? null;

        // persist token if rememberMe is true
        if ((user && token) && (typeof window !== "undefined")) {
          const remember = (typeof window !== 'undefined') ? (localStorage.getItem('rememberMe') === 'true') : false;
          // If rememberMe is managed in state, use that, otherwise persist based on stored flag
          if (remember) {
            localStorage.setItem('authToken', token);
          }
        }

        set({ token, user, isLoading: false, error: null });
      } else {
        set({ isLoading: false, error: response?.message ?? 'Login failed' });
      }

      return response;
    } catch (error: any) {
      console.error("Login Error:", error);
      const message = error?.response?.data?.message ?? error?.message ?? 'Network error';
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },
}));
