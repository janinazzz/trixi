import React, { createContext, useContext, useState } from 'react';
import { Vibration } from 'react-native';

export type Tip = {
    id: string;
    title: string;
    text: string;
};

// Example "Tipp des Tages" shown on the home screen.
export const TIP_OF_THE_DAY: Tip = {
    id: 'tip-of-the-day',
    title: 'Tipp des Tages',
    text: 'Trinke morgens direkt nach dem Aufstehen ein großes Glas Wasser. Das bringt deinen Kreislauf in Schwung und hilft dir, wach zu werden.',
};

type LibraryContextValue = {
    savedTips: Tip[];
    isSaved: (id: string) => boolean;
    toggleTip: (tip: Tip) => void;
};

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
    const [savedTips, setSavedTips] = useState<Tip[]>([]);

    const isSaved = (id: string) => savedTips.some((tip) => tip.id === id);

    const toggleTip = (tip: Tip) => {
        const alreadySaved = savedTips.some((saved) => saved.id === tip.id);
        // Kurze Vibration nur beim Favorisieren (Hinzufügen), nicht beim Entfernen.
        if (!alreadySaved) {
            Vibration.vibrate(50);
        }
        setSavedTips((prev) =>
            prev.some((saved) => saved.id === tip.id)
                ? prev.filter((saved) => saved.id !== tip.id)
                : [...prev, tip]
        );
    };

    return (
        <LibraryContext.Provider value={{ savedTips, isSaved, toggleTip }}>
            {children}
        </LibraryContext.Provider>
    );
}

export function useLibrary() {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
}
