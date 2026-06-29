import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavBar } from './home';
import { getCategoryColor } from '../theme/categories';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

const SearchBar = () => {
    const router = useRouter();
    const [searchKeyword, setSearchKeyword] = useState('');

    const runSearch = () => {
        const keyword = searchKeyword.trim();
        if (!keyword) return;
        router.push({ pathname: '/searchResult', params: { keyword } });
    };

    return (
        <View style ={styles.box}>
            <TouchableOpacity onPress={runSearch}>
                <Ionicons name="search-outline" size={20} color={Colors.textMuted} style={{paddingLeft: 15}} />
            </TouchableOpacity>
            <TextInput
                style={{paddingLeft: 20, fontSize: 15, flex: 1}}
                placeholder="Suchen"
                value={searchKeyword}
                onChangeText={setSearchKeyword}
                onSubmitEditing={runSearch}
                returnKeyType="search"
            />
        </View>
    );
};

const CATEGORIES = ['Rezepte', 'Events', 'Haushalt', 'Hobbies', 'Gesundheit'];

const Categories = () => {
    const router = useRouter();
    return (
        <View style = {styles.grid}>
            {CATEGORIES.map((category) => {
                const c = getCategoryColor(category);
                return (
                <TouchableOpacity
                    key={category}
                    style={[styles.category, { backgroundColor: c.bg, borderColor: c.bg }]}
                    onPress={() => router.push({ pathname: '/searchResult', params: { keyword: category } })}
                >
                    <Text style={[styles.categoryText, { color: c.fg }]}>
                        {category}
                    </Text>
                </TouchableOpacity>
                );
            })}
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
        ...Shadows.soft,
        backgroundColor: Colors.white,
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.borderSoft,
        marginTop: 70,
        marginBottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    category: {
        ...Shadows.card,
        backgroundColor: Colors.white,
        width: '45%',
        height: 150,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
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