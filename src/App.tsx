import React, { useState, useMemo, useCallback } from 'react';
import { Utensils, Zap } from 'lucide-react';
import Header from './components/Header';
import Clock from './components/Clock';
import ModeSelector from './components/ModeSelector';
import ToggleOption from './components/ToggleOption';
import TimeInput from './components/TimeInput';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import { WorkMode, WorkTimeState } from './types';
import { calculateExitTime } from './utils/timeCalculations';

const App: React.FC = () => {
  const [state, setState] = useState<WorkTimeState>({
    selectedMode: '6h',
    entryTime: '',
    lunchBreakEnabled: false,
    overtimeEnabled: false,
  });

  const handleModeChange = useCallback((mode: WorkMode) => {
    setState(prev => ({ ...prev, selectedMode: mode }));
  }, []);

  const handleEntryTimeChange = useCallback((time: string) => {
    setState(prev => ({ ...prev, entryTime: time }));
  }, []);

  const handleLunchBreakChange = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, lunchBreakEnabled: enabled }));
  }, []);

  const handleOvertimeChange = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, overtimeEnabled: enabled }));
  }, []);

  const handleReset = useCallback(() => {
    setState({
      selectedMode: '6h',
      entryTime: '',
      lunchBreakEnabled: false,
      overtimeEnabled: false,
    });
  }, []);

  const calculationResult = useMemo(() => {
    return calculateExitTime(
      state.entryTime,
      state.selectedMode,
      state.lunchBreakEnabled,
      state.overtimeEnabled
    );
  }, [state.entryTime, state.selectedMode, state.lunchBreakEnabled, state.overtimeEnabled]);

  const showLunchBreakOption = state.selectedMode === '7h12' || state.selectedMode === '9h';
  const showResults = !!calculationResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white overflow-x-hidden relative flex justify-center items-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-pink-500/30" />
        <div className="absolute top-0 left-1/5 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/5 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <Header />

        <div className="bg-white bg-opacity-10 backdrop-blur-2xl rounded-3xl border border-white border-opacity-20 shadow-2xl p-8 relative overflow-hidden">
          {/* Glass card highlight effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <ModeSelector 
            selectedMode={state.selectedMode}
            onModeChange={handleModeChange}
          />
          
          <Clock />

          <ToggleOption
            id="lunchBreakToggle"
            label="Includi Pausa Pranzo"
            icon={<Utensils size={20} />}
            checked={state.lunchBreakEnabled}
            onChange={handleLunchBreakChange}
            visible={showLunchBreakOption}
          />
          
          <ToggleOption
            id="overtimeToggle"
            label="Includi straordinario"
            icon={<Zap size={20} />}
            checked={state.overtimeEnabled}
            onChange={handleOvertimeChange}
          />

          <div className="grid gap-5 mb-10">
            <TimeInput
              id="entrata"
              label="Entrata"
              value={state.entryTime}
              onChange={handleEntryTimeChange}
            />
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={handleReset}
              className="flex-1 max-w-48 p-5 border-none rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/60"
            >
              <span className="relative z-10">Reset</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 hover:translate-x-full" />
            </button>
          </div>

          <ResultCard 
            result={calculationResult}
            visible={showResults}
          />
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;