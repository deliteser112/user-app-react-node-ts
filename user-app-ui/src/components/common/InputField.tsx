// src/components/common/InputField.tsx

import React from "react";

type InputType = "text" | "email" | "password" | "number"; // Extend as needed

interface InputFieldProps {
  label: string;
  type: InputType;
  id: string;
  placeholder?: string;
  value: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  placeholder = "",
  value,
  errorMessage,
  onChange,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
          errorMessage ? "border-red-500" : ""
        }`}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
      />
      {errorMessage && (
        <div id={`${id}-error`} className="text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputField;
