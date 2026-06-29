import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

/**
 * App-Maskottchen von Trixi.
 *
 * Rendert das Maskottchen-Bild (assets/images/mascot.png). Das Bild ist auf das
 * Wesen zugeschnitten (Fühler oben, Körper unten abgeschnitten), sodass es sich
 * gut „über" ein darunterliegendes Element lugen lässt.
 *
 * Später austauschbar: einfach die Bilddatei ersetzen – die Props bleiben gleich.
 */
type MascotProps = {
    /** Breite des Maskottchens in px (Höhe folgt dem Seitenverhältnis). Standard 150. */
    size?: number;
    style?: ViewStyle;
};

// Tatsächliches Seitenverhältnis der zugeschnittenen Bilddatei (1940 × 1610).
const ASPECT_RATIO = 1940 / 1610;

export default function Mascot({ size = 150, style }: MascotProps) {
    return (
        <View style={[{ width: size }, style]}>
            <Image
                source={require('../../assets/images/mascot.png')}
                style={[styles.image, { width: size, height: size / ASPECT_RATIO }]}
                resizeMode="contain"
                accessibilityLabel="Trixi Maskottchen"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        // Bild bleibt am unteren Rand bündig, damit es sauber „aufsitzt".
        alignSelf: 'center',
    },
});
