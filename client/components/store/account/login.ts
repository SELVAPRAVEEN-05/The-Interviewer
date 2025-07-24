// store/formStore.ts

import { create } from "zustand";

type FormData = {
  //Login States
  emailId: string;
  password: string;
  rememberMe: boolean;
};

type FormStore = FormData & {
  setData: (data: Partial<FormData>) => void;
};

export const useLoginStore = create<FormStore>((set) => ({
  emailId: "",
  password: "",
  rememberMe: false,
  setData: (data) => set((state) => ({ ...state, ...data })),
}));
