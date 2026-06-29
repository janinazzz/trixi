import { DMSans_300Light, DMSans_400Regular, DMSans_500Medium, DMSans_500Medium_Italic, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { LibraryProvider } from '../context/LibraryContext';
import { NameProvider } from '../context/NameContext';
import { ProfileProvider } from '../context/ProfileContext';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';

// Roboto als Standard-Schrift für ALLE <Text> setzen. Wir injizieren die
// Default-Schrift als Basis-Style; einzelne Texte (z. B. Headlines mit Anton)
// überschreiben das über ihren eigenen Style.
const TextAny = Text as any;
if (TextAny.render && !TextAny.__defaultFontPatched) {
    const oldRender = TextAny.render;
    TextAny.render = function (...args: any[]) {
        const element = oldRender.apply(this, args);
        return React.cloneElement(element, {
            style: [{ fontFamily: Fonts.body }, element.props.style],
        });
    };
    TextAny.__defaultFontPatched = true;
}

export default function Layout() {
    const [fontsLoaded] = useFonts({
        DMSans_300Light,
        DMSans_400Regular,
        DMSans_500Medium,
        DMSans_700Bold,
        DMSans_500Medium_Italic,
    });

    // Bis die Fonts geladen sind, bleibt der Splash-Screen sichtbar.
    if (!fontsLoaded) {
        return null;
    }

    return (
        <NameProvider>
            <ProfileProvider>
                <LibraryProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: Colors.background,
                            },
                        }}
                    />
                </LibraryProvider>
            </ProfileProvider>
        </NameProvider>
    );
}
