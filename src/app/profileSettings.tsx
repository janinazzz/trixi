import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavBar } from './home';

const Header = () => {
    const router = useRouter();
    return (
        <View style ={{flexDirection: 'row', gap: 20, alignItems: 'center', marginHorizontal: 30, marginTop: 70}}> 
                <Ionicons name="person-circle-outline" size={70} color = "black" />
                <Text style={styles.nameText}>Name</Text>
                <TouchableOpacity style={{flex:1, alignItems: 'flex-end'}} onPress={() => router.push('/profile')}>
                    <Ionicons name="close-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
    );
};
export default function ProfileSettings() { 
    return (
        <View style={{flex:1}}>
            <Header />
            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({ 
    nameText: {
        color : '#000000',
        fontWeight : 'bold',
        fontSize: 30,
    },

});