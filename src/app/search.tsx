import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavBar } from './home';

const SearchBar = () => { 
    const router = useRouter();
    const [searchKeyword, setSearchKeyword] = useState('');

    return ( 
        <View style ={styles.box}>
            <TouchableOpacity onPress={() => router.push({ pathname: '/searchResult', params: { keyword: searchKeyword } })}>
                <Ionicons name="search-outline" size={20} color='#868383' style={{paddingLeft: 15}} />
            </TouchableOpacity>
            <TextInput 
                style={{paddingLeft: 20, fontSize: 15, flex: 1}} 
                placeholder="Suchen" 
                value={searchKeyword}
                onChangeText={setSearchKeyword}
            />
        </View>
    );
};

const CATEGORIES = ['Rezepte', 'Events', 'Haushalt', 'Hobbies', 'Gesundheit'];

const Categories = () => {
    const router = useRouter();
    return (
        <View style = {styles.grid}>
            {CATEGORIES.map((category) => (
                <TouchableOpacity
                    key={category}
                    style={styles.category}
                    onPress={() => router.push({ pathname: '/searchResult', params: { keyword: category } })}
                >
                    <Text style={styles.categoryText}>
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default function Search() { 
    return (
        <View style={{flex:1}}>
            <SearchBar />
            <NavBar />
            <Categories />
        </View>
    );
}

const styles = StyleSheet.create({ 
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    box:{
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#868383',
        marginTop: 70,
        marginBottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    category: { 
        width: '45%',
        height: 150,
        borderWidth: 1,
        borderColor: '#868383',
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});