import React from "react";

interface PayButtonProps {
  isPaid?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const PayButton: React.FC<PayButtonProps> = ({
  isPaid = false,
  onClick,
  disabled = false,
}) => {
  const buttonClass = isPaid
    ? "bg-[#e7eaee] text-[#64748b] hover:bg-[#d0d5dd]"
    : "bg-[#047857] text-white hover:bg-[#065f46]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center h-9 px-8 py-0 rounded-[4px] overflow-hidden transition-colors ${buttonClass} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span className="font-['Manrope'] font-normal text-base text-center whitespace-nowrap">
        Pay
      </span>
    </button>
  );
};

export default PayButton;
