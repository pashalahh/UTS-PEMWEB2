import React, { useState } from "react";

interface InputPasswordProps {
  label: string;
  nama: string;
  error?: string;
  register: any;
  placeholder?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({ label, nama, error, register, placeholder }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1.5 mb-4 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <div className="relative w-full">
        <input 
          type={show ? "text" : "password"}  
          {...register(nama)}
          placeholder={placeholder || label}
          className={`w-full border px-3 py-2 pr-14 text-sm rounded-lg outline-none shadow-xs transition-all duration-200
            ${error 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30" 
              : "border-gray-300 focus:border-pink-800 focus:ring-1 focus:ring-pink-800 bg-white"
            }`} 
        />
        <button 
          type="button" 
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-pink-800 select-none cursor-pointer p-1 rounded transition-colors"
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      </div>
      
      {error && <p className="text-red-600 text-xs font-semibold mt-0.5">{error}</p>}
    </div>
  );
};

export default InputPassword;