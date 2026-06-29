/**
 * Zentrales Farbschema der Trixi-App – "Modern Violett".
 *
 * Orientiert an den Referenz-Designs: heller, luftiger Look mit weißen/
 * hellgrauen, abgerundeten Karten-Flächen, dunklem fast-schwarzem Text und
 * einem kräftigen Violett als Akzent (Buttons, Fortschritt, aktive Zustände).
 *
 * Alle Farben der App sollten von hier importiert werden:
 *   import { Colors } from '@/theme/colors';
 * So lässt sich das Schema später an genau einer Stelle anpassen.
 */
export const Colors = {
  // — Akzent (Violett) — das Highlight: Buttons, aktive Zustände, Fortschritt, Links
  accent: "#000000",
  /** Sehr heller Violett-Ton für Pill-/Chip-Hintergründe, ausgewählte Tags etc. */
  accentSoft: "#ECEAFD",
  /** Farbe beim Drücken von Buttons (Grape Juice). */
  accentStrong: "#000000",
  /** Lesbarer Text/Icon-Ton auf einer accent-Fläche. */
  onAccent: "#FFFFFF",

  // — Neutrale Basis —
  background: "#f9f7e5",
  /** Weiche, neutrale Fläche für Cards / abgesetzte Bereiche. */
  surface: "#F4F4F8",
  text: "#1E1E28",
  /** Sekundärtext, Platzhalter, Icons. */
  textMuted: "#8E8F99",
  /** Kräftigere Hairline-Border für klare Abgrenzungen. */
  border: "#C9BE9A",
  /** Dezente Border, passend zum hellen Look. */
  borderSoft: "#C9BE9A",

  /** Hintergrund der schwebenden Navigationsleiste. */
  navBar: "#F0EAD6",
  /** Etwas dunklerer Rahmen der Navigationsleiste. */
  navBarBorder: "#C9BE9A",

  white: "#FFFFFF",
  black: "#000000",
} as const;

export type ColorToken = keyof typeof Colors;
