import React, { useState, useMemo, useCallback, useEffect, useReducer } from 'react';
import { Utensils, Zap } from 'lucide-react';
import Header from './components/Header';
import Clock from './components/Clock';
import ModeSelector from './components/ModeSelector';
import ToggleOption from './components/ToggleOption';
import TimeInput from './components/TimeInput';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import { WorkMode, WorkTimeState } from './types';
import { calculateExitTime, timeStringToMinutes } from './utils/timeCalculations';



  const [entryTimeError, setEntryTimeError] = useState('');
  const [lunchBreakError, setLunchBreakError] = useState('');

  const handleModeChange = useCallback(
    (mode: WorkMode) => {
      dispatch({ type: 'SET_MODE', payload: mode });
    },
    [dispatch]
  );

  const handleEntryTimeChange = useCallback(
    (time: string) => {
      dispatch({ type: 'SET_ENTRY_TIME', payload: time });
    },
    [dispatch]
  );

  const handleLunchBreakChange = useCallback(
    (enabled: boolean) => {
      dispatch({ type: 'TOGGLE_LUNCH_BREAK', payload: enabled });
    },
    [dispatch]
  );

  const toggleExpertMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_EXPERT_MODE' });
  }, [dispatch]);

  const handleLunchBreakStartChange = useCallback(
    (time: string) => {
      dispatch({ type: 'SET_LUNCH_START', payload: time });
    },
    [dispatch]
  );

  const handleLunchBreakDurationChange = useCallback(
    (duration: number) => {
      dispatch({ type: 'SET_LUNCH_DURATION', payload: duration });
    },
    [dispatch]
  );

  const handleOvertimeChange = useCallback(
    (enabled: boolean) => {
      dispatch({ type: 'TOGGLE_OVERTIME', payload: enabled });
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {

    setState({
      selectedMode: '6h',
      entryTime: '',
      lunchBreakEnabled: false,
      overtimeEnabled: false,
      expertMode: false,
      lunchBreakStart: '',
      lunchBreakDuration: 30,
    });
    setEntryTimeError('');
    setLunchBreakError('');
  }, []);

  useEffect(() => {
    if (!state.entryTime) {
      setEntryTimeError('');
      return;
    }
    const isValid = /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(state.entryTime);
    setEntryTimeError(isValid ? '' : 'Orario non valido');
  }, [state.entryTime]);


  useEffect(() => {
    if (
      entryTimeError ||
      !state.expertMode ||
      !state.lunchBreakEnabled ||
      !state.lunchBreakStart
    ) {
      setLunchBreakError('');
      return;
    }
    const start = timeStringToMinutes(state.lunchBreakStart);
    const end = start + state.lunchBreakDuration;
    const entry = timeStringToMinutes(state.entryTime);
    if (start < entry) {
      setLunchBreakError('La pausa deve iniziare dopo l\'entrata');
    } else if (end > 15 * 60) {
      setLunchBreakError('La pausa deve terminare entro le 15:00');
    } else {
      setLunchBreakError('');
    }
  }, [
    state.lunchBreakStart,
    state.lunchBreakDuration,
    state.entryTime,
    state.expertMode,
    state.lunchBreakEnabled,
    entryTimeError,
  ]);

  const calculationResult = useMemo(() => {
    if (!state.entryTime || entryTimeError || lunchBreakError) return null;
    return calculateExitTime(
      state.entryTime,
      state.selectedMode,
      state.lunchBreakEnabled,
      state.overtimeEnabled,
      state.expertMode && state.lunchBreakEnabled ? state.lunchBreakDuration : undefined
    );
  }, [
    state.entryTime,
    state.selectedMode,
    state.lunchBreakEnabled,
    state.overtimeEnabled,
    state.lunchBreakDuration,
    state.expertMode,
    lunchBreakError,
    entryTimeError,
  ]);

  const showLunchBreakOption = state.selectedMode === '7h12' || state.selectedMode === '9h';
  const showResults = !!calculationResult;

  return (
    <div className={`min-h-screen text-white overflow-x-hidden relative flex justify-center items-center p-4 transition-colors duration-500 ${state.expertMode ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-700'}`}>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {state.expertMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-700/40 to-blue-500/40" />
            <div className="absolute top-0 left-1/5 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/5 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-pink-500/30" />
            <div className="absolute top-0 left-1/5 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/5 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
          </>
        )}
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <Header />

        <div className="flex justify-end mb-6">
          <button
            onClick={toggleExpertMode}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-colors"
          >
            {state.expertMode ? 'Modalità Base' : 'Modalità Esperta'}
          </button>
        </div>

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
            <div className="flex flex-col">
              <TimeInput
                id="entrata"
                label="Entrata"
                value={state.entryTime}
                onChange={handleEntryTimeChange}
              />
              {entryTimeError && (
                <span className="text-red-300 text-sm">{entryTimeError}</span>
              )}
            </div>
            {state.expertMode && state.lunchBreakEnabled && (
              <>
                <TimeInput
                  id="lunchStart"
                  label="Inizio Pausa Pranzo"
                  value={state.lunchBreakStart}
                  onChange={handleLunchBreakStartChange}
                />
                <div className="flex flex-col">
                  <label htmlFor="lunchDuration" className="font-medium mb-2">Durata Pausa (min)</label>
                  <input
                    id="lunchDuration"
                    type="number"
                    min={30}
                    max={120}
                    step={15}
                    value={state.lunchBreakDuration}
                    onChange={e => handleLunchBreakDurationChange(Number(e.target.value))}
                    className="p-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {lunchBreakError && (
                  <span className="text-red-300 text-sm">{lunchBreakError}</span>
                )}
              </>
            )}
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
            entryTimeError={entryTimeError}
          />
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
