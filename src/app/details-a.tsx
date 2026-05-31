import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLibrary } from '../context/LibraryContext';
import { getTipById, getTipCategory } from '../data/suggestions';
import { NavBar } from './home';

export default function DetailsScreen() {
  // Hier holen wir uns die ID des geklickten Kasten ab
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isSaved, toggleTip } = useLibrary();

  const tip = getTipById(id);
  const category = getTipCategory(id);
  const liked = tip ? isSaved(tip.id) : false;

  return (
    <View style={styles.screen}>
      <View style={styles.tip}>
        {/* Kopfzeile: "Tipp:" links, Schließen-X rechts */}
        <View style={styles.topRow}>
          <Text style={styles.tipLabel}>Tipp:</Text>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="close" size={28} color="black" />
          </Pressable>
        </View>

        {tip ? (
          <ScrollView contentContainerStyle={styles.body}>
            <Text style={styles.title}>{tip.title}</Text>
            <Text style={styles.tipText}>{tip.text}</Text>
          </ScrollView>
        ) : (
          <View style={styles.body}>
            <Text style={styles.tipText}>Dieser Tipp wurde nicht gefunden.</Text>
          </View>
        )}

        {/* Fußzeile: Kategorie-Pille links, Herz rechts */}
        <View style={styles.bottomRow}>
          {category ? (
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ) : (
            <View />
          )}
          {tip && (
            <Pressable onPress={() => toggleTip(tip)} hitSlop={10}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={35} color="black" />
            </Pressable>
          )}
        </View>
      </View>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  tip: {
    height: '70%',
    width: '90%',
    borderRadius: 20,
    borderColor: '#868383',
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 15,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tipLabel: {
    fontSize: 20,
  },
  body: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#1a1a1a',
  },
  tipText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#1a1a1a',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: '#868383',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  categoryText: {
    fontSize: 14,
    color: '#868383',
  },
});
