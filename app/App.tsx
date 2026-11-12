import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import Calculator from './components/Calculator';
import { Colors } from './constants/colors';

// SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({ duration: 400, fade: true });

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
  // SplashScreen.hideAsync();
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
