export type MenstrualPhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'unknown';

export type PhaseInfo = {
  title: string;
  subtitle: string;
  symptoms: string[];
  mentalHealth: string[];
  hormones: string[];
};
