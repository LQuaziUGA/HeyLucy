import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PhaseInfo } from '../types/phase';

type Props = {
  info: PhaseInfo;
};

export default function PhaseInsightCard({ info }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{info.title}</Text>
      <Text style={styles.subtitle}>{info.subtitle}</Text>

      <Text style={styles.section}>Common Symptoms</Text>
      <Text style={styles.body}>{info.symptoms.join(', ')}</Text>

      <Text style={styles.section}>Mental Health Effects</Text>
      <Text style={styles.body}>{info.mentalHealth.join(', ')}</Text>

      <Text style={styles.section}>Hormonal Changes</Text>
      <Text style={styles.body}>{info.hormones.join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9F5',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2320',
  },
  subtitle: {
    marginTop: 4,
    color: '#6B5E57',
  },
  section: {
    marginTop: 12,
    fontWeight: '700',
    color: '#3D332F',
  },
  body: {
    marginTop: 4,
    color: '#6B5E57',
  },
});
