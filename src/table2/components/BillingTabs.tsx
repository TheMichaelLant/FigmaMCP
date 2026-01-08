import React from "react";
import { LINES } from "../constants/icons";

interface BillingTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "segments", label: "Segments" },
  { id: "dashboard", label: "Dashboard" },
];

const BillingTabs: React.FC<BillingTabsProps> = ({
  activeTab = "overview",
  onTabChange,
}) => {
  return (
    <div className="flex flex-col w-fit">
      {/* Tab Headers */}
      <div className="flex">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="flex-1 flex items-center justify-center p-2 cursor-pointer"
            onClick={() => onTabChange?.(tab.id)}
          >
            <span
              className={`text-base text-center font-['Manrope'] ${
                activeTab === tab.id
                  ? "font-semibold text-[#191d23]"
                  : "font-normal text-[#191d23]"
              }`}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>

      {/* Active Tab Underline */}
      <div className="relative h-0 w-[108px]">
        {activeTab === "overview" && (
          <div className="absolute inset-[-2px_0_0_0]">
            <img
              alt="Tab underline"
              className="block max-w-none size-full"
              src={LINES.UNDERLINE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingTabs;
