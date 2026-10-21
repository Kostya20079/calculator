import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface CalcButtonProps {
  label: string;
  onPress: (symbol: string) => void;
}

function CalcButton({ label, onPress }: CalcButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.calcButton,
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

export default function App() {
  const [expression, setExpression] = useState('');

  const append = (symbol: string): void => {
    // Nowa wartość stringa (niemutowalna aktualizacja)
    setExpression((prev) => prev + symbol);
  };

  const buttons = ['7', '8', '9', '/'];

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

      {/* Rząd 4 przycisków rozciągających się na całą szerokość ekranu */}
      <View style={styles.row}>
        {buttons.map((btn) => (
          <CalcButton key={btn} label={btn} onPress={append} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  displayContainer: {
    minHeight: 90,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 24,
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
  row: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  calcButton: {
    flex: 1,
    minHeight: 56,
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
