import { MenstrualPhase, PhaseInfo } from '../types/phase';

export const PHASE_INFO: Record<MenstrualPhase, PhaseInfo> = {
  menstrual: {
    title: 'Menstrual Phase',
    subtitle: 'The period phase when the uterine lining is shedding.',
    symptoms: ['Cramps', 'Fatigue', 'Lower back pain'],
    mentalHealth: ['Mood shifts', 'Irritability', 'Need for rest'],
    hormones: ['Estrogen and progesterone are low'],
  },
  follicular: {
    title: 'Follicular Phase',
    subtitle: 'The body prepares an egg for ovulation.',
    symptoms: ['Energy increase', 'Cervical mucus changes'],
    mentalHealth: ['Motivation may rise', 'Focus may improve'],
    hormones: ['Estrogen rises'],
  },
  ovulation: {
    title: 'Ovulation',
    subtitle: 'An egg is released from the ovary.',
    symptoms: ['Mild pelvic pain', 'Increased libido'],
    mentalHealth: ['Confidence may increase'],
    hormones: ['LH surge, estrogen peaks'],
  },
  luteal: {
    title: 'Luteal Phase',
    subtitle: 'The body prepares for a possible pregnancy.',
    symptoms: ['Breast tenderness', 'Bloating', 'Headaches'],
    mentalHealth: ['Mood changes', 'Stress sensitivity'],
    hormones: ['Progesterone rises, estrogen varies'],
  },
  unknown: {
    title: 'Phase Information',
    subtitle: 'Log your period to see phase-based insights.',
    symptoms: ['Not enough data yet'],
    mentalHealth: ['Not enough data yet'],
    hormones: ['Not enough data yet'],
  },
};

// CDC integration placeholder:
// Replace this static object with CDC-provided data or validated datasets.
// Example: fetchFromCDC("menstrual_health") -> map to PhaseInfo.
