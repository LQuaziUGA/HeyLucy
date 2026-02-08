import { MenstrualPhase } from '../types/phase';
import { addDays, daysBetween } from './date';

export type CycleSettings = {
  cycleLength: number; // days
  periodLength: number; // days
};

export const DEFAULT_CYCLE_SETTINGS: CycleSettings = {
  cycleLength: 28,
  periodLength: 5,
};

export function getCycleDay(lastPeriodStart: Date, date: Date, cycleLength: number): number | null {
  const diff = daysBetween(lastPeriodStart, date);
  if (diff < 0) return null;
  return (diff % cycleLength) + 1;
}

export function getPhaseForDate(
  lastPeriodStart: Date,
  date: Date,
  settings: CycleSettings = DEFAULT_CYCLE_SETTINGS
): MenstrualPhase {
  const day = getCycleDay(lastPeriodStart, date, settings.cycleLength);
  if (!day) return 'unknown';

  if (day >= 1 && day <= settings.periodLength) return 'menstrual';
  if (day >= settings.periodLength + 1 && day <= 13) return 'follicular';
  if (day === 14) return 'ovulation';
  return 'luteal';
}

export function getNextPeriodStart(lastPeriodStart: Date, cycleLength: number): Date {
  return addDays(lastPeriodStart, cycleLength);
}
