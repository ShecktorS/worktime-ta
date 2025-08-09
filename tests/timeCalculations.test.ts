// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert';
import { calculateExitTime } from '../src/utils/timeCalculations.js';

test('calcolo dell\'orario di uscita con pausa personalizzata', () => {
  const result = calculateExitTime('08:00', '7h12', true, false, 60);
  assert.strictEqual(result?.exitTime, '16:12');
});

test('aggiunta di 30 minuti di straordinario quando overtimeEnabled è true', () => {
  const result = calculateExitTime('09:00', '6h', false, true);
  assert.strictEqual(result?.exitTime, '15:30');
});
