import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ label, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
