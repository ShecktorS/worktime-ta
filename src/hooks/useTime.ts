import { useState, useEffect } from 'react';
import { formatTime } from '../utils/timeCalculations';

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString('it-IT', options);
  };

  return {
    currentTime,
    formattedTime: formatTime(currentTime),
    formattedDate: formatCurrentDate()
  };
};