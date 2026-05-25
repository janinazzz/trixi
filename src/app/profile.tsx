import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavBar } from './home';

const Header = () => {
    const router = useRouter();
    return (
        <View style ={{flexDirection: 'row', gap: 20, alignItems: 'center', marginHorizontal: 30, marginTop: 70}}> 
                <Ionicons name="person-circle-outline" size={70} color = "black" />
                <Text style={styles.nameText}>Name</Text>
                <TouchableOpacity style={{flex:1, alignItems: 'flex-end'}} onPress={() => router.push('/profileSettings')}>
                    <Ionicons name="settings-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
    );
};

export default function Profile() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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

                <TouchableOpacity style = {styles.buttonContainer}>
                    <Text style={{fontSize: 20, padding: 10}}>
                        Abmelden
                    </Text>
                    <Ionicons name="log-out-outline" size={30} color="black" />
                </TouchableOpacity>
                
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
    }
});