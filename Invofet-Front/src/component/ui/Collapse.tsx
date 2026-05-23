import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsProps {
  title: string;
  description: string;
}

const Collapse: React.FC<CollapsProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border border-pink-200 rounded-xl overflow-hidden mb-3 shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}

        className="p-4 bg-pink-800 flex items-center justify-between hover:bg-pink-700 transition-colors w-full text-left gap-4 cursor-pointer focus:outline-none"
      >
        <h2 className="text-base sm:text-lg font-bold text-gray-100 tracking-wide wrap-break-words flex-1">
          {title}
        </h2>
        <div className="p-1.5 bg-white/10 text-white rounded-lg shrink-0 transition-colors">
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-pink-100 text-sm sm:text-base text-gray-600 leading-relaxed break-word">
          {description}
        </div>
      )}
    </div>
  );
};

export default Collapse;