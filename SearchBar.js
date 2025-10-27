import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ placeholder }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" />
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});