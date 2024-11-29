import React, { ChangeEvent } from "react";

type Option = {
  id: string | number;
  label: string;
};

type SelectProps = {
  labelSelect: string;
  labelOption: string;
  options: Option[] | [];
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: string;
};

export default function Select({
  labelSelect,
  labelOption,
  options,
  value,
  onChange,
  className,
  error,
}: SelectProps) {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm text-gray-700">{labelSelect}</label>
      <select
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{labelOption}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
