import React from 'react';

interface TextareaProps { 
  label: string; 
  nama: string; 
  register: any; 
  error?: string; 
  placeholder?: string; 
} 
 
export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  nama, 
  register, 
  error, 
  placeholder 
}) => { 
  return ( 
    <div className="flex flex-col gap-1.5 w-full"> 
      <label className="text-sm font-semibold text-gray-700">{label}</label> 
 
      <textarea 
        {...register(nama)} 
        placeholder={placeholder} 
        className={`w-full border rounded-lg px-3 py-2 text-sm min-h-25 outline-none shadow-xs transition-all duration-200
          ${error 
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30" 
            : "border-gray-300 focus:border-pink-800 focus:ring-1 focus:ring-pink-800 bg-white"
          }`} 
      /> 
 
      {error && <p className="text-red-600 text-xs font-semibold mt-0.5">{error}</p>} 
    </div> 
  ); 
}; 

export default Textarea;