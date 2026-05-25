import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
 
import { Ionicons } from '@expo/vector-icons';

import { usePathname, useRouter } from 'expo-router';
import { NavBar } from './home';

export default function Detail() {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style = {{flex:1}}>
   
 
    <View style ={styles.tipp}>
    <View style = {styles.tippHeader}>
 
    <Text style = {styles.cardTitel}>
    Tipp:
    </Text>
    <TouchableOpacity onPress={() => router.push('/searchResult')}>
      <Ionicons name="close-outline" size={25} color="black" />
    </TouchableOpacity>
 
    </View>
     <Pressable style={{alignSelf: 'flex-end', position: 'absolute', bottom: 15, marginRight: 15}} onPress={() => setLiked(!liked)}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={35} color='black' />
            </Pressable>
 
    </View>
 
    <NavBar />
    </View>
  );
};
 
const styles = StyleSheet.create({

  smallIcons: {
 
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 7,
  paddingRight: 15,
  color: 'black',
    fontSize: 10,
    fontWeight: 'light',
  },
 
  tipp: {
 
    width: '85%',
    height:'74%',
    marginTop: 90,
 
    borderWidth: 1,
    borderColor: '#868383',
    borderRadius: 20,
 
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
 
  },
 
  tippHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   
  },
 
  cardTitel: {
    fontSize: 15,
    fontWeight: 'light',
    color: 'black',
  },
 
  herzIconSchwarz: {
 
  position: 'absolute',
  bottom: 15,
  right: 15,
  width: 38,
  height: 38,
  },
  
});
