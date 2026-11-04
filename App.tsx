import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Calculator from './src/components/Calculator';
import { Colors } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider>
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
    backgroundColor: Colors.background,
  },
});
