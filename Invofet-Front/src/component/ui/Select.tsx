import React from 'react';

interface SelectProps { 
  label: string; 
  nama: string; 
  register: any; 
  error?: string; 
  options: { label: string; value: string }[]; 
} 
 
export const Select: React.FC<SelectProps> = ({ 
  label, 
  nama, 
  register, 
  error, 
  options 
}) => { 
  return ( 
    <div className="flex flex-col gap-1.5 w-full"> 
      <label className="text-sm font-semibold text-gray-700">{label}</label> 
 
      <select 
        {...register(nama)} 
        className={`w-full border px-3 py-2.5 rounded-lg text-sm outline-none shadow-xs cursor-pointer transition-all duration-200 bg-white
          ${error 
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30" 
            : "border-gray-300 focus:border-pink-800 focus:ring-1 focus:ring-pink-800"
          }`}
      > 
        <option value="" className="text-gray-400">Pilih Kategori...</option> 
        {options.map((opt) => ( 
          <option key={opt.value} value={opt.value}> 
            {opt.label} 
          </option> 
        ))} 
      </select> 
 
      {error && <p className="text-red-600 text-xs font-semibold mt-0.5">{error}</p>} 
    </div> 
  ); 
}; 

export default Select;