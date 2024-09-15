import { UserBankData } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  personalData: {
    name: string;
    lastName: string;
    nationalCode: string;
    birthDate: string;
    mobileNumber: string;
  };
  bankData: UserBankData;
  setPersonalData: (data: Partial<UserState["personalData"]>) => void;
  setBankData: (data: Partial<UserState["bankData"]>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      personalData: {
        name: "",
        lastName: "",
        nationalCode: "",
        birthDate: "",
        mobileNumber: "",
      },
      bankData: {
        accountNumber: "",
        iban: "",
        annualAverageBalance: "",
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
