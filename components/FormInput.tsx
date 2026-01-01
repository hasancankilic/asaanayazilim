"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "@/lib/icons";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
}

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 4,
  multiline = false,
}: FormInputProps) => {
  const [focused, setFocused] = useState(false);

  const InputComponent = multiline ? "textarea" : "input";
  const inputProps = multiline
    ? { rows }
    : { type };

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-white font-medium mb-2"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <InputComponent
          {...inputProps}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 bg-white/5 border rounded-xl
            text-white placeholder:text-white/40
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
            transition-all duration-300
            ${error ? "border-red-500/50" : "border-white/20"}
            ${focused ? "bg-white/10 scale-[1.01]" : ""}
            backdrop-blur-sm
          `}
        />
        
        {/* Validation Icon */}
        {value && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;




