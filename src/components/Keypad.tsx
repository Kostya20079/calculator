import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import type { Key } from '../keys';
import CalculatorKey from './CalculatorKey';

type KeypadProps = {
  keys: Key[][];
  onKeyPress: (label: string) => void;
  style?: StyleProp<ViewStyle>;
  isLandscape?: boolean;
};

export default function Keypad({
  keys,
  onKeyPress,
  style,
  isLandscape = false,
}: KeypadProps) {
  return (
    <View style={[styles.keypad, style]}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <CalculatorKey
              key={item.label}
              item={item}
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
