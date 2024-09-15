import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  personalData: {
    firstName: string;
    lastName: string;
    nationalCode: string;
    birthDate: string;
    mobileNumber: string;
  };
  bankData: {
    accountNumber: string;
    shebaNumber: string;
    annualBalance: string;
  };
  setPersonalData: (data: Partial<UserState["personalData"]>) => void;
  setBankData: (data: Partial<UserState["bankData"]>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      personalData: {
        firstName: "",
        lastName: "",
        nationalCode: "",
        birthDate: "",
        mobileNumber: "",
      },
      bankData: {
        accountNumber: "",
        shebaNumber: "",
        annualBalance: "",
      },
      setPersonalData: (data) =>
        set((state) => ({
          personalData: { ...state.personalData, ...data },
        })),
      setBankData: (data) =>
        set((state) => ({
          bankData: { ...state.bankData, ...data },
        })),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
