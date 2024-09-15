import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import { useUserStore } from "@/stores/userStore";

interface UserBankData {
  accountNumber: string;
  iban: string;
  annualAverageBalance: string;
}

interface UserBankDataFormProps {
  onFormValid: (isValid: boolean) => void;
}

const UserBankDataForm: React.FC<UserBankDataFormProps> = ({ onFormValid }) => {
  const { bankData, setBankData } = useUserStore((state) => ({
    bankData: state.bankData,
    setBankData: state.setBankData,
  }));

  const [formData, setFormData] = useState<UserBankData>(bankData);
  const [errors, setErrors] = useState<Partial<UserBankData>>({});

  useEffect(() => {
    if (JSON.stringify(bankData) !== JSON.stringify(formData)) {
      setFormData(bankData);
    }
  }, [bankData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newErrors: Partial<UserBankData> = {};

      if (
        !formData.accountNumber ||
        !/^\d{10,16}$/.test(formData.accountNumber)
      ) {
        newErrors.accountNumber = "شماره حساب باید ۱۰ تا ۱۶ رقم باشد";
      }
      if (!formData.iban || !/^IR\d{24}$/.test(formData.iban)) {
        newErrors.iban = "شماره شبا باید با IR شروع شود و ۲۶ کاراکتر باشد";
      }
      if (
        !formData.annualAverageBalance ||
        isNaN(Number(formData.annualAverageBalance))
      ) {
        newErrors.annualAverageBalance =
          "میانگین ریالی موجودی سالیانه باید عدد باشد";
      }

      setErrors(newErrors);
      const isValid = Object.keys(newErrors).length === 0;
      onFormValid(isValid);

      if (isValid) {
        setBankData(formData);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, onFormValid, setBankData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 bg-light-white rounded-lg shadow-md"
    >
      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="accountNumber"
          className="text-light-black"
        >
          شماره حساب
        </Typography>
        <input
          id="accountNumber"
          name="accountNumber"
          type="text"
          value={formData.accountNumber}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="شماره حساب"
        />
        {errors.accountNumber && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.accountNumber}
          </Typography>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="iban"
          className="text-light-black"
        >
          شماره شبا
        </Typography>
        <input
          id="iban"
          name="iban"
          type="text"
          value={formData.iban}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="IRXXXXXXXXXXXXXX"
        />
        {errors.iban && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.iban}
          </Typography>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="annualAverageBalance"
          className="text-light-black"
        >
          میانگین ریالی موجودی سالیانه
        </Typography>
        <input
          id="annualAverageBalance"
          name="annualAverageBalance"
          type="text"
          value={formData.annualAverageBalance}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="میانگین ریالی"
        />
        {errors.annualAverageBalance && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.annualAverageBalance}
          </Typography>
        )}
      </div>
    </form>
  );
};

export default UserBankDataForm;
