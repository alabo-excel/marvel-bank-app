import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
import "../../global.css"
import { Provider } from 'jotai'

// import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff" },
          }} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
