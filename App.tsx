import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface PersonCardProps {
  name: string;
}

function PersonCard({ name }: PersonCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.subText}>Zaawansowane programowanie systemów mobilnych</Text>
    </View>
  );
}

export default function App() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable
        onPress={() => setVisible(!visible)}
        style={styles.button}
        accessibilityRole="button"
      >
        <Text style={styles.buttonLabel}>{visible ? 'Hide' : 'Show'}</Text>
      </Pressable>

      {/* Renderowane warunkowo przy użyciu flagi ze stanu */}
      {visible && <PersonCard name="Konstanty Kowalski" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#0284c7',
    minHeight: 48,
    minWidth: 120,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
});
