import React from 'react';

interface ButtonProps { 
  label: string; 
  variant?: 'primary' | 'outline'; 
  type?: 'button' | 'submit' | 'reset'; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
} 
 
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  onClick, 
  disabled = false 
}) => { 

  const baseStyle = "px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 text-center inline-flex items-center justify-center gap-2 select-none active:scale-98 shadow-sm"; 
  
  const variants = { 
    primary: disabled 
      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border border-transparent" 
      : "bg-pink-800 text-white hover:bg-pink-700 hover:shadow-md cursor-pointer border border-transparent", 
    
    outline: disabled
      ? "border border-gray-200 text-gray-400 cursor-not-allowed shadow-none"
      : "border border-pink-800 text-pink-800 hover:bg-pink-50 cursor-pointer"
  }; 
 
  return ( 
    <button 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    > 
      {label} 
    </button> 
  ); 
}; 

export default Button;