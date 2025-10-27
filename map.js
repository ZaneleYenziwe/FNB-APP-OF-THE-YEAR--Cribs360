import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';

export default function MapScreen() {
  const { location } = useLocalSearchParams();
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=522f4d2e37184724a6bab2db52ce681f`
      )
        .then((res) => res.json())
        .then((data) => {
          const geo = data.results[0]?.geometry;
          if (geo) setCoords(geo);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6F00" />
        <Text style={styles.loadingText}>Loading map for {location}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {coords ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.lat,
            longitude: coords.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={{ latitude: coords.lat, longitude: coords.lng }} />
        </MapView>
      ) : (
        <Text style={styles.errorText}>Couldn’t find location: {location}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    marginTop: 12,
    color: '#F5F5F5',
    fontSize: 16,
  },
  errorText: {
    color: '#FF6F00',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});