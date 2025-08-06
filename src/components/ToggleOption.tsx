import React from 'react';
import { ToggleOptionProps } from '../types';

const ToggleOption: React.FC<ToggleOptionProps> = ({ 
  id, 
  label, 
  icon, 
  checked, 
  onChange, 
  visible = true 
}) => {
  if (!visible) return null;

  return (
    <div className="mb-6 flex items-center justify-between gap-4 p-4 bg-black bg-opacity-10 rounded-xl">
      <label 
        htmlFor={id}
        className="cursor-pointer flex-1 text-base font-medium flex items-center gap-3 select-none"
      >
        {icon}
        {label}
      </label>
      <div className="relative inline-block w-12 h-7 flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="opacity-0 w-0 h-0 absolute"
        />
        <label
          htmlFor={id}
          className={`
            absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 block
            before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 
            before:bg-white before:transition-all before:duration-300 before:rounded-full
            ${checked 
              ? 'bg-blue-500 before:translate-x-5' 
              : 'bg-white bg-opacity-20'
            }
          `}
        />
      </div>
    </div>
  );
};

export default ToggleOption;