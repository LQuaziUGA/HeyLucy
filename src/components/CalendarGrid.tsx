import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MenstrualPhase } from '../types/phase';
import { getMonthMatrix } from '../utils/date';

const PHASE_COLORS: Record<MenstrualPhase, string> = {
  menstrual: '#F28B82',
  follicular: '#FAD9A7',
  ovulation: '#B7E1CD',
  luteal: '#AECBFA',
  unknown: '#EEE6E2',
};

type Props = {
  monthDate: Date;
  getPhase: (date: Date) => MenstrualPhase;
};

export default function CalendarGrid({ monthDate, getPhase }: Props) {
  const matrix = getMonthMatrix(monthDate);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View>
      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>
      {matrix.map((week, idx) => (
        <View key={`w-${idx}`} style={styles.weekRow}>
          {week.map((date, dayIdx) => {
            if (!date) {
              return <View key={`d-${dayIdx}`} style={styles.emptyCell} />;
            }
            const phase = getPhase(date);
            return (
              <View
                key={`d-${dayIdx}`}
                style={[styles.dayCell, { backgroundColor: PHASE_COLORS[phase] }]}
              >
                <Text style={styles.dayText}>{date.getDate()}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekDay: {
    width: 36,
    textAlign: 'center',
    color: '#7C6F68',
    fontWeight: '600',
  },
  dayCell: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: '#2B2320',
    fontWeight: '600',
  },
  emptyCell: {
    width: 36,
    height: 36,
  },
});
