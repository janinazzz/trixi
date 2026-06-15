import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useName } from '../context/NameContext';
import { useProfile } from '../context/ProfileContext';
import { NavBar } from './home';

const Header = () => {
    const router = useRouter();
    const { name } = useName();
    const { avatarUri } = useProfile();
    return (
        <View style ={{flexDirection: 'row', gap: 20, alignItems: 'center', marginHorizontal: 30, marginTop: 70}}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <Ionicons name="person-circle-outline" size={70} color = "black" />
                )}
                <Text style={styles.nameText}>{name || 'Name'}</Text>
                <TouchableOpacity style={{flex:1, alignItems: 'flex-end'}} onPress={() => router.push('/profileSettings')}>
                    <Ionicons name="close-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
    );
};

export default function Profile() {
    const router = useRouter();
    const { setName } = useName();
    const [isEnabled, setIsEnabled] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const logout = () => {
        setConfirmVisible(false);
        setName('');
        router.replace('/start');
    };

    return (
        <View style={{flex: 1}}>
            <Header />
            <View style ={styles.info}>
                <View style ={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Text style={styles.infoText}>Kalender sychronisieren</Text>
                    <Switch value={isEnabled} onChange={toggleSwitch} />
                </View>

                <TouchableOpacity>
                    <Text style={styles.infoText}>AGB</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.infoText}>Impressum</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.infoText}>Support</Text>
                </TouchableOpacity>
            </View>

                <TouchableOpacity style = {styles.buttonContainer} onPress={() => setConfirmVisible(true)}>
                    <Text style={{fontSize: 20, padding: 10}}>
                        Abmelden
                    </Text>
                    <Ionicons name="log-out-outline" size={30} color="black" />
                </TouchableOpacity>

            <Modal
                visible={confirmVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmVisible(false)}
            >
                <Pressable style={styles.backdrop} onPress={() => setConfirmVisible(false)}>
                    <Pressable style={styles.dialog}>
                        <Text style={styles.dialogTitle}>Wirklich abmelden?</Text>
                        <View style={styles.dialogActions}>
                            <TouchableOpacity style={styles.dialogButton} onPress={() => setConfirmVisible(false)}>
                                <Text style={styles.dialogButtonText}>Abbrechen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.dialogButton, styles.dialogButtonPrimary]} onPress={logout}>
                                <Text style={[styles.dialogButtonText, styles.dialogButtonTextPrimary]}>Abmelden</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({ 
    nameText: {
        color : '#000000',
        fontWeight : 'bold',
        fontSize: 30,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f0f0f0',
    },
    info: {
        flexDirection: 'column',
        marginTop: 30,
        alignSelf: 'flex-start',
        marginHorizontal: 30,
        gap: 20,
    },
    infoText: {
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 30,
        paddingHorizontal: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#868383',
        borderRadius: 20,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialog: {
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#868383',
        padding: 25,
        gap: 25,
    },
    dialogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dialogActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    dialogButton: {
        flex: 1,
        height: 44,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#868383',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogButtonPrimary: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    dialogButtonText: {
        fontSize: 16,
        color: '#000000',
    },
    dialogButtonTextPrimary: {
        color: '#ffffff',
    },
});