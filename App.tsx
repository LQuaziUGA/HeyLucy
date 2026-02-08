import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import { scheduleMonthlyReminder } from './src/services/notificationService';
import { parseISODate } from './src/utils/date';

export default function App() {
  const [lastPeriodStartISO, setLastPeriodStartISO] = useState<string | null>(null);

  const lastPeriodStartDate = useMemo(() => {
    if (!lastPeriodStartISO) return null;
    return parseISODate(lastPeriodStartISO);
  }, [lastPeriodStartISO]);

  const handleCompleteOnboarding = (dateISO: string) => {
    setLastPeriodStartISO(dateISO);
    scheduleMonthlyReminder(dateISO);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {!lastPeriodStartDate ? (
          <OnboardingScreen onComplete={handleCompleteOnboarding} />
        ) : (
          <CalendarScreen lastPeriodStartDate={lastPeriodStartDate} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F3F0' },
  content: { flex: 1, padding: 16 },
});
