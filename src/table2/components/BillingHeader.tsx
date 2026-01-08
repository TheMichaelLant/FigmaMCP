import React from "react";
import { ICONS } from "../constants/icons";

interface BillingHeaderProps {
  onAddClick?: () => void;
  onDownloadClick?: () => void;
}

const BillingHeader: React.FC<BillingHeaderProps> = ({
  onAddClick,
  onDownloadClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-8">
      {/* Title and Description */}
      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-[30px] font-bold text-[#191d23] font-['Manrope'] leading-normal">
          Billing
        </h1>
        <p className="text-[18px] font-normal text-[#64748b] font-['Manrope'] leading-normal">
          Manage your billing and payment details
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="bg-[#047857] flex items-center justify-center gap-2 h-11 px-4 py-2 rounded-[4px] hover:bg-[#065f46] transition-colors"
        >
          <div className="relative size-4 overflow-hidden">
            <div className="absolute inset-[20.83%] bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]">
              <img
                alt="Plus vertical"
                className="block max-w-none size-full"
                src={ICONS.PLUS}
              />
            </div>
            <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2">
              <img
                alt="Plus horizontal"
                className="block max-w-none size-full"
                src={ICONS.PLUS_HORIZONTAL}
              />
            </div>
          </div>
          <span className="text-white text-base font-semibold font-['Manrope']">
            Add
          </span>
        </button>

        {/* Download PDF Report Button */}
        <button
          onClick={onDownloadClick}
          className="border-[1.5px] border-[#d0d5dd] border-solid flex items-center justify-center gap-2 h-11 px-3 py-2 rounded-[4px] w-[251px] hover:bg-gray-50 transition-colors"
        >
          <div className="relative size-4 overflow-hidden">
            <div className="absolute inset-[62.5%_12.5%_12.5%_12.5%]">
              <img
                alt="Download icon"
                className="block max-w-none size-full"
                src={ICONS.DOWNLOAD}
              />
            </div>
            <div className="absolute inset-[41.67%_29.17%_37.5%_29.17%]">
              <img
                alt="Download center"
                className="block max-w-none size-full"
                src={ICONS.DOWNLOAD_CENTER}
              />
            </div>
            <div className="absolute bottom-[37.5%] left-1/2 right-1/2 top-[12.5%]">
              <img
                alt="Download bottom"
                className="block max-w-none size-full"
                src={ICONS.DOWNLOAD_BOTTOM}
              />
            </div>
          </div>
          <span className="text-[#191d23] text-base font-semibold font-['Manrope']">
            Download PDF Report
          </span>
        </button>
      </div>
    </div>
  );
};

export default BillingHeader;
