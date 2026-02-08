import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import CalendarGrid from '../components/CalendarGrid';
import PhaseInsightCard from '../components/PhaseInsightCard';
import { PHASE_INFO } from '../data/education';
import { DEFAULT_CYCLE_SETTINGS, getNextPeriodStart, getPhaseForDate } from '../utils/cycle';
import { formatISODate, formatMonthYear, startOfMonth } from '../utils/date';
import { MenstrualPhase } from '../types/phase';

type Props = {
  lastPeriodStartDate: Date;
};

export default function CalendarScreen({ lastPeriodStartDate }: Props) {
  const [monthDate, setMonthDate] = useState(() => startOfMonth(new Date()));

  const currentPhase: MenstrualPhase = useMemo(() => {
    return getPhaseForDate(lastPeriodStartDate, new Date(), DEFAULT_CYCLE_SETTINGS);
  }, [lastPeriodStartDate]);

  const nextPeriodStart = useMemo(() => {
    return getNextPeriodStart(lastPeriodStartDate, DEFAULT_CYCLE_SETTINGS.cycleLength);
  }, [lastPeriodStartDate]);

  const onPrevMonth = () => {
    const prev = new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1);
    setMonthDate(prev);
  };

  const onNextMonth = () => {
    const next = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);
    setMonthDate(next);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cycle</Text>
        <Text style={styles.subtitle}>Next estimated period: {formatISODate(nextPeriodStart)}</Text>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.monthNav}>
          <Pressable onPress={onPrevMonth} style={styles.monthButton}>
            <Text style={styles.monthButtonText}>Prev</Text>
          </Pressable>
          <Text style={styles.monthTitle}>{formatMonthYear(monthDate)}</Text>
          <Pressable onPress={onNextMonth} style={styles.monthButton}>
            <Text style={styles.monthButtonText}>Next</Text>
          </Pressable>
        </View>

        <CalendarGrid
          monthDate={monthDate}
          getPhase={(date) => getPhaseForDate(lastPeriodStartDate, date, DEFAULT_CYCLE_SETTINGS)}
        />

        <View style={styles.legend}>
          <Text style={styles.legendItem}>Menstrual</Text>
          <Text style={styles.legendItem}>Follicular</Text>
          <Text style={styles.legendItem}>Ovulation</Text>
          <Text style={styles.legendItem}>Luteal</Text>
        </View>
      </View>

      <PhaseInsightCard info={PHASE_INFO[currentPhase]} />

      <View style={styles.note}>
        <Text style={styles.noteText}>
          Educational content only. This app does not provide medical diagnosis or treatment.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#2B2320' },
  subtitle: { marginTop: 4, color: '#6B5E57' },
  calendarCard: {
    backgroundColor: '#FFF9F5',
    padding: 16,
    borderRadius: 16,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthTitle: { fontWeight: '700', color: '#3D332F' },
  monthButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#F1E3DD',
    borderRadius: 8,
  },
  monthButtonText: { color: '#3D332F', fontWeight: '600' },
  legend: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: { fontSize: 12, color: '#7C6F68' },
  note: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF1EA',
    borderRadius: 12,
  },
  noteText: { fontSize: 12, color: '#6B5E57' },
});
