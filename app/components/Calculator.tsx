import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import { BASIC, EXTENDED, Key } from '../keys';
import Keypad from './Keypad';
import { evaluate, ExpressionError } from '../../src/logic/evaluate';

function formatResult(value: number): string {
  // Round to eliminate floating point representation artifacts (e.g. 0.30000000000000004 -> 0.3)
  const rounded = Number(value.toFixed(10));
  // Replace decimal point with comma for Polish UI display
  return rounded.toString().replace('.', ',');
}

function translateError(error: ExpressionError): string {
  if (error.message === 'Division by zero') {
    return 'Nie można dzielić przez zero';
  }
  if (error.message === 'Invalid square root') {
    return 'Błąd: pierwiastek z liczby ujemnej';
  }
  if (error.message === 'Empty expression') {
    return 'Wprowadź wyrażenie';
  }
  if (error.message === 'Unclosed bracket') {
    return 'Niedomknięty nawias';
  }
  return 'Błędne wyrażenie';
}

export default function Calculator() {
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const [expression, setExpression] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyPress = (key: Key): void => {
    // Clear error message on new input
    if (errorMessage && key.role !== 'equals') {
      setErrorMessage(null);
    }

    if (key.role === 'clear' && key.label === 'AC') {
      setExpression('');
      setErrorMessage(null);
    } else if (key.role === 'clear' && key.label === '⌫') {
      setExpression((prev) => prev.slice(0, -1));
      setErrorMessage(null);
    } else if (key.label === '()') {
      setExpression((prev) => {
        const openCount = (prev.match(/\(/g) || []).length;
        const closeCount = (prev.match(/\)/g) || []).length;
        const lastChar = prev.slice(-1);

        // Jeśli mamy otwarte nawiasy i ostatni znak to cyfra, stała (π, e), ')' lub '%', to zamykamy nawias
        if (openCount > closeCount && /[0-9πe)%]/.test(lastChar)) {
          return prev + ')';
        }

        // W przeciwnym razie otwieramy nawias '('
        return prev + '(';
      });
    } else if (key.role === 'equals') {
      try {
        const result = evaluate(expression);
        setExpression(formatResult(result));
        setErrorMessage(null);
      } catch (err: unknown) {
        if (err instanceof ExpressionError) {
          setErrorMessage(translateError(err));
        } else {
          // Unexpected internal errors re-thrown so they are not masked as user errors
          throw err;
        }
      }
    } else {
      setExpression((prev) => prev + (key.value ?? key.label));
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
        {errorMessage ? (
          <Text
            style={[
              styles.errorText,
              landscape && styles.errorTextLandscape,
            ]}
            numberOfLines={1}
          >
            {errorMessage}
          </Text>
        ) : null}
      </View>

      {/* Kontener klawiatur: w poziomie układ wierszowy, w pionie kolumnowy */}
      <View style={landscape ? styles.rowLayout : styles.columnLayout}>
        <Keypad
          keys={BASIC}
          onKeyPress={handleKeyPress}
          style={landscape ? styles.basicLandscape : styles.keypad}
          isLandscape={landscape}
        />
        {landscape && (
          <Keypad
            keys={EXTENDED}
            onKeyPress={handleKeyPress}
            style={styles.extendedLandscape}
            isLandscape={landscape}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 16,
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
    color: Colors.text,
    textAlign: 'right',
    fontWeight: '500',
  },
  displayTextLandscape: {
    fontSize: 24,
  },
  errorText: {
    fontSize: 14,
    color: '#E53935',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  errorTextLandscape: {
    fontSize: 12,
    marginTop: 2,
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
});
