import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useLibrary } from '../context/LibraryContext';
import { getSuggestions } from '../data/suggestions';
import { NAV_BAR_SPACE, NavBar } from './home';

export default function searchResult() {
  const { keyword } = useLocalSearchParams<{ keyword?: string }>();
  const { isSaved, toggleTip } = useLibrary();

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

      <ScrollView contentContainerStyle={{ paddingBottom: NAV_BAR_SPACE }}>
        {suggestions.map((tip) => {
          const liked = isSaved(tip.id);
          return (
            <View key={tip.id} style={styles.card}>
              <Text style={styles.cardTitle}>{tip.title}</Text>
              <Text style={styles.cardText}>{tip.text}</Text>
              <Pressable style={styles.heart} onPress={() => toggleTip(tip)}>
                <Ionicons name={liked ? 'heart' : 'heart-outline'} size={30} color="black" />
              </Pressable>
            </View>
          );
        })}
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
  card: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#868383',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    marginTop: 8,
    marginBottom: 40,
  },
  heart: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
