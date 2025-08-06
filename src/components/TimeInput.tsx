import React, { useCallback } from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { TimeInputProps } from '../types';
import { getCurrentTimeString } from '../utils/timeCalculations';

const TimeInput: React.FC<TimeInputProps> = ({ id, label, value, onChange }) => {
  const handleSetNow = useCallback(() => {
    onChange(getCurrentTimeString());
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className="flex items-center gap-6 p-5 bg-white bg-opacity-5 rounded-xl border border-white border-opacity-10 transition-all duration-300 hover:bg-blue-500 hover:bg-opacity-10 hover:border-blue-400 hover:border-opacity-30 hover:shadow-md hover:shadow-blue-500/20">
      <label htmlFor={id} className="font-medium min-w-[100px] text-base">
        {label}:
      </label>
      <input
        type="time"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-3 bg-black bg-opacity-20 border border-white border-opacity-20 rounded-lg text-white font-mono text-lg text-center transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSetNow}
          className="p-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full text-white cursor-pointer transition-all duration-200 w-8 h-8 flex items-center justify-center hover:bg-blue-500 hover:bg-opacity-30 hover:border-blue-400 hover:border-opacity-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/30"
          title="Imposta ora corrente"
        >
          <Clock size={16} />
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="p-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full text-white cursor-pointer transition-all duration-200 w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:bg-opacity-30 hover:border-red-400 hover:border-opacity-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-500/30"
          title="Cancella"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TimeInput;