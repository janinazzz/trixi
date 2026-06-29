import { Stack } from 'expo-router';
import { LibraryProvider } from '../context/LibraryContext';
import { NameProvider } from '../context/NameContext';
import { ProfileProvider } from '../context/ProfileContext';
import { Colors } from '../theme/colors';

export default function Layout() {
    return (
        <NameProvider>
            <ProfileProvider>
                <LibraryProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: Colors.white,
                            },
                        }}
                    />
                </LibraryProvider>
            </ProfileProvider>
        </NameProvider>
    );
}
