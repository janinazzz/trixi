import { Redirect } from 'expo-router';
import React from 'react';
import { useName } from '../context/NameContext';

function App() {
    const { name } = useName();
    // Beim allerersten Öffnen ist noch kein Name gesetzt -> Start-/Login-Screen.
    return <Redirect href={name ? '/home' : '/start'} />;
}

export default App;
