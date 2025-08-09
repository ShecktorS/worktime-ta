import React from 'react';
import { CalculationResult } from '../types';

interface ResultCardProps {
  result: CalculationResult | null;
  visible: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, visible }) => {
  if (!visible || !result) {
    return null;
  }

  return (
    <div className={`
      opacity-0 transform translate-y-5 scale-95 transition-all duration-300 ease-in-out
      ${visible ? 'opacity-100 translate-y-0 scale-100' : ''}
      grid grid-cols-1 gap-6
    `}>
      <div className="bg-gradient-to-br from-blue-500/80 to-purple-600/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-white border-opacity-20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 relative">
        <div className="text-xl font-semibold mb-5 opacity-90">
          {result.title}
        </div>
        
        {result.warning && (
          <div className="text-sm text-yellow-400 -mt-4 mb-4 font-medium">
            {result.warning}
          </div>
        )}
        
        <div className="text-4xl font-bold font-mono mb-6 text-pink-300 drop-shadow-lg">
          {result.exitTime}
        </div>
        
        <div className="grid gap-3 text-base opacity-90">
          <div className="flex justify-between items-center">
            <span>Ore da lavorare:</span>
            <span className="font-semibold text-pink-300">{result.workedTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pausa:</span>
            <span className="font-semibold text-pink-300">{result.breakTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;