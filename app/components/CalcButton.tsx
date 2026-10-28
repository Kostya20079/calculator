import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import CalcButtonProps from '../types/CalcButtonProps';

export default function CalcButton({
  label,
  onPress,
  flex = 1,
  isLandscape = false,
}: CalcButtonProps) {
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
      <Text
        style={[
          styles.calcButtonText,
          isLandscape && styles.calcButtonTextLandscape,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  calcButtonTextLandscape: {
    fontSize: 17,
  },
});
