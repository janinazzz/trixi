import { ViewStyle } from 'react-native';
import { Colors } from './colors';

/**
 * Zentrale Schatten-Stile – orientiert an den Referenz-Designs (weiche,
 * diffuse Schatten unter abgerundeten Karten).
 *
 * Als plain-Objekte definiert, damit sie in StyleSheet.create gespreizt werden
 * können:  card: { ...Shadows.card, borderRadius: 20 }
 *
 * Schatten brauchen eine deckende `backgroundColor` (sonst nicht sichtbar) und
 * auf Android sorgt `elevation` für den Schatten.
 */
export const Shadows: Record<'card' | 'soft' | 'button', ViewStyle> = {
    /** Weicher, erhabener Karten-Schatten. */
    card: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
    },
    /** Dezenter Schatten für kleinere Flächen / Eingaben. */
    soft: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    /** Farbiger Schimmer unter primären (violetten) Buttons. */
    button: {
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },
};
