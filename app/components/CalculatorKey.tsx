import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import type { Key, KeyRole } from '../keys';

type CalculatorKeyProps = {
  item: Key;
  onPress: (label: string) => void;
  isLandscape?: boolean;
};

export default function CalculatorKey({
  item,
  onPress,
  isLandscape = false,
}: CalculatorKeyProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.key,
        ROLE_VIEW[item.role],
        { flex: item.span ?? 1 },
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(item.label)}
      accessibilityRole="button"
      accessibilityLabel={item.accessibilityLabel ?? `Klawisz ${item.label}`}
    >
      <Text
        style={[
          styles.text,
          ROLE_TEXT[item.role],
          isLandscape && styles.textLandscape,
        ]}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  key: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
  textLandscape: {
    fontSize: 17,
  },

  // Role container styles
  digitKey: {
    backgroundColor: Colors.digit.background,
    borderColor: Colors.digit.border,
  },
  operatorKey: {
    backgroundColor: Colors.operator.background,
    borderColor: Colors.operator.border,
  },
  equalsKey: {
    backgroundColor: Colors.equals.background,
    borderColor: Colors.equals.border,
  },
  clearKey: {
    backgroundColor: Colors.clear.background,
    borderColor: Colors.clear.border,
  },
  functionKey: {
    backgroundColor: Colors.function.background,
    borderColor: Colors.function.border,
  },

  // Role text styles
  digitText: {
    color: Colors.digit.text,
  },
  operatorText: {
    color: Colors.operator.text,
  },
  equalsText: {
    color: Colors.equals.text,
  },
  clearText: {
    color: Colors.clear.text,
  },
  functionText: {
    color: Colors.function.text,
  },
});

// A lookup table, not a chain of conditionals: adding a role means adding
// one entry here, and the compiler will insist that it exists.
// Declared AFTER styles - see note in lab05.md.
const ROLE_VIEW: Record<KeyRole, ViewStyle> = {
  digit: styles.digitKey,
  operator: styles.operatorKey,
  equals: styles.equalsKey,
  clear: styles.clearKey,
  function: styles.functionKey,
};

const ROLE_TEXT: Record<KeyRole, TextStyle> = {
  digit: styles.digitText,
  operator: styles.operatorText,
  equals: styles.equalsText,
  clear: styles.clearText,
  function: styles.functionText,
};
