import { Colors } from "./colors";

/**
 * Feste Farbe pro Such-Kategorie (Farben aus der Referenz-Palette).
 *
 * `bg` = Füllfarbe der Kachel/Karte, `fg` = lesbarer Text-/Icon-Ton darauf.
 * Wird auf dem Such-Screen (Kategorie-Kacheln) und in der Bibliothek
 * (gespeicherte Tipps in ihrer Kategorie-Farbe) verwendet.
 */
export type CategoryColor = { bg: string; fg: string };

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  Rezepte: { bg: "#EF6F3C", fg: "#FFFFFF" }, // Blood Orange
  Events: { bg: "#FF7BAC", fg: "#FFFFFF" }, // Bubblegum
  Haushalt: { bg: "#52A5CE", fg: "#FFFFFF" }, // Blueberry
  Hobbies: { bg: "#EFCE7B", fg: "#FFFFFF" }, // Butter Yellow
  Gesundheit: { bg: "#AACC96", fg: "#FFFFFF" }, // Tea Green
};

/** Neutrale Fläche für Tipps ohne Kategorie (z. B. Tipp des Tages). */
export const CATEGORY_FALLBACK: CategoryColor = {
  bg: Colors.surface,
  fg: Colors.text,
};

/** Farbe für eine Kategorie (Fallback, wenn keine/unbekannte Kategorie). */
export function getCategoryColor(category?: string): CategoryColor {
  if (!category) return CATEGORY_FALLBACK;
  return CATEGORY_COLORS[category] ?? CATEGORY_FALLBACK;
}
