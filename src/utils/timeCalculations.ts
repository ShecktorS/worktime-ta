import { WorkMode, CalculationResult } from '../types';

export const formatTime = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '--:--';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const timeStringToMinutes = (timeStr: string): number => {
  if (!timeStr) return NaN;
  const [hStr, mStr] = timeStr.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return NaN;
  return h * 60 + m;
};

export const minutesToHM = (totalMinutes: number): string => {
  if (isNaN(totalMinutes) || totalMinutes < 0) return '00:00';
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const getCurrentTimeString = (): string => {
  return formatTime(new Date());
};

export const calculateExitTime = (
  entryTime: string,
  mode: WorkMode,
  lunchBreakEnabled: boolean,
  overtimeEnabled: boolean
): CalculationResult | null => {
  if (!entryTime) return null;

  let targetWorkMinutes = 0;
  let breakMinutes = 0;
  let resultTitle = '';

  // Determine target work time and break based on mode
  switch (mode) {
    case '6h':
      targetWorkMinutes = 6 * 60;
      resultTitle = 'Giornata 6 Ore';
      break;
    case '7h12':
      targetWorkMinutes = 7 * 60 + 12; // Work is always 7h 12m
      if (lunchBreakEnabled) {
        breakMinutes = 30; // Break is added on top
        resultTitle = 'Giornata 7:12 (con Pausa)';
      } else {
        resultTitle = 'Giornata 7:12 (Estiva)';
      }
      break;
    case '9h':
      targetWorkMinutes = 9 * 60;
      if (lunchBreakEnabled) {
        breakMinutes = 30;
        resultTitle = 'Giornata 9 Ore (con Pausa)';
      } else {
        resultTitle = 'Giornata 9 Ore';
      }
      break;
  }

  // Calculate exit time
  const entrataMinutes = timeStringToMinutes(entryTime);
  if (isNaN(entrataMinutes)) return null;
  let exitTotalMinutes = entrataMinutes + targetWorkMinutes + breakMinutes;
  
  // Add overtime if toggled
  if (overtimeEnabled) {
    exitTotalMinutes += 30;
    resultTitle += ' + Straordinario';
  }

  // Meal Voucher Validation & Correction
  const minExitTimeMinutes = 16 * 60 + 15; // 16:15
  if (mode === '7h12' && lunchBreakEnabled && exitTotalMinutes < minExitTimeMinutes) {
    exitTotalMinutes = minExitTimeMinutes;
  }
  
  const exitDate = new Date();
  exitDate.setHours(Math.floor(exitTotalMinutes / 60), exitTotalMinutes % 60, 0, 0);

  return {
    exitTime: formatTime(exitDate),
    workedTime: minutesToHM(targetWorkMinutes),
    breakTime: minutesToHM(breakMinutes),
    title: resultTitle
  };
};