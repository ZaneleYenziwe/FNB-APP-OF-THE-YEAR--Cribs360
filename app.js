import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MapScreen() {
  const { location } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      <Text style={styles.subtitle}>
        Showing results for: {location || 'All locations'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#F5F5F5',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FF6F00',
  },
});