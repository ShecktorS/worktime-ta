import React from 'react';
import { WorkMode, ModeButtonProps } from '../types';

const ModeButton: React.FC<ModeButtonProps> = ({ mode, label, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(mode)}
      className={`
        flex-1 max-w-[150px] p-4 text-white text-base font-medium rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out border
        ${isActive 
          ? 'bg-blue-500 border-blue-600 shadow-lg shadow-blue-500/40 transform -translate-y-0.5' 
          : 'bg-white bg-opacity-10 border-white border-opacity-20 hover:bg-blue-500 hover:bg-opacity-20 hover:border-blue-400 hover:border-opacity-40 hover:shadow-md hover:shadow-blue-500/20'
        }
      `}
    >
      {label}
    </button>
  );
};

interface ModeSelectorProps {
  selectedMode: WorkMode;
  onModeChange: (mode: WorkMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  const modes: { mode: WorkMode; label: string }[] = [
    { mode: '6h', label: '6 Ore' },
    { mode: '7h12', label: '7:12 Ore' },
    { mode: '9h', label: '9 Ore' }
  ];

  return (
    <div className="flex gap-4 mb-8 justify-center">
      {modes.map(({ mode, label }) => (
        <ModeButton
          key={mode}
          mode={mode}
          label={label}
          isActive={selectedMode === mode}
          onClick={onModeChange}
        />
      ))}
    </div>
  );
};

export default ModeSelector;