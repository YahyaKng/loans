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
  bankData: UserBankData;
  repaymentType: number;
  penaltyFee: number;
  installmentAmount: number;
}

export interface UserData {
  name: string;
  nationalCode: string;
}

export interface StepsProps {
  steps: string[];
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  loading?: boolean;
  disabled?: boolean;
  type?: "primary" | "secondary" | "tertiary";
}

export interface UserBankData {
  accountNumber: string;
  iban: string;
  annualAverageBalance: string;
}

export interface UserPersonalData {
  name: string;
  lastName: string;
  nationalCode: string;
  birthDate: string;
  mobileNumber: string;
}

export interface UserDataFormProps {
  onFormValid: (isValid: boolean, data: UserPersonalData) => void;
}

export interface UserBankDataFormProps {
  onFormValid: (isValid: boolean, data: UserBankData) => void;
}
