import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import FilterMenu from '../components/FilterMenu';
import { useLibrary } from '../context/LibraryContext';
import { getTipCategory, SortOption, sortTips } from '../data/suggestions';
import { getCategoryColor } from '../theme/categories';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';
import { NAV_BAR_SPACE, NavBar } from './home';

export default function Bibliothek() {
  const { savedTips, toggleTip } = useLibrary();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sort, setSort] = useState<SortOption>('neuste');
  const tips = sortTips(savedTips, sort);
  return (
  <View style={{flex:1}}>
  
 
{/* HEADER */}
 
<View style ={styles.headerRow}>
  <Ionicons name = "heart-outline" size ={30} color = {Colors.text}/>
 
  <Text style = {styles.header}>
    Bibliothek
    </Text>
    </View>
 
  {/* FILTER */}
  <TouchableOpacity onPress={() => setFilterVisible(true)}>
    <View style ={styles.smallIcons}>
    <Text>
      Filter
    </Text>
    <Ionicons name = "options-outline" size ={20} color = {Colors.text}/>
    </View>
  </TouchableOpacity>
  
 
{/* KARTEN */}
<ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
{savedTips.length === 0 ? (
  <Text style={styles.empty}>
    Noch keine Tipps gespeichert. Like den Tipp des Tages, um ihn hier zu sehen.
  </Text>
) : (
  tips.map((tip) => {
    const category = getTipCategory(tip.id);
    const c = getCategoryColor(category);
    return (
    <View key={tip.id} style={[styles.tipp, { backgroundColor: c.bg, borderColor: c.bg }]}>
      <Text style={[styles.cardTitel, { color: c.fg }]}>
        {tip.title}
      </Text>
      <Text style={[styles.cardText, { color: c.fg }]}>
        {tip.text}
      </Text>
      {category && (
        <View style={[styles.categoryPill, { borderColor: c.fg }]}>
          <Text style={[styles.categoryText, { color: c.fg }]}>{category}</Text>
        </View>
      )}
      <Pressable style={styles.heart} onPress={() => toggleTip(tip)}>
        <Ionicons name="heart" size={30} color={c.fg} />
      </Pressable>
    </View>
    );
  })
)}
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
};


const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    marginBottom: NAV_BAR_SPACE,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  headerRow: {
 
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
  paddingHorizontal: 30,
  marginTop: 70,
 
  },
 
  smallIcons: {
 
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginHorizontal: 20,
  marginBottom: 10,
  gap: 7,
  color: Colors.text,
  fontSize: 15,
  },
 
 
  header: {
    color : Colors.accent,
    fontWeight : 'bold',
    fontSize: 30,
  },
 
 
    tipp: {
    ...Shadows.card,
    backgroundColor: Colors.white,
    width: '90%',
    height: 300,

    borderWidth: 1,
    borderColor: Colors.borderSoft,

    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
 
  },
 
  cardTitel: {
    fontSize: 15,
    color: Colors.text,
    padding: 15,
    justifyContent: 'flex-start',
  },

  cardText: {
    fontSize: 18,
    color: Colors.text,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },

  empty: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 40,
  },

  heart: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },

  categoryPill: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },

  categoryText: {
    fontSize: 14,
    color: Colors.textMuted,
  }

});
 
