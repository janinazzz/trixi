import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useName } from '../context/NameContext';
import { GENDERS, useProfile } from '../context/ProfileContext';
import { NAV_BAR_SPACE, NavBar } from './home';

const Header = ({ name, onChangeName }: { name: string; onChangeName: (value: string) => void }) => {
    const router = useRouter();
    const { avatarUri, setAvatarUri } = useProfile();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', marginHorizontal: 30, marginTop: 70 }}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <Ionicons name="person-circle-outline" size={70} color="black" />
                )}
                <View style={styles.avatarBadge}>
                    <Ionicons name="camera-outline" size={14} color="black" />
                </View>
            </TouchableOpacity>
            <TextInput
                style={[styles.nameText, { flex: 1 }]}
                placeholder="</name>"
                placeholderTextColor="#868383"
                value={name}
                onChangeText={onChangeName}
            />
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <Ionicons name="settings-outline" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const ChipList = ({
    items,
    onAdd,
    onRemove,
    placeholder,
}: {
    items: string[];
    onAdd: (value: string) => void;
    onRemove: (index: number) => void;
    placeholder: string;
}) => {
    const [draft, setDraft] = useState('');

    const submit = () => {
        const value = draft.trim();
        if (!value) return;
        onAdd(value);
        setDraft('');
    };

    return (
        <View style={styles.chipRow}>
            {items.map((label, index) => (
                <View key={`${label}-${index}`} style={styles.chip}>
                    <Text style={styles.chipText}>{label}</Text>
                    <TouchableOpacity onPress={() => onRemove(index)} hitSlop={8}>
                        <Ionicons name="close" size={16} color="#868383" />
                    </TouchableOpacity>
                </View>
            ))}
            <TextInput
                style={[styles.chip, styles.addChip]}
                placeholder={placeholder}
                placeholderTextColor="#868383"
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={submit}
                returnKeyType="done"
                blurOnSubmit={false}
            />
        </View>
    );
};

export default function ProfileSettings() {
    const { name, setName } = useName();
    const {
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
        reset: resetProfile,
    } = useProfile();

    const reset = () => {
        setName('');
        resetProfile();
    };

    return (
        <View style={{ flex: 1 }}>
            <Header name={name} onChangeName={setName} />

            <ScrollView contentContainerStyle={{ paddingBottom: NAV_BAR_SPACE }}>
                {/* Geburtstag */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Geburtstag</Text>
                        <TextInput
                            style={[styles.pill, styles.pillInput]}
                            placeholder="TT/MM/JJ"
                            placeholderTextColor="#868383"
                            value={birthday}
                            onChangeText={setBirthday}
                        />
                    </View>
                </View>
                <View style={styles.divider} />

                {/* Geschlecht */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Geschlecht</Text>
                        {GENDERS.map((g) => {
                            const selected = gender === g;
                            return (
                                <TouchableOpacity
                                    key={g}
                                    style={[styles.genderCircle, selected && styles.genderCircleSelected]}
                                    onPress={() => setGender(selected ? null : g)}
                                >
                                    <Text style={[styles.genderText, selected && styles.genderTextSelected]}>{g}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.divider} />

                {/* Ort */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ort</Text>
                        <TextInput
                            style={[styles.pill, styles.pillInput, { width: 90 }]}
                            placeholder="PLZ"
                            placeholderTextColor="#868383"
                            value={plz}
                            onChangeText={setPlz}
                        />
                        <TextInput
                            style={[styles.pill, styles.pillInput, { flex: 1 }]}
                            placeholder="Stadt"
                            placeholderTextColor="#868383"
                            value={stadt}
                            onChangeText={setStadt}
                        />
                    </View>
                </View>
                <View style={styles.divider} />

                {/* Interessen */}
                <View style={styles.section}>
                    <Text style={styles.label}>Interessen</Text>
                    <ChipList
                        items={interessen}
                        onAdd={(value) => setInteressen((prev) => [...prev, value])}
                        onRemove={(index) => setInteressen((prev) => prev.filter((_, i) => i !== index))}
                        placeholder="+ Interesse"
                    />
                </View>
                <View style={styles.divider} />

                {/* Ziele */}
                <View style={styles.section}>
                    <Text style={styles.label}>Ziele</Text>
                    <ChipList
                        items={ziele}
                        onAdd={(value) => setZiele((prev) => [...prev, value])}
                        onRemove={(index) => setZiele((prev) => prev.filter((_, i) => i !== index))}
                        placeholder="+ Ziel"
                    />
                </View>
                <View style={styles.divider} />

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={reset}>
                        <Text style={styles.footerText}>Zurücksetzen</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    nameText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 30,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f0f0f0',
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#868383',
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginHorizontal: 30,
        marginVertical: 15,
        gap: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    label: {
        fontSize: 22,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#868383',
        marginHorizontal: 30,
    },
    pill: {
        borderWidth: 1,
        borderColor: '#868383',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    pillInput: {
        height: 36,
        fontSize: 16,
        paddingVertical: 0,
    },
    genderCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#868383',
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderCircleSelected: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    genderText: {
        fontSize: 16,
        color: '#000000',
    },
    genderTextSelected: {
        color: '#ffffff',
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#868383',
        borderRadius: 20,
        height: 36,
        minWidth: 110,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    chipText: {
        fontSize: 16,
    },
    addChip: {
        fontSize: 16,
        color: '#000000',
        paddingVertical: 0,
        justifyContent: 'flex-start',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 15,
    },
    footerText: {
        fontSize: 18,
    },
});
