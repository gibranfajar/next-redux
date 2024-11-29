import React from "react";

type InputProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "tel" | undefined;
  name?: string;
  value: string;
  ref?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
};

export default function Input({
  label,
  type,
  name,
  value,
  ref,
  onChange,
  className,
  error,
}: InputProps) {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm text-gray-700">{label}</label>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
