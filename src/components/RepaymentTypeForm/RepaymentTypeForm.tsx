import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import { useLoanStore } from "@/stores/loanStore";
import { loanData } from "@/data/loans";

const RepaymentTypeForm: React.FC = () => {
  const {
    selectedLoanId,
    repaymentType,
    penaltyFee,
    installmentAmount,
    setRepaymentData,
  } = useLoanStore((state) => ({
    selectedLoanId: state.selectedLoanId,
    repaymentType: state.repaymentType,
    penaltyFee: state.penaltyFee,
    installmentAmount: state.installmentAmount,
    setRepaymentData: state.setRepaymentData,
  }));

  const selectedLoan = loanData.find((loan) => loan.id === selectedLoanId);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleRepaymentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(e.target.value);

    console.log("value: ", value);

    setSelectedOption(e.target.value);

    if (selectedLoan) {
      const penalty = selectedLoan.amount * (selectedLoan.penaltyRate / 100);
      const installment =
        (selectedLoan.amount +
          selectedLoan.amount * selectedLoan.interestRate) /
        value;

      setRepaymentData(value, penalty, installment);
    }
  };

  useEffect(() => {
    console.log("repa updated: ", repaymentType);
  }, [repaymentType]);

  useEffect(() => {
    console.log("installmentAmount updated: ", installmentAmount);
  }, [installmentAmount]);

  if (!selectedLoan) {
    return (
      <Typography tag="p" className="text-light-grayDark">
        لطفاً یک نوع وام را در مرحله اول انتخاب کنید.
      </Typography>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          className="text-light-primary"
        >
          نوع بازپرداخت
        </Typography>
        <select
          value={selectedOption}
          onChange={handleRepaymentTypeChange}
          className="p-3 border border-light-gray rounded-md bg-light-white text-light-black focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-light-primary"
        >
          <option value="" disabled>
            یک نوع بازپرداخت را انتخاب کنید
          </option>
          {selectedLoan.repaymentType.map((type) => (
            <option key={type.value} value={type.value}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {repaymentType !== null && (
        <>
          <div className="flex flex-col space-y-4">
            <Typography
              tag="label"
              size="base"
              weight="semibold"
              className="text-light-primary"
            >
              جریمه دیرکرد
            </Typography>
            <Typography tag="p" className="text-light-black">
              {typeof penaltyFee === "number"
                ? penaltyFee.toLocaleString()
                : "0"}
            </Typography>
          </div>

          <div className="flex flex-col space-y-4">
            <Typography
              tag="label"
              size="base"
              weight="semibold"
              className="text-light-primary"
            >
              قسط تسهیلات
            </Typography>
            <Typography tag="p" className="text-light-black">
              {typeof installmentAmount === "number"
                ? installmentAmount.toLocaleString()
                : "0"}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default RepaymentTypeForm;
