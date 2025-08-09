// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert';
import { calculateExitTime } from '../src/utils/timeCalculations.js';

test('correzione dell\'orario di uscita a 16:15 in modalità 7h12 con pausa', () => {
  const result = calculateExitTime('08:00', '7h12', true, false);
  assert.strictEqual(result?.exitTime, '16:15');
  assert.strictEqual(result?.warning, 'Uscita minima per buono pasto: 16:15');
});

test('aggiunta di 30 minuti di straordinario quando overtimeEnabled è true', () => {
  const result = calculateExitTime('09:00', '6h', false, true);
  assert.strictEqual(result?.exitTime, '15:30');
});
