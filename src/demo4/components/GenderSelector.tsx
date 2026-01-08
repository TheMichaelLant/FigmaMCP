import React from "react";

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange }) => {
  const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "non-binary", label: "Non-binary" },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        What's your gender? <span className="text-gray-400">(optional)</span>
      </label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderSelector;
