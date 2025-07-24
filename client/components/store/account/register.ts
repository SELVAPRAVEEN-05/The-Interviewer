// store/formStore.ts

import { create } from "zustand";

type FormData = {
  //Register States
  userName: string;
  emailId: string;
  password: string;
};

type FormStore = FormData & {
  setData: (data: Partial<FormData>) => void;
};

export const useRegisterStore = create<FormStore>((set) => ({
  userName: "",
  emailId: "",
  password: "",
  setData: (data) => set((state) => ({ ...state, ...data })),
}));
