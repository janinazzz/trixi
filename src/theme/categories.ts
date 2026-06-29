import { Colors } from "./colors";

/**
 * Feste Füllfarbe pro Such-Kategorie (Farben aus der Referenz-Palette).
 *
 * Der lesbare Vordergrund (`fg`) wird NICHT fest hinterlegt, sondern aus der
 * Helligkeit der Füllfarbe berechnet: dunkler Text auf hellen Flächen, weißer
 * Text auf dunklen. So bleibt der Text lesbar, egal wie die `bg` angepasst wird.
 *
 * Verwendet auf Such-Screen, Bibliothek, Detail und beim Tipp des Tages.
 */
const CATEGORY_BG: Record<string, string> = {
  Rezepte: "#ffa885", // Blood Orange
  Events: "#fcb1cd", // Bubblegum
  Haushalt: "#90d9fd", // Blueberry
  Hobbies: "#fedb82", // Butter Yellow
  Gesundheit: "#b7dca1", // Tea Green
};

export type CategoryColor = { bg: string; fg: string };

/** Lesbarer Text-/Icon-Ton auf `bg` – dunkel auf hell, weiß auf dunkel. */
function readableFg(bg: string): string {
  const hex = bg.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // wahrgenommene Helligkeit (YIQ-Gewichtung), 0–255
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? Colors.text : "#FFFFFF";
}

/** Neutrale Fläche für Tipps ohne Kategorie (z. B. unbekannte Kategorie). */
export const CATEGORY_FALLBACK: CategoryColor = {
  bg: Colors.surface,
  fg: Colors.text,
};

/** Farbe für eine Kategorie (Fallback, wenn keine/unbekannte Kategorie). */
export function getCategoryColor(category?: string): CategoryColor {
  if (!category) return CATEGORY_FALLBACK;
  const bg = CATEGORY_BG[category];
  if (!bg) return CATEGORY_FALLBACK;
  return { bg, fg: readableFg(bg) };
}
