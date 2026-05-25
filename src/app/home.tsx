import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Greeting = () => { 
     const { name } = useLocalSearchParams();
    return (
        <Text style={styles.greeting}>
            hey { name }!
            </Text>
    );
};

export const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    // skip if we're already on the tab, otherwise push re-animates the same screen
    const go = (path: '/home' | '/search' | '/bibliothek') => {
        if (pathname !== path) {
            router.navigate(path);
        }
    };

    return (
        <View style={styles.navBar}>
         <Pressable onPress={() => go('/search')}>
            <Ionicons name={pathname === '/search' ? 'search' : 'search-outline'} size={38} color="black" />
        </Pressable>
        <Pressable onPress={() => go('/home')}>
            <Ionicons name={pathname === '/home' ? 'home' : 'home-outline'} size={38} color="black" />
        </Pressable>

        <Pressable onPress={() => go('/bibliothek')}>
            <Ionicons name={pathname === '/bibliothek' ? 'heart' : 'heart-outline'} size={38} color="black" />
        </Pressable>

        </View>

    );
};

const TipOfTheDay =() => { 
    const [liked, setLiked] = useState(false);
    return ( 
        <View style={styles.tip}> 
            <Text style={{fontSize: 15, fontWeight: 'regular', padding: 15}}>
                Tipp des Tages:
            </Text>
            <Pressable style={{alignSelf: 'flex-end', position: 'absolute', bottom: 15, marginRight: 15}} onPress={() => setLiked(!liked)}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={35} color='black' />
            </Pressable>
        </View>

    );
};


export default function Home() {
     const router = useRouter();
    return (
        <> 
        <View style={{ flex: 1}}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={60} color = "black" style={styles.profilePic} />
            </TouchableOpacity>
            <Greeting /> 
            <TipOfTheDay />
            <NavBar />
        </View>
        </>
    
    );
}


const styles = StyleSheet.create({
    greeting: {
        fontSize:45,
        fontWeight: 'bold',
        paddingHorizontal: 30,
        marginTop: 50,
    },
    navBar: {
        position: 'absolute', 
        bottom: 45,
        height: 50,
        borderRadius: 20,
        borderColor: '#868383',
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
    },
    profilePic: { 
        alignSelf: 'flex-end',
        marginTop: 70,
        marginRight: 30,
    },
    tip: {
        height: '55%',
        width: '90%',
        borderRadius: 20,
        borderColor: '#868383',
        borderWidth: 1, 
        alignSelf: 'center',
        marginTop: 20,
    }

});