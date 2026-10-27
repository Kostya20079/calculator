import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface CalcButtonProps {
  label: string;
  onPress: (symbol: string) => void;
  flex?: number;
}

export function CalcButton({ label, onPress, flex = 1 }: CalcButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.calcButton,
        { flex },
        pressed && styles.calcButtonPressed,
      ]}
      onPress={() => onPress(label)}
      accessibilityRole="button"
      accessibilityLabel={`Przycisk ${label}`}
    >
      <Text style={styles.calcButtonText}>{label}</Text>
    </Pressable>
  );
}

interface KeypadProps {
  keys: string[];
  columns?: number;
  onKeyPress: (symbol: string) => void;
}

export function Keypad({ keys, columns = 4, onKeyPress }: KeypadProps) {
  const rows: string[][] = [];
  for (let i = 0; i < keys.length; i += columns) {
    rows.push(keys.slice(i, i + columns));
  }

  return (
    <View style={styles.keypad}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn) => (
            <CalcButton key={btn} label={btn} onPress={onKeyPress} />
          ))}
        </View>
      ))}
    </View>
  );
}

export const BASIC_KEYS = [
  'AC', '±', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '−',
  '1', '2', '3', '+',
  '0', ',', '⌫', '=',
];

export default function App() {
  const [expression, setExpression] = useState('');

  const handleKeyPress = (symbol: string): void => {
    if (symbol === 'AC') {
      setExpression('');
    } else if (symbol === '⌫') {
      setExpression((prev) => prev.slice(0, -1));
    } else {
      setExpression((prev) => prev + symbol);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Wyświetlacz kalkulatora */}
      <View style={styles.displayContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.displayScrollContent}
        >
          <Text
            style={styles.displayText}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {expression.length > 0 ? expression : '0'}
          </Text>
        </ScrollView>
      </View>

      {/* Pełna klawiatura kalkulatora */}
      <Keypad keys={BASIC_KEYS} columns={4} onKeyPress={handleKeyPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  displayContainer: {
    height: 90,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  displayScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 36,
    color: '#0f172a',
    textAlign: 'right',
    fontWeight: '500',
  },
  keypad: {
    flex: 1,
    gap: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  calcButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  calcButtonPressed: {
    backgroundColor: '#e2e8f0',
  },
  calcButtonText: {
    fontSize: 22,
    color: '#0f172a',
    fontWeight: '600',
  },
});
