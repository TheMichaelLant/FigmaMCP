import React from "react";

interface StatusBadgeProps {
  status: "Paid" | "Unpaid";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isPaid = status === "Paid";

  return (
    <div
      className={`flex flex-col items-start px-2.5 py-0.5 rounded-[4px] inline-flex ${
        isPaid ? "bg-[#ecfdf5]" : "bg-[#fef2f2]"
      }`}
    >
      <span
        className={`font-['Manrope'] font-semibold text-[13px] ${
          isPaid ? "text-[#064e3b]" : "text-[#991b1b]"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;
