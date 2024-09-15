import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import { useUserStore } from "@/stores/userStore";
import {
  convertPersianNumber2English,
  isValidPersianName,
  isValidShamsiDate,
} from "@/utils/functions";
import { UserDataFormProps } from "@/types";

const UserDataForm: React.FC<UserDataFormProps> = ({ onFormValid }) => {
  const { personalData, setPersonalData } = useUserStore((state) => ({
    personalData: state.personalData,
    setPersonalData: state.setPersonalData,
  }));

  const [formData, setFormData] = useState(personalData);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    setFormData(personalData);
  }, [personalData]);

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name) newErrors.name = "نام الزامی است";
    if (!formData.lastName) newErrors.lastName = "نام خانوادگی الزامی است";
    if (!formData.name.trim() || !isValidPersianName(formData.name)) {
      newErrors.name = "نام باید شامل حروف فارسی باشد";
    }
    if (!formData.lastName.trim() || !isValidPersianName(formData.lastName)) {
      newErrors.lastName = "نام خانوادگی باید شامل حروف فارسی باشد";
    }
    if (
      !formData.nationalCode ||
      !/^\d{10}$/.test(convertPersianNumber2English(formData.nationalCode))
    )
      newErrors.nationalCode = "کد ملی باید شامل ۱۰ رقم باشد";
    if (!formData.birthDate) newErrors.birthDate = "تاریخ تولد الزامی است";
    if (!formData.birthDate.trim() || !isValidShamsiDate(formData.birthDate)) {
      newErrors.birthDate =
        "تاریخ تولد الزامی است و باید به فرمت YYYY/MM/DD و تاریخ شمسی معتبر باشد";
    }
    if (
      !formData.mobileNumber ||
      !/^09\d{9}$/.test(convertPersianNumber2English(formData.mobileNumber))
    )
      newErrors.mobileNumber =
        "شماره تماس باید با ۰۹ شروع شود و شامل ۱۱ رقم باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isValid = validateForm();
      onFormValid(isValid, formData);

      if (isValid) {
        setPersonalData(formData);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, onFormValid, setPersonalData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
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
          htmlFor="name"
          className="text-light-black"
        >
          نام
        </Typography>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="نام"
        />
        {errors.name && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.name}
          </Typography>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="lastName"
          className="text-light-black"
        >
          نام خانوادگی
        </Typography>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="نام خانوادگی"
        />
        {errors.lastName && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.lastName}
          </Typography>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="nationalCode"
          className="text-light-black"
        >
          کد ملی
        </Typography>
        <input
          id="nationalCode"
          name="nationalCode"
          type="text"
          value={convertPersianNumber2English(formData.nationalCode)}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="کد ملی"
          maxLength={10}
        />
        {errors.nationalCode && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.nationalCode}
          </Typography>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="birthDate"
          className="text-light-black"
        >
          تاریخ تولد
        </Typography>
        <input
          id="birthDate"
          name="birthDate"
          type="text"
          value={formData.birthDate}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="YYYY/MM/DD"
        />
        {errors.birthDate && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.birthDate}
          </Typography>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Typography
          tag="label"
          size="base"
          weight="semibold"
          htmlFor="mobileNumber"
          className="text-light-black"
        >
          شماره تماس
        </Typography>
        <input
          id="mobileNumber"
          name="mobileNumber"
          type="tel"
          value={convertPersianNumber2English(formData.mobileNumber)}
          onChange={handleChange}
          className="p-3 border border-light-gray rounded-md focus:ring-light-primary focus:border-light-primary"
          placeholder="شماره تماس"
          maxLength={11}
        />
        {errors.mobileNumber && (
          <Typography tag="p" className="text-red-500 text-sm">
            {errors.mobileNumber}
          </Typography>
        )}
      </div>
    </form>
  );
};

export default UserDataForm;
