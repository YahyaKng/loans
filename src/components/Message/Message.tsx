import React, { useEffect, useState } from "react";
import Typography from "@/components/Typography/Typography";

interface PopupMessageProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Message: React.FC<PopupMessageProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 rounded-md shadow-md ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
    >
      <Typography tag="p">{message}</Typography>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="absolute top-1 right-1 text-xl"
      >
        &times;
      </button>
    </div>
  );
};

export default Message;
