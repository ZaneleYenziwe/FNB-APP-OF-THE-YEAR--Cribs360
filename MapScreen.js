import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

export default function MapScreen() {
  const router = useRouter();

  const [region, setRegion] = useState({
    latitude: -26.2041, // Johannesburg default
    longitude: 28.0473,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${search}&format=json`);
      const data = await response.json();
      setLoading(false);

      if (data.length === 0) {
        Alert.alert('Location not found', 'Try a different place name.');
        return;
      }

      const { lat, lon } = data[0];
      setRegion({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to search location.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* 🔍 Search Input */}
      <TextInput
        style={styles.search}
        placeholder="Search any location..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />

      {/* 🗺️ Map View */}
      <MapView style={styles.map} region={region}>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 2,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 3,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    elevation: 2,
  },
  backText: {
    fontWeight: '600',
    color: '#333',
  },
});