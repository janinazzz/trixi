import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Mascot from '../components/Mascot';
import OnboardingModal from '../components/OnboardingModal';
import { TIP_OF_THE_DAY, useLibrary } from '../context/LibraryContext';
import { useName } from '../context/NameContext';
import { useProfile } from '../context/ProfileContext';
import { getTipCategory } from '../data/suggestions';
import { getCategoryColor } from '../theme/categories';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

// space the floating NavBar reserves at the bottom (45 offset + 50 height)
export const NAV_BAR_SPACE = 110;

const Greeting = () => {
     const { name } = useName();
    return (
        <Text style={styles.greeting}>
            hey{'\n'}{ name }!
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
            <Ionicons name={pathname === '/search' ? 'search' : 'search-outline'} size={38} color={pathname === '/search' ? Colors.accent : Colors.text} />
        </Pressable>
        <Pressable onPress={() => go('/home')}>
            <Ionicons name={pathname === '/home' ? 'home' : 'home-outline'} size={38} color={pathname === '/home' ? Colors.accent : Colors.text} />
        </Pressable>

        <Pressable onPress={() => go('/bibliothek')}>
            <Ionicons name={pathname === '/bibliothek' ? 'heart' : 'heart-outline'} size={38} color={pathname === '/bibliothek' ? Colors.accent : Colors.text} />
        </Pressable>

        </View>

    );
};

const TipOfTheDay =() => {
    const { isSaved, toggleTip } = useLibrary();
    const liked = isSaved(TIP_OF_THE_DAY.id);
    // Tipp des Tages in der Farbe seiner Kategorie (wie auf dem Such-Screen).
    const c = getCategoryColor(getTipCategory(TIP_OF_THE_DAY.id));
    return (
        <View style={styles.tipWrapper}>
            {/* Maskottchen lugt oben rechts über den Rand der Karte */}
            <Mascot size={120} style={styles.tipMascot} />
            <View style={[styles.tip, { backgroundColor: c.bg, borderColor: c.bg }]}>
                <Text style={{fontSize: 15, fontWeight: 'regular', padding: 15, color: c.fg}}>
                    Tipp des Tages:
                </Text>
                <Text style={[styles.tipText, { color: c.fg }]}>
                    {TIP_OF_THE_DAY.text}
                </Text>
                <Pressable style={{alignSelf: 'flex-end', position: 'absolute', bottom: 15, marginRight: 15}} onPress={() => toggleTip(TIP_OF_THE_DAY)}>
                <Ionicons name={liked ? "heart" : "heart-outline"} size={35} color={c.fg} />
                </Pressable>
            </View>
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
                    <Ionicons name="person-circle-outline" size={80} color={Colors.text} />
                )}
                <View style={styles.editBadge}>
                    <Ionicons name="pencil-outline" size={18} color={Colors.text} />
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
        color: Colors.text,
        paddingLeft: 30,
        // rechts Platz freihalten, damit ein langer Name umbricht und das
        // Maskottchen nicht verdeckt
        paddingRight: 150,
        marginTop: 8,
    },
    navBar: {
        ...Shadows.card,
        position: 'absolute',
        bottom: 45,
        height: 50,
        borderRadius: 20,
        borderColor: Colors.borderSoft,
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
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
        backgroundColor: Colors.surface,
    },
    editBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 26,
        height: 26,
        borderRadius: 8,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipWrapper: {
        height: '55%',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    tipMascot: {
        position: 'absolute',
        right: 15,
        // negativer top-Wert: das Maskottchen ragt über die Kartenoberkante,
        // sein unterer Rand wird vom weißen Kartenhintergrund verdeckt
        top: -100,
    },
    tip: {
        ...Shadows.card,
        flex: 1,
        borderRadius: 20,
        borderColor: Colors.borderSoft,
        borderWidth: 1,
        // deckt den überlappenden unteren Rand des Maskottchens ab
        backgroundColor: Colors.white,
    },
    tipText: {
        fontSize: 22,
        paddingHorizontal: 15,
    }

});