import React from "react";
import { ICONS } from "../constants/icons";

interface SearchFilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue = "",
  onSearchChange,
  onFilterClick,
}) => {
  return (
    <div className="bg-[#f7f8f9] flex items-center justify-between p-3 rounded-[4px] w-full">
      {/* Search Bar */}
      <div className="bg-white border border-[#e7eaee] border-solid flex items-center gap-2 h-10 p-2 rounded-[4px] w-[425px]">
        <div className="relative size-4">
          <div className="absolute inset-[12.5%_16.67%_16.67%_12.5%]">
            <img
              alt="Search icon"
              className="block max-w-none size-full"
              src={ICONS.SEARCH}
            />
          </div>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search by invoice number, name, amount..."
          className="flex-1 font-['Manrope'] font-normal text-[15px] text-[#64748b] bg-transparent border-none outline-none placeholder:text-[#64748b]"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="bg-white flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-[4px] hover:bg-gray-50 transition-colors"
      >
        <div className="relative size-4 overflow-hidden">
          <div className="absolute inset-[12.5%_8.33%]">
            <img
              alt="Filter icon"
              className="block max-w-none size-full"
              src={ICONS.FILTER}
            />
          </div>
        </div>
        <span className="text-[#64748b] text-base font-semibold font-['Manrope']">
          Filter
        </span>
      </button>
    </div>
  );
};

export default SearchFilterBar;
