import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { NavBar } from './home';

// 1. Interface sauber definiert
interface GridItemData {
  id: string;
}

export default function searchResult() {
  const { keyword } = useLocalSearchParams();
  const router = useRouter();

  const dummyData: GridItemData[] = [
    { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' },
    { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }, 
    { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' },
  ];

  // 2. Render-Funktion komplett korrigiert und sauber geklammert
  const renderItem: ListRenderItem<GridItemData> = ({ item }) => (
    <Pressable
      style={styles.gridItem} 
      onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
    >
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style ={styles.resultHeader}> 
        <Text style={styles.resultText}> Ergebnisse für "{ keyword }"</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={{flexDirection: 'row', gap: 7}}>
          <Text style={styles.actionText}>Filter</Text>
          <Ionicons name="options-outline" size={20} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', gap:7}}>
          <Text style={styles.actionText}>Neueste</Text>
          <Ionicons name="swap-vertical-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item: GridItemData) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{paddingBottom: 120}}
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
    color : 'black',
    fontWeight : 'bold',
    fontSize: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
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
  listContainer: {
    paddingHorizontal: 15,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  gridItem: {
    width: '47%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#868383',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

});