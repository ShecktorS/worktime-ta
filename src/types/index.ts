export type WorkMode = '6h' | '7h12' | '9h';

export interface WorkTimeState {
  selectedMode: WorkMode;
  entryTime: string;
  lunchBreakEnabled: boolean;
  overtimeEnabled: boolean;
}

export interface CalculationResult {
  exitTime: string;
  workedTime: string;
  breakTime: string;
  title: string;
  warning?: string;
}

export interface ToggleOptionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  visible?: boolean;
}

export interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface ModeButtonProps {
  mode: WorkMode;
  label: string;
  isActive: boolean;
  onClick: (mode: WorkMode) => void;
}