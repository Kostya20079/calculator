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
import { BASIC, EXTENDED } from '../keys';
import Keypad from './Keypad';

export default function Calculator() {
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
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
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
