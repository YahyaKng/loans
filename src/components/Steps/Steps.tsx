import { StepsProps } from "@/types";
import React from "react";

const Steps: React.FC<StepsProps> = ({
  steps,
  currentStep,
  activeColor = "bg-green-500",
  inactiveColor = "bg-gray-300",
}) => {
  return (
    <div className="flex flex-col items-start space-y-4">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const dotColor = isActive ? activeColor : inactiveColor;

        return (
          <div key={index} className="flex items-center gap-x-2">
            <div
              className={`w-4 h-4 rounded-full ${dotColor} transition-colors`}
            />
            <span className={isActive ? "text-black" : "text-gray-500"}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
