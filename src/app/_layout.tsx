import { Stack } from 'expo-router';
import { LibraryProvider } from '../context/LibraryContext';
import { NameProvider } from '../context/NameContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function Layout() {
    return (
        <NameProvider>
            <ProfileProvider>
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
            </ProfileProvider>
        </NameProvider>
    );
}
