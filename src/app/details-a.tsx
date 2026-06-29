import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Mascot from '../components/Mascot';
import { useLibrary } from '../context/LibraryContext';
import { getTipById, getTipCategory } from '../data/suggestions';
import { getCategoryColor } from '../theme/categories';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { Shadows } from '../theme/shadows';
import { NavBar } from './home';

export default function DetailsScreen() {
  // Hier holen wir uns die ID des geklickten Kasten ab
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isSaved, toggleTip } = useLibrary();

  const tip = getTipById(id);
  const category = getTipCategory(id);
  const liked = tip ? isSaved(tip.id) : false;
  // Detail-Karte in der Farbe der Kategorie (Hintergrund des Screens bleibt weiß).
  const c = getCategoryColor(category);

  return (
    <View style={styles.screen}>
      <View style={styles.tipWrapper}>
        {/* Maskottchen lugt oben rechts über den Rand der Karte */}
        <Mascot size={65} style={styles.tipMascot} />
        <View style={[styles.tip, { backgroundColor: c.bg, borderColor: c.bg }]}>
        {/* Kopfzeile: "Tipp:" links, Schließen-X rechts */}
        <View style={styles.topRow}>
          <Text style={[styles.tipLabel, { color: c.fg }]}>Tipp:</Text>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="close" size={28} color={c.fg} />
          </Pressable>
        </View>

        {tip ? (
          <ScrollView contentContainerStyle={styles.body}>
            <Text style={[styles.title, { color: c.fg }]}>{tip.title}</Text>
            <Text style={[styles.tipText, { color: c.fg }]}>{tip.text}</Text>
          </ScrollView>
        ) : (
          <View style={styles.body}>
            <Text style={[styles.tipText, { color: c.fg }]}>Dieser Tipp wurde nicht gefunden.</Text>
          </View>
        )}

        {/* Fußzeile: Kategorie-Pille links, Herz rechts */}
        <View style={styles.bottomRow}>
          {category ? (
            <View style={[styles.categoryPill, { borderColor: c.fg }]}>
              <Text style={[styles.categoryText, { color: c.fg }]}>{category}</Text>
            </View>
          ) : (
            <View />
          )}
          {tip && (
            <Pressable onPress={() => toggleTip(tip)} hitSlop={10}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={35} color={c.fg} />
            </Pressable>
          )}
        </View>
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
  tipWrapper: {
    height: '70%',
    width: '90%',
    alignSelf: 'center',
  },
  tipMascot: {
    position: 'absolute',
    right: 24,
    // negativer top-Wert: das Maskottchen ragt über die Kartenoberkante,
    // sein unterer Rand wird von der gefüllten Karte verdeckt (die Karte wird
    // nach dem Maskottchen gerendert und übermalt es)
    top: -54,
  },
  tip: {
    ...Shadows.card,
    flex: 1,
    borderRadius: 20,
    borderColor: Colors.borderSoft,
    borderWidth: 1,
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
    fontFamily: Fonts.display,
    marginBottom: 14,
    color: Colors.text,
  },
  tipText: {
    fontSize: 18,
    lineHeight: 26,
    color: Colors.text,
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
    borderColor: Colors.borderSoft,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
