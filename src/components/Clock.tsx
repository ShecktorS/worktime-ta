import React from 'react';
import { useCurrentTime } from '../hooks/useTime';

const Clock: React.FC = () => {
  const { formattedTime, formattedDate } = useCurrentTime();

  return (
    <div className="text-center mb-10 p-8 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 transition-all duration-300 hover:bg-blue-500 hover:bg-opacity-10 hover:border-blue-400 hover:border-opacity-30 hover:shadow-lg hover:shadow-blue-500/20">
      <div className="text-xl opacity-80 mb-2 font-normal">
        {formattedDate}
      </div>
      <div className="text-5xl font-bold font-mono text-pink-300 drop-shadow-lg transition-colors duration-300">
        {formattedTime}
      </div>
    </div>
  );
};

export default Clock;