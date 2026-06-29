import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import FilterMenu from '../components/FilterMenu';
import { getSuggestions, getTipCategory, SortOption, sortTips } from '../data/suggestions';
import { getCategoryColor } from '../theme/categories';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { Shadows } from '../theme/shadows';
import { NAV_BAR_SPACE, NavBar } from './home';

export default function searchResult() {
  const { keyword } = useLocalSearchParams<{ keyword?: string }>();
  const router = useRouter();

  const heading = keyword ?? 'Suche';
  const [filterVisible, setFilterVisible] = useState(false);
  const [sort, setSort] = useState<SortOption>('neuste');
  const suggestions = sortTips(getSuggestions(keyword), sort);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultText}> Ergebnisse für "{heading}"</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={{ flexDirection: 'row', gap: 7 }}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.actionText}>Filter</Text>
          <Ionicons name="options-outline" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {suggestions.length === 0 && (
          <Text style={styles.emptyText}>
            Keine Ergebnisse für "{heading}". Versuch es mit einem anderen Stichwort.
          </Text>
        )}
        {suggestions.map((tip) => {
          // Tipp komplett in der Farbe seiner Kategorie.
          const cc = getCategoryColor(getTipCategory(tip.id));
          return (
          <TouchableOpacity
            key={tip.id}
            style={[styles.card, { backgroundColor: cc.bg, borderColor: cc.bg }]}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/details-a', params: { id: tip.id } })}
          >
            <Text style={[styles.cardTitle, { color: cc.fg }]} numberOfLines={2}>
              {tip.title}
            </Text>
            <Text style={[styles.cardPreview, { color: cc.fg }]} numberOfLines={5}>
              {tip.text}
            </Text>
          </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FilterMenu
        visible={filterVisible}
        current={sort}
        onSelect={setSort}
        onClose={() => setFilterVisible(false)}
      />

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  resultHeader: {
    paddingHorizontal: 20,
    marginTop: 70,
  },
  resultText: {
    color: Colors.text,
    fontFamily: Fonts.display,
    fontSize: 30,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 15,
    color: Colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: NAV_BAR_SPACE,
  },
  card: {
    ...Shadows.card,
    backgroundColor: Colors.background,
    width: '48%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: Colors.borderSoft,
    borderRadius: 20,
    padding: 15,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.display,
    color: Colors.text,
  },
  cardPreview: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
});
