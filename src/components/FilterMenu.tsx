import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SortOption } from '../data/suggestions';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

const OPTIONS: { key: SortOption; label: string }[] = [
    { key: 'neuste', label: 'Neuste' },
    { key: 'aelteste', label: 'Älteste' },
    { key: 'kategorie', label: 'Kategorie' },
];

export default function FilterMenu({
    visible,
    current,
    onSelect,
    onClose,
}: {
    visible: boolean;
    current: SortOption;
    onSelect: (option: SortOption) => void;
    onClose: () => void;
}) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.sheet}>
                    <Text style={styles.title}>Filtern nach</Text>
                    {OPTIONS.map((option) => {
                        const selected = option.key === current;
                        return (
                            <Pressable
                                key={option.key}
                                style={[styles.option, selected && styles.optionSelected]}
                                onPress={() => {
                                    onSelect(option.key);
                                    onClose();
                                }}
                            >
                                <Text
                                    style={[styles.optionText, selected && styles.optionTextSelected]}
                                >
                                    {option.label}
                                </Text>
                                {selected && <Ionicons name="checkmark" size={20} color={Colors.onAccent} />}
                            </Pressable>
                        );
                    })}
                </Pressable>
            </Pressable>
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
    sheet: {
        ...Shadows.card,
        width: '80%',
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        padding: 20,
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        borderRadius: 20,
        paddingHorizontal: 18,
    },
    optionSelected: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
    },
    optionText: {
        fontSize: 16,
        color: Colors.text,
    },
    optionTextSelected: {
        color: Colors.onAccent,
    },
});
