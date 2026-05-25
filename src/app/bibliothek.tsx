import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
 
import { Ionicons } from '@expo/vector-icons';
import { NAV_BAR_SPACE, NavBar } from './home';
 
export default function Bibliothek() {
  return (
  <View style={{flex:1}}>
  
 
{/* HEADER */}
 
<View style ={styles.headerRow}>
  <Ionicons name = "heart-outline" size ={30} color = "black"/>
 
  <Text style = {styles.header}>
    Bibliothek
    </Text>
    </View>
 
  {/* FILTER */}
  <TouchableOpacity>
    <View style ={styles.smallIcons}>
    <Text>
      Filter
    </Text>
    <Ionicons name = "options-outline" size ={20} color = "black"/>
    </View>
  </TouchableOpacity>
  
 
{/* KARTEN */}
<ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
<View style ={styles.tipp}>
  <Text style = {styles.cardTitel}>
    Tipp:
  </Text>
</View>
 
<View style ={styles.tipp}>
  <Text style = {styles.cardTitel}>
    Tipp:
  </Text>
</View>
 
<View style ={styles.tipp}>
  <Text style = {styles.cardTitel}>
    Tipp:
  </Text>
</View>
 
<View style ={styles.tipp}>
  <Text style = {styles.cardTitel}>
    Tipp:
  </Text>
</View>

</ScrollView>

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
  color: 'black',
  fontSize: 15,
  },
 
 
  header: {
    color : 'black',
    fontWeight : 'bold',
    fontSize: 30,
  },
 
 
    tipp: {
    width: '90%',
    height: 300,
 
    borderWidth: 1,
    borderColor: '#868383',
 
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
 
  },
 
  cardTitel: {
    fontSize: 15,
    color: 'black',
    padding: 15,
    justifyContent: 'flex-start',
  }
 
});
 
