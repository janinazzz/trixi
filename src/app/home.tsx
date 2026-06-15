import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OnboardingModal from '../components/OnboardingModal';
import { TIP_OF_THE_DAY, useLibrary } from '../context/LibraryContext';
import { useName } from '../context/NameContext';
import { useProfile } from '../context/ProfileContext';

// space the floating NavBar reserves at the bottom (45 offset + 50 height)
export const NAV_BAR_SPACE = 110;

const Greeting = () => {
     const { name } = useName();
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
    const { isSaved, toggleTip } = useLibrary();
    const liked = isSaved(TIP_OF_THE_DAY.id);
    return (
        <View style={styles.tip}>
            <Text style={{fontSize: 15, fontWeight: 'regular', padding: 15}}>
                Tipp des Tages:
            </Text>
            <Text style={styles.tipText}>
                {TIP_OF_THE_DAY.text}
            </Text>
            <Pressable style={{alignSelf: 'flex-end', position: 'absolute', bottom: 15, marginRight: 15}} onPress={() => toggleTip(TIP_OF_THE_DAY)}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={35} color='black' />
            </Pressable>
        </View>

    );
};


export default function Home() {
     const router = useRouter();
    const { avatarUri } = useProfile();
    // Beim ersten Öffnen nach der Anmeldung das Onboarding-Pop-up zeigen.
    const { onboarding } = useLocalSearchParams<{ onboarding?: string }>();
    const [showOnboarding, setShowOnboarding] = useState(onboarding === '1');
    return (
        <>
        <View style={{ flex: 1}}>
            <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profileSettings')}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.profilePic} />
                ) : (
                    <Ionicons name="person-circle-outline" size={80} color="black" />
                )}
                <View style={styles.editBadge}>
                    <Ionicons name="pencil-outline" size={18} color="black" />
                </View>
            </TouchableOpacity>
            <Greeting />
            <TipOfTheDay />
            <NavBar />
            <OnboardingModal visible={showOnboarding} onClose={() => setShowOnboarding(false)} />
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
    profileButton: {
        alignSelf: 'flex-end',
        marginTop: 70,
        marginRight: 20,

    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
    },
    editBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 26,
        height: 26,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#868383',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tip: {
        height: '55%',
        width: '90%',
        borderRadius: 20,
        borderColor: '#868383',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 20,
    },
    tipText: {
        fontSize: 18,
        paddingHorizontal: 15,
    }

});