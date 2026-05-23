import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  image?: string; 
}

export const Card = ({ children, className = "", image }: CardProps) => {
  return (
    <div      
    className={`bg-white shadow-md rounded-xl overflow-hidden border-l-8 border-pink-700 
        flex flex-col w-full max-w-sm mx-auto min-h-95
        transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {image && image.trim() !== "" && (

        <div className="w-full h-48 bg-gray-100 shrink-0 border-b border-gray-100">
          <img 
            src={image} 
            alt="Card Header" 
            className="w-full h-full object-cover" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placeholder.co/400x250?text=No+Image";
            }}
          />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between gap-3 text-gray-700">
        {children}
      </div>
        
    </div>
  );
};

export default Card;