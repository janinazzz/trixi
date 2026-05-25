import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
  // Hier holen wir uns die ID des geklickten Kasten ab
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View style= {{flex: 1}}>
      
      {/* 4. Der Zurück-Button Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.7}
          onPress={() => router.push('/')} // <--- Das bringt den User zurück zur index.tsx
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          <Text style={styles.backText}>Zurück</Text>
          <Ionicons name="heart" size={20} color="#f49191" />
        </TouchableOpacity>
      </View>

      {/* Inhalt der Detailseite */}
      <View style={styles.content}>
        <Text style={styles.title}>Suchergebnis Details</Text>
        <Text style={styles.subtitle}>Du hast Kasten ID: {id} geöffnet</Text>
        <Image 
          source={{ uri: 'https://media1.tenor.com/m/JhPaTIbi-KwAAAAd/dol-huh.gif' }} 
          style={styles.image}
          resizeMode="cover" // Sorgt dafür, dass das Bild den Kasten sauber ausfüllt
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30, // Inhalt startet jetzt weiter oben
    paddingHorizontal: 20,
  },
  // 3. Styles für das Internet-Bild
  image: {
    width: '100%',      // Nimmt die volle verfügbare Breite des Containers
    height: 300,        // Feste Höhe für das Bild
    borderRadius: 24,   // Schöne abgerundete Ecken passend zum Rest deiner App
    marginBottom: 24,   // Abstand zum Text darunter
    backgroundColor: '#f0f0f0', // Ein leichter Grauton, falls das Bild mal lädt
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});