import React from "react";
import { useLoanStore } from "@/stores/loanStore";
import { LoanOption } from "@/types";
import Typography from "../Typography/Typography";

interface LoanOptionsProps {
  loanData: LoanOption[];
}

const LoanOptions: React.FC<LoanOptionsProps> = ({ loanData }) => {
  const { selectedLoanId, setSelectedLoanId, setRepaymentData } = useLoanStore(
    (state) => ({
      selectedLoanId: state.selectedLoanId,
      setSelectedLoanId: state.setSelectedLoanId,
      setRepaymentData: state.setRepaymentData,
    })
  );

  const handleSelect = (loan: LoanOption) => {
    setSelectedLoanId(loan.id);

    setRepaymentData(null, null, null);
  };

  return (
    <div className="p-4 bg-light-grayLight rounded-lg shadow-md">
      <Typography
        tag="h2"
        size="lg"
        weight="bold"
        className="text-light-primary mb-4"
      >
        انتخاب وام
      </Typography>
      <ul className="space-y-4">
        {loanData.map((loan) => (
          <li
            key={loan.id}
            className="flex flex-col p-4 border border-light-gray rounded-md bg-light-white"
          >
            <label className="flex items-center text-light-black">
              <input
                type="radio"
                name="loan"
                value={loan.id}
                checked={selectedLoanId === loan.id}
                onChange={() => handleSelect(loan)}
                className="mr-3 w-4 h-4 text-light-primary border-light-gray focus:ring-light-primary"
              />
              <span className="text-light-black">
                {loan.name} - {loan.amount.toLocaleString()} تومان
              </span>
            </label>
            <ul className="ml-6 mt-2 space-y-1">
              {loan.repaymentType.map((type) => (
                <li key={type.value} className="text-light-grayDark">
                  {type.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanOptions;
