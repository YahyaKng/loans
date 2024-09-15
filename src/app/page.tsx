"use client";

import { useEffect, useState } from "react";
import { useLoanStore } from "@/stores/loanStore";
import { useUserStore } from "@/stores/userStore";
import Button from "@/components/Button/Button";
import LoanOptions from "@/components/LoanOptions/LoanOptions";
import RepaymentTypeForm from "@/components/RepaymentTypeForm/RepaymentTypeForm";
import Steps from "@/components/Steps/Steps";
import Typography from "@/components/Typography/Typography";
import UserBankDataForm from "@/components/UserDataForm/UserbankDataForm";
import UserDataForm from "@/components/UserDataForm/UserDataForm";
import Message from "@/components/Message/Message";
import { loanData } from "@/data/loans";
import { Submission } from "@/types";

export default function Home() {
  const addSubmission = useLoanStore((state) => state.addSubmission);
  const setSelectedLoanId = useLoanStore((state) => state.setSelectedLoanId);
  const setRepaymentData = useLoanStore((state) => state.setRepaymentData);
  const selectedLoanId = useLoanStore((state) => state.selectedLoanId);
  const repaymentType = useLoanStore((state) => state.repaymentType);
  const penaltyFee = useLoanStore((state) => state.penaltyFee);
  const installmentAmount = useLoanStore((state) => state.installmentAmount);

  const personalData = useUserStore((state) => state.personalData);
  const bankData = useUserStore((state) => state.bankData);
  const setPersonalData = useUserStore((state) => state.setPersonalData);
  const setBankData = useUserStore((state) => state.setBankData);

  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isBankFormValid, setIsBankFormValid] = useState(false);
  const [isRepaymentTypeValid, setIsRepaymentTypeValid] = useState(false);
  const [showPopup, setShowPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const stepLabels = [
    "مرحله اول: انتخاب تسهیلات",
    "مرحله دوم: اطلاعات کاربر",
    "مرحله سوم: اطلاعات حساب",
    "مرحله نهایی:‌ انتخاب نوع پرداخت تسهیلات",
  ];

  const handleSteps = () => {
    if (step < stepLabels.length) {
      setStep((prev) => prev + 1);
    } else {
      const selectedLoan = loanData.find((loan) => loan.id === selectedLoanId);
      const submission: Submission = {
        loan: selectedLoan || null,
        userData: personalData,
        bankData: bankData,
        repaymentType: repaymentType!,
        penaltyFee: penaltyFee!,
        installmentAmount: installmentAmount!,
      };

      addSubmission(submission);

      setStep(1);
      setSelectedLoanId(null);
      setPersonalData({});
      setBankData({});
      setRepaymentData(null, null, null);
      setIsFormValid(false);
      setIsBankFormValid(false);
      setIsRepaymentTypeValid(false);

      setShowPopup({ message: "فرم با موفقیت ثبت شد", type: "success" });
    }
  };

  useEffect(() => {
    const isValid =
      repaymentType !== null &&
      penaltyFee !== null &&
      installmentAmount !== null;
    setIsRepaymentTypeValid(isValid);
  }, [repaymentType, penaltyFee, installmentAmount]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <LoanOptions loanData={loanData} />;
      case 2:
        return (
          <div className="p-4">
            <Typography tag="h1" size="3xl" weight="bold" className="mb-6">
              فرم اطلاعات کاربر
            </Typography>
            <UserDataForm
              onFormValid={(isValid: boolean, data) => {
                if (isValid) {
                  setIsFormValid(true);
                  setPersonalData(data);
                }
              }}
            />
          </div>
        );
      case 3:
        return (
          <div className="p-4">
            <Typography tag="h1" size="3xl" weight="bold" className="mb-6">
              فرم اطلاعات حساب
            </Typography>
            <UserBankDataForm
              onFormValid={(isValid, data) => {
                if (isValid) {
                  setIsBankFormValid(true);
                  setBankData(data);
                }
              }}
            />
          </div>
        );
      case 4:
        return (
          <div className="p-4">
            <Typography tag="h1" size="3xl" weight="bold" className="mb-6">
              نوع پرداخت تسهیلات
            </Typography>
            <RepaymentTypeForm />
          </div>
        );
      default:
        return null;
    }
  };

  const isNextButtonDisabled = () => {
    switch (step) {
      case 2:
        return !isFormValid;
      case 3:
        return !isBankFormValid;
      case 4:
        return !isRepaymentTypeValid;
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Steps steps={stepLabels} currentStep={step} />
      <h1 className="text-2xl font-bold mb-6">انتخاب تسهیلات</h1>

      {renderStepContent()}

      <div className="flex flex-row gap-x-2 mt-4">
        <Button
          disabled={step === 1}
          onClick={() => setStep((prev) => prev - 1)}
        >
          مرحله قبل
        </Button>
        <Button disabled={isNextButtonDisabled()} onClick={handleSteps}>
          {step === stepLabels.length ? "ثبت نهایی" : "مرحله بعد"}
        </Button>
      </div>

      {showPopup && (
        <Message
          message={showPopup.message}
          type={showPopup.type}
          onClose={() => setShowPopup(null)}
        />
      )}
    </div>
  );
}
