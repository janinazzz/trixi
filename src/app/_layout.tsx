import { Stack } from 'expo-router';
import { LibraryProvider } from '../context/LibraryContext';
import { NameProvider } from '../context/NameContext';

export default function Layout() {
    return (
        <NameProvider>
            <LibraryProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {
                            backgroundColor: '#ffffff',
                        },
                    }}
                />
            </LibraryProvider>
        </NameProvider>
    );
}
