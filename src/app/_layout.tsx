import { DarkTheme, DefaultTheme, ThemeProvider, useNavigationContainerRef } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../../global.css";
import { Provider } from 'jotai';
import { AppState, AppStateStatus } from 'react-native';
import { useEffect, useRef } from 'react';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  const appState = useRef(AppState.currentState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const logout = () => {
    // You can also clear your Jotai auth state here
    router.replace('/'); // Assumes you have a /login route
  };

  const startInactivityTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        startInactivityTimer(); // App moved to background
      }

      if (nextAppState === 'active') {
        // App came back to foreground
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!loaded) return null;

  return (
    <Provider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff" },
          }}
        />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
