import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ListingCard({ listing }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const toggleSave = () => {
    setSaved(!saved);
    // Later: save to AsyncStorage or backend
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: listing.image || 'https://via.placeholder.com/300x180.png?text=No+Image' }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>R{listing.price}</Text>
        <Text style={styles.location}>{listing.location}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={toggleSave}>
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={24}
            color={saved ? 'red' : '#555'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/booking')}>
          <Ionicons name="calendar-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 180,
    width: '100%',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});