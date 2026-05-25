import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Start() {
    const router = useRouter();
    const [name, setName] = useState('');
    return (
        <View style={{ flex: 1}}> 
            <Text style={{fontSize: 45, fontWeight: 'bold', paddingHorizontal: 30, marginTop: 300, alignSelf: 'center'}}> 
                TRIXI
            </Text>
            <View style ={styles.box}>
                <TextInput 
                    style={{paddingLeft: 20, fontSize: 15, flex: 1}} 
                    placeholder="Name" 
                    value={name}
                    onChangeText={setName}
                />

            </View>

            <TouchableOpacity style ={{alignSelf: 'center', marginTop: 20}} onPress={() => router.push({ pathname: '/home', params: { name } })}>
            <Text style={{fontSize: 20}}> 
                Los geht's!
            </Text>
            </TouchableOpacity>

        </View>
        
    );
}

const styles = StyleSheet.create({ 
    box:{
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#868383',
        marginTop: 250,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

});