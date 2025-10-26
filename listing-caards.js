import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ListingCard({ title, location, price, specs, rating, image }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.specs}>{specs}</Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 24 },
  image: { width: '100%', height: 180 },
  details: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold' },
  location: { color: '#666' },
  price: { fontWeight: 'bold', color: '#333' },
  specs: { color: '#444' },
  rating: { color: '#f39c12', marginTop: 4 },
});