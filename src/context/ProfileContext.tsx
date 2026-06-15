import React, { createContext, useContext, useState } from 'react';

export const GENDERS = ['m', 'w', 'd'] as const;
export type Gender = (typeof GENDERS)[number];

const DEFAULT_INTERESSEN = ['Kochen'];
const DEFAULT_ZIELE = ['Sparen'];

type ProfileContextValue = {
    avatarUri: string | null;
    setAvatarUri: (value: string | null) => void;
    birthday: string;
    setBirthday: (value: string) => void;
    gender: Gender | null;
    setGender: (value: Gender | null) => void;
    plz: string;
    setPlz: (value: string) => void;
    stadt: string;
    setStadt: (value: string) => void;
    interessen: string[];
    setInteressen: React.Dispatch<React.SetStateAction<string[]>>;
    ziele: string[];
    setZiele: React.Dispatch<React.SetStateAction<string[]>>;
    reset: () => void;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

// Shared profile data so onboarding and profile settings stay in sync.
export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState<Gender | null>(null);
    const [plz, setPlz] = useState('');
    const [stadt, setStadt] = useState('');
    const [interessen, setInteressen] = useState<string[]>(DEFAULT_INTERESSEN);
    const [ziele, setZiele] = useState<string[]>(DEFAULT_ZIELE);

    const reset = () => {
        setAvatarUri(null);
        setBirthday('');
        setGender(null);
        setPlz('');
        setStadt('');
        setInteressen(DEFAULT_INTERESSEN);
        setZiele(DEFAULT_ZIELE);
    };

    return (
        <ProfileContext.Provider
            value={{
                avatarUri,
                setAvatarUri,
                birthday,
                setBirthday,
                gender,
                setGender,
                plz,
                setPlz,
                stadt,
                setStadt,
                interessen,
                setInteressen,
                ziele,
                setZiele,
                reset,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
