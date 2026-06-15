import { useRouter } from 'expo-router';
import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useName } from '../context/NameContext';

export default function Start() {
    const router = useRouter();
    const { name, setName } = useName();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>TRIXI</Text>

                    <View style={styles.box}>
                        <TextInput
                            style={{ paddingLeft: 20, fontSize: 15, flex: 1 }}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 20 }}
                        onPress={() => router.replace({ pathname: '/home', params: { onboarding: '1' } })}
                    >
                        <Text style={{ fontSize: 20 }}>Los geht's!</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 140,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        paddingHorizontal: 30,
        alignSelf: 'center',
    },
    box: {
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#868383',
        marginTop: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
