import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { GENDERS, useProfile } from '../context/ProfileContext';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

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
                        <Ionicons name="close" size={16} color={Colors.textMuted} />
                    </TouchableOpacity>
                </View>
            ))}
            <TextInput
                style={[styles.chip, styles.addChip]}
                placeholder={placeholder}
                placeholderTextColor={Colors.textMuted}
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={submit}
                returnKeyType="done"
                blurOnSubmit={false}
            />
        </View>
    );
};

export default function OnboardingModal({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) {
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
    } = useProfile();

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <KeyboardAvoidingView
                style={styles.backdrop}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.dialog}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Erzähl uns von dir</Text>
                        <Pressable onPress={onClose} hitSlop={10}>
                            <Ionicons name="close" size={28} color={Colors.text} />
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 18 }}>
                        <Text style={styles.subtitle}>
                            Damit wir dir passende Tipps zeigen können.
                        </Text>

                        {/* Geburtstag */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Geburtstag</Text>
                            <TextInput
                                style={[styles.pill, styles.pillInput]}
                                placeholder="TT/MM/JJ"
                                placeholderTextColor={Colors.textMuted}
                                value={birthday}
                                onChangeText={setBirthday}
                            />
                        </View>

                        {/* Geschlecht */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Geschlecht</Text>
                            <View style={styles.genderRow}>
                                {GENDERS.map((g) => {
                                    const selected = gender === g;
                                    return (
                                        <TouchableOpacity
                                            key={g}
                                            style={[styles.genderCircle, selected && styles.genderCircleSelected]}
                                            onPress={() => setGender(selected ? null : g)}
                                        >
                                            <Text style={[styles.genderText, selected && styles.genderTextSelected]}>
                                                {g}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Ort */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Ort</Text>
                            <View style={styles.ortRow}>
                                <TextInput
                                    style={[styles.pill, styles.pillInput, { width: 90 }]}
                                    placeholder="PLZ"
                                    placeholderTextColor={Colors.textMuted}
                                    value={plz}
                                    onChangeText={setPlz}
                                />
                                <TextInput
                                    style={[styles.pill, styles.pillInput, { flex: 1 }]}
                                    placeholder="Stadt"
                                    placeholderTextColor={Colors.textMuted}
                                    value={stadt}
                                    onChangeText={setStadt}
                                />
                            </View>
                        </View>

                        {/* Interessen */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Interessen</Text>
                            <ChipList
                                items={interessen}
                                onAdd={(value) => setInteressen((prev) => [...prev, value])}
                                onRemove={(index) =>
                                    setInteressen((prev) => prev.filter((_, i) => i !== index))
                                }
                                placeholder="+ Interesse"
                            />
                        </View>

                        {/* Ziele */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Ziele</Text>
                            <ChipList
                                items={ziele}
                                onAdd={(value) => setZiele((prev) => [...prev, value])}
                                onRemove={(index) => setZiele((prev) => prev.filter((_, i) => i !== index))}
                                placeholder="+ Ziel"
                            />
                        </View>
                    </ScrollView>

                    <Pressable
                        style={({ pressed }) => [styles.doneButton, pressed && { backgroundColor: Colors.accentStrong }]}
                        onPress={onClose}
                    >
                        <Text style={styles.doneText}>Eingaben übernehmen</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    dialog: {
        ...Shadows.card,
        width: '100%',
        maxHeight: '85%',
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        padding: 25,
        gap: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textMuted,
    },
    field: {
        gap: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pill: {
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    pillInput: {
        height: 36,
        fontSize: 16,
        paddingVertical: 0,
        alignSelf: 'flex-start',
        minWidth: 120,
    },
    genderRow: {
        flexDirection: 'row',
        gap: 15,
    },
    ortRow: {
        flexDirection: 'row',
        gap: 15,
    },
    genderCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderCircleSelected: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
    },
    genderText: {
        fontSize: 16,
        color: Colors.text,
    },
    genderTextSelected: {
        color: Colors.onAccent,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        borderRadius: 20,
        height: 36,
        minWidth: 100,
        paddingHorizontal: 18,
        justifyContent: 'center',
    },
    chipText: {
        fontSize: 16,
    },
    addChip: {
        fontSize: 16,
        color: Colors.text,
        paddingVertical: 0,
        justifyContent: 'flex-start',
    },
    doneButton: {
        height: 44,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneText: {
        fontSize: 16,
        color: Colors.onAccent,
        fontWeight: '500',
    },
});
