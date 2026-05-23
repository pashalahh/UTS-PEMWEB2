import React from 'react';

interface InputTextProps {
  label: string;
  nama: string;
  error?: string;
  register: any;
  placeholder?: string; 
}

export const InputText: React.FC<InputTextProps> = ({ label, nama, error, register, placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input 
        type="text" 
        {...register(nama)}
        placeholder={placeholder || label}
        className={`w-full border px-3 py-2 text-sm rounded-lg outline-none shadow-xs transition-all duration-200
          ${error 
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30" 
            : "border-gray-300 focus:border-pink-800 focus:ring-1 focus:ring-pink-800 bg-white"
          }`} 
      />
      {error && <p className="text-red-600 text-xs font-semibold mt-0.5">{error}</p>}
    </div>
  );
};

export default InputText;