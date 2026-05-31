import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { getSuggestions } from '../data/suggestions';
import { NAV_BAR_SPACE, NavBar } from './home';

export default function searchResult() {
  const { keyword } = useLocalSearchParams<{ keyword?: string }>();
  const router = useRouter();

  const heading = keyword ?? 'Suche';
  const suggestions = getSuggestions(keyword);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultText}> Ergebnisse für "{heading}"</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 7 }}>
          <Text style={styles.actionText}>Filter</Text>
          <Ionicons name="options-outline" size={20} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', gap: 7 }}>
          <Text style={styles.actionText}>Neueste</Text>
          <Ionicons name="swap-vertical-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {suggestions.length === 0 && (
          <Text style={styles.emptyText}>
            Keine Ergebnisse für "{heading}". Versuch es mit einem anderen Stichwort.
          </Text>
        )}
        {suggestions.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/details-a', params: { id: tip.id } })}
          >
            <Text style={styles.cardTitle} numberOfLines={2}>
              {tip.title}
            </Text>
            <Text style={styles.cardPreview} numberOfLines={5}>
              {tip.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    color: 'black',
    fontWeight: 'bold',
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
    color: '#000000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: NAV_BAR_SPACE,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#868383',
    borderRadius: 20,
    padding: 15,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  cardPreview: {
    fontSize: 13,
    color: '#444444',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#868383',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
});
