import React from 'react';
import { StyleSheet, View } from 'react-native';
import KeypadProps from '../types/KeypadProps';
import CalcButton from './CalcButton';

export default function Keypad({
  keys,
  columns = 4,
  onKeyPress,
  style,
  isLandscape = false,
}: KeypadProps) {
  const rows: string[][] = [];
  for (let i = 0; i < keys.length; i += columns) {
    rows.push(keys.slice(i, i + columns));
  }

  return (
    <View style={[styles.keypad, style]}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn) => (
            <CalcButton
              key={btn}
              label={btn}
              onPress={onKeyPress}
              isLandscape={isLandscape}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    flex: 1,
    gap: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
});
