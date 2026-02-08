import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { parseISODate } from '../utils/date';

type Props = {
  onComplete: (dateISO: string) => void;
};

export default function OnboardingScreen({ onComplete }: Props) {
  const [input, setInput] = useState('');
  const parsed = useMemo(() => parseISODate(input), [input]);

  const onSubmit = () => {
    if (!parsed) return;
    const iso = input.trim();
    onComplete(iso);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HeyLucy!</Text>
      <Text style={styles.subtitle}>Track your cycle with clarity and care.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>First day of your last period</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="numbers-and-punctuation"
        />
        <Text style={styles.helper}>
          We use this to estimate your cycle. You can update it later.
        </Text>
        <PrimaryButton label="Continue" onPress={onSubmit} disabled={!parsed} />
      </View>

      <Text style={styles.privacy}>
        Privacy first: your data stays on your device for this MVP.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: '#2B2320' },
  subtitle: { marginTop: 8, color: '#6B5E57', fontSize: 16 },
  card: {
    marginTop: 24,
    backgroundColor: '#FFF9F5',
    padding: 20,
    borderRadius: 16,
  },
  label: { fontWeight: '700', color: '#3D332F' },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5D7D2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  helper: { marginTop: 8, color: '#7C6F68' },
  privacy: { marginTop: 16, color: '#7C6F68', fontSize: 12 },
});
