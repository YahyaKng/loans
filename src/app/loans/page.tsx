"use client";

import { useLoanStore } from "@/stores/loanStore";
import Typography from "@/components/Typography/Typography";
import { Submission } from "@/types";

const Loans = () => {
  const submissions = useLoanStore((state) => state.submissions);
  const sortedSubmissions = [...submissions].reverse();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-light-primary mb-8">
        لیست وام‌های ثبت شده
      </h1>
      {sortedSubmissions.length > 0 ? (
        <ul className="space-y-6">
          {sortedSubmissions.map((submission: Submission, index: number) => (
            <li
              key={index}
              className="p-4 border border-light-gray rounded-lg bg-light-white shadow-md"
            >
              <Typography tag="p" size="base" className="text-light-black">
                نوع وام: {submission.loan?.name || "نامشخص"}
              </Typography>
              <Typography tag="p" size="base" className="text-light-black">
                شماره حساب: {submission.bankData?.accountNumber || "نامشخص"}
              </Typography>
              <Typography tag="p" size="base" className="text-light-black">
                جریمه دیرکرد:{" "}
                {typeof submission.penaltyFee === "number"
                  ? submission.penaltyFee.toLocaleString()
                  : "نامشخص"}
              </Typography>
              <Typography tag="p" size="base" className="text-light-black">
                زمان بازپرداخت: {`${submission.repaymentType} ماهه` || "نامشخص"}
              </Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography tag="p" size="base" className="text-light-gray">
          هیچ ثبت‌نامی یافت نشد.
        </Typography>
      )}
    </div>
  );
};

export default Loans;
