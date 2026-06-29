import { useRouter } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Mascot from '../components/Mascot';
import { useName } from '../context/NameContext';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

export default function Start() {
    const router = useRouter();
    const { name, setName } = useName();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>TRIXI</Text>

                <Mascot size={140} style={styles.mascot} />

                <View style={styles.box}>
                    <TextInput
                        style={{ paddingLeft: 20, fontSize: 15, flex: 1, color: Colors.text }}
                        placeholder="Name"
                        placeholderTextColor={Colors.textMuted}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <Pressable
                    style={({ pressed }) => [styles.cta, pressed && { backgroundColor: Colors.accentStrong }]}
                    onPress={() => router.replace({ pathname: '/home', params: { onboarding: '1' } })}
                >
                    <Text style={styles.ctaText}>Los geht's!</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // alles etwas weiter nach unten gerückt
        paddingTop: 200,
        paddingBottom: 40,
    },
    mascot: {
        alignSelf: 'center',
        marginTop: 30,
        // Negativer Abstand: das Maskottchen lugt über die Eingabe, deren
        // weißer Hintergrund den unteren Rand des Wesens verdeckt.
        marginBottom: -1,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        paddingHorizontal: 30,
        alignSelf: 'center',
        color: Colors.accent,
    },
    cta: {
        ...Shadows.button,
        alignSelf: 'center',
        marginTop: 28,
        backgroundColor: Colors.accent,
        paddingHorizontal: 36,
        paddingVertical: 12,
        borderRadius: 24,
    },
    ctaText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.onAccent,
    },
    box: {
        ...Shadows.soft,
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.borderSoft,
        // Weißer Hintergrund verdeckt das überlappende Maskottchen dahinter,
        // sodass es wirkt, als würde es über den Rand der Eingabe lugen.
        backgroundColor: Colors.white,
        marginTop: 0,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
