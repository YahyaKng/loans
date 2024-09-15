export interface RepaymentType {
  name: string;
  value: number;
}

export interface LoanOption {
  id: string;
  createdDate: string;
  name: string;
  repaymentType: RepaymentType[];
  amount: number;
  interestRate?: number;
  percentageRate?: number;
  penaltyRate: number;
}

export interface Submission {
  loan: LoanOption | null;
  userData: UserData;
  bankData: BankData;
  repaymentType: number;
  penaltyFee: number;
  installmentAmount: number;
}

export interface UserData {
  name: string;
  nationalCode: string;
}

export interface BankData {
  accountNumber: string;
}
