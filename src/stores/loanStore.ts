import { Submission } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoanStore {
  selectedLoanId: number | string | null;
  repaymentType: number | null;
  penaltyFee: number | null;
  installmentAmount: number | null;
  submissions: Submission[];
  setSelectedLoanId: (id: number | string | null) => void;
  setRepaymentData: (
    repaymentType: number | null,
    penaltyFee: number | null,
    installmentAmount: number | null
  ) => void;
  resetRepaymentData: () => void;
  addSubmission: (data: Submission) => void;
}

export const useLoanStore = create<LoanStore>()(
  persist(
    (set) => ({
      selectedLoanId: null,
      repaymentType: null,
      penaltyFee: null,
      installmentAmount: null,
      submissions: [],
      setSelectedLoanId: (id) => set({ selectedLoanId: id }),
      setRepaymentData: (repaymentType, penaltyFee, installmentAmount) =>
        set({ repaymentType, penaltyFee, installmentAmount }),
      resetRepaymentData: () =>
        set({ repaymentType: null, penaltyFee: null, installmentAmount: null }),
      addSubmission: (data) =>
        set((state) => ({ submissions: [...state.submissions, data] })),
    }),
    {
      name: "loan-store",
    }
  )
);
