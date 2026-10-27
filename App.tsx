import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface CalcButtonProps {
  label: string;
  onPress: (symbol: string) => void;
  flex?: number;
  isLandscape?: boolean;
}

export function CalcButton({
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

interface KeypadProps {
  keys: string[];
  columns?: number;
  onKeyPress: (symbol: string) => void;
  style?: StyleProp<ViewStyle>;
  isLandscape?: boolean;
}

export function Keypad({
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

export const BASIC = [
  'AC', '±', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '−',
  '1', '2', '3', '+',
  '0', ',', '⌫', '=',
];

export const EXTENDED = [
  '(', ')',
  'x²', '√',
  'xʸ', '1/x',
  'π', 'e',
  'ln', 'log',
];

export function Calculator() {
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

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
    <View
      style={[
        styles.container,
        landscape ? styles.containerLandscape : styles.containerPortrait,
      ]}
    >
      <StatusBar style="auto" />

      {/* Wyświetlacz kalkulatora */}
      <View
        style={[
          styles.displayContainer,
          landscape && styles.displayContainerLandscape,
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.displayScrollContent}
        >
          <Text
            style={[
              styles.displayText,
              landscape && styles.displayTextLandscape,
            ]}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {expression.length > 0 ? expression : '0'}
          </Text>
        </ScrollView>
      </View>

      {/* Kontener klawiatur: w poziomie układ wierszowy, w pionie kolumnowy */}
      <View style={landscape ? styles.rowLayout : styles.columnLayout}>
        <Keypad
          keys={BASIC}
          columns={4}
          onKeyPress={handleKeyPress}
          style={landscape ? styles.basicLandscape : styles.keypad}
          isLandscape={landscape}
        />
        {landscape && (
          <Keypad
            keys={EXTENDED}
            columns={2}
            onKeyPress={handleKeyPress}
            style={styles.extendedLandscape}
            isLandscape={landscape}
          />
        )}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      {/* W orientacji poziomej wcięcia po bokach chronią skrajne kolumny przed zasłonięciem */}
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <Calculator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  containerPortrait: {
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  containerLandscape: {
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
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
  displayContainerLandscape: {
    height: 52,
    paddingVertical: 4,
    marginBottom: 8,
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
  displayTextLandscape: {
    fontSize: 24,
  },
  columnLayout: {
    flex: 1,
  },
  rowLayout: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  basicLandscape: {
    flex: 4,
  },
  extendedLandscape: {
    flex: 2,
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
  calcButtonTextLandscape: {
    fontSize: 17,
  },
});
