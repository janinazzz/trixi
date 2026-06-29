/**
 * Schriftarten der App (Google Fonts).
 *
 * Durchgehend DM Sans – nur die Schnitte variieren:
 * - `display` (DM Sans Bold): markante Headlines/Überschriften.
 * - `displayItalic` (DM Sans Medium Italic): z. B. der Name.
 * - `body`/`bodyMedium`/`bodyBold`: restliche Texte.
 *
 * Geladen werden die Fonts in app/_layout.tsx; `body` ist dort als Standard für
 * alle <Text> gesetzt, Headlines setzen `fontFamily: Fonts.display`.
 */
export const Fonts = {
    display: 'DMSans_700Bold',
    /** DM Sans Medium Italic – z. B. für den Namen in der Begrüßung. */
    displayItalic: 'DMSans_500Medium_Italic',
    bodyLight: 'DMSans_300Light',
    body: 'DMSans_400Regular',
    bodyMedium: 'DMSans_500Medium',
    bodyBold: 'DMSans_700Bold',
} as const;
