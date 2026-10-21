import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Nagłówek - stała wysokość */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      {/* Obszar środkowy - zajmuje całą pozostałą przestrzeń z 3 równomiernie rozłożonymi elementami */}
      <View style={styles.content}>
        <View style={styles.box}>
          <Text style={styles.boxText}>A</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>B</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>C</Text>
        </View>
      </View>

      {/* Stopka - stała wysokość */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 70,
    backgroundColor: '#1d3557',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  box: {
    width: 70,
    height: 70,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#0369a1',
    fontSize: 22,
    fontWeight: 'bold',
  },
  footer: {
    height: 60,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
});
