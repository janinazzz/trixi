import { Tip } from '../context/LibraryContext';

// Real "Vorschläge" per search category. Tone: informal (du), healthy,
// modern and relevant for an audience aged ~18–30. IDs are stable so that
// liked suggestions stay saved in the Bibliothek.
const CATEGORY_SUGGESTIONS: Record<string, Tip[]> = {
  Rezepte: [
    {
      id: 'rezepte-dal',
      title: 'One-Pot Linsen-Dal',
      text: 'Rote Linsen, Kokosmilch und Currypaste in einem Topf – in 20 Minuten fertig, proteinreich und günstig. Perfekt zum Vorkochen für die ganze Woche.',
    },
    {
      id: 'rezepte-overnight-oats',
      title: 'Overnight Oats mit Beeren',
      text: 'Haferflocken abends mit Pflanzendrink und Chiasamen ansetzen, morgens mit gefrorenen Beeren toppen. Frühstück ganz ohne Stress vor Uni oder Arbeit.',
    },
    {
      id: 'rezepte-buddha-bowl',
      title: 'Buddha Bowl nach Resteprinzip',
      text: 'Was im Kühlschrank ist plus eine Basis aus Reis oder Quinoa und Hummus als Dressing. Spart Geld, reduziert Foodwaste und macht richtig satt.',
    },
  ],
  Events: [
    {
      id: 'events-repair-cafe',
      title: 'Repair-Café in deiner Stadt',
      text: 'Kaputte Kopfhörer oder Klamotten mitbringen und gemeinsam reparieren statt neu kaufen. Gut für Geldbeutel, Umwelt und neue Kontakte.',
    },
    {
      id: 'events-lauftreff',
      title: 'Feierabend-Lauftreff',
      text: 'Viele Städte haben kostenlose Running-Crews. Bewegung, frische Luft und Leute kennenlernen ganz ohne Alkohol – ideal gegen das After-Work-Tief.',
    },
    {
      id: 'events-kleidertausch',
      title: 'Kleidertausch statt Shopping',
      text: 'Mit Freund:innen Klamotten tauschen, die ihr nicht mehr tragt. Nachhaltiger als Fast Fashion und kostet nichts.',
    },
  ],
  Haushalt: [
    {
      id: 'haushalt-mealprep',
      title: 'Mealprep-Sonntag',
      text: 'Einmal pro Woche vorkochen spart Zeit, Geld und Nerven – und du greifst seltener zum Lieferdienst.',
    },
    {
      id: 'haushalt-unverpackt',
      title: 'Plastikfrei einkaufen',
      text: 'Mehrwegnetze fürs Obst und Unverpackt-Läden nutzen. Ein kleiner Schritt, der deinen Müll spürbar reduziert.',
    },
    {
      id: 'haushalt-putzliste',
      title: 'Geteilte Putzliste in der WG',
      text: 'Aufgaben in einer gemeinsamen App-Liste festhalten statt zu diskutieren. Fairer Haushalt ohne Streit.',
    },
  ],
  Hobbies: [
    {
      id: 'hobbies-digital-detox',
      title: 'Handyfreier Sonntagmorgen',
      text: 'Starte eine Stunde ohne Scrollen: lesen, spazieren oder den Kaffee in Ruhe genießen. Senkt Stress und stärkt die Konzentration.',
    },
    {
      id: 'hobbies-bouldern',
      title: 'Bouldern in der Kletterhalle',
      text: 'Ganzkörper-Workout, das sich wie Spielen anfühlt. Günstige Studi-Tarife und perfekt, um neue Leute zu treffen.',
    },
    {
      id: 'hobbies-urban-gardening',
      title: 'Urban Gardening',
      text: 'Kräuter auf dem Balkon oder ein Beet im Gemeinschaftsgarten. Entspannt, nachhaltig und du erntest dein eigenes Essen.',
    },
  ],
  Gesundheit: [
    {
      id: 'gesundheit-schlaf',
      title: '7–9 Stunden Schlaf priorisieren',
      text: 'Feste Schlafenszeiten und das Handy 30 Minuten vorher weglegen. Guter Schlaf hebt deine Stimmung stärker als jeder Kaffee.',
    },
    {
      id: 'gesundheit-mental-checkin',
      title: 'Täglicher Mental-Health-Check-in',
      text: 'Frag dich einmal am Tag ehrlich: Wie geht es mir gerade? Journaling oder eine Achtsamkeits-App helfen, Stress früh zu erkennen.',
    },
    {
      id: 'gesundheit-bewegung',
      title: 'Bewegung in den Alltag bauen',
      text: 'Treppe statt Aufzug, Wege mit dem Rad, kurze Stretch-Pausen. Schon 30 Minuten Bewegung am Tag machen einen Unterschied.',
    },
  ],
};

// Fallback for free-text searches that don't match a category.
const DEFAULT_SUGGESTIONS: Tip[] = [
  {
    id: 'default-wasser',
    title: 'Trink mehr Wasser',
    text: 'Eine wiederverwendbare Flasche immer dabeihaben. Schon leichte Dehydrierung macht müde und unkonzentriert.',
  },
  {
    id: 'default-screentime',
    title: 'Bildschirmzeit bewusst setzen',
    text: 'Abends einen Timer für Social Media aktivieren. Mehr Schlaf, weniger Doomscrolling.',
  },
  {
    id: 'default-frische-luft',
    title: 'Frische Luft statt Energydrink',
    text: 'Bei einem Tief lieber 5 Minuten raus an die frische Luft als der dritte Kaffee. Wirkt oft besser.',
  },
];

export function getSuggestions(keyword?: string): Tip[] {
  if (keyword && CATEGORY_SUGGESTIONS[keyword]) {
    return CATEGORY_SUGGESTIONS[keyword];
  }
  return DEFAULT_SUGGESTIONS;
}
