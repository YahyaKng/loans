import { ButtonProps } from "@/types";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  type = "primary",
  children,
  className,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors duration-300";
  const typeClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
    tertiary:
      "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100 disabled:border-gray-300 disabled:text-gray-300",
  };

  return (
    <button
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-3 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
