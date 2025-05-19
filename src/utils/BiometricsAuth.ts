import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';
import { router } from 'expo-router';

/**
 * Checks if biometric authentication is available on the device
 * @returns Promise<boolean> - true if biometrics are available, false otherwise
 */
export const isBiometricAuthAvailable = async (): Promise<boolean> => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'Biometric hardware not available');
      return false;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No biometrics enrolled');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking biometric availability:', error);
    return false;
  }
};

/**
 * Attempts biometric authentication
 * @returns Promise<boolean> - true if authentication succeeded, false otherwise
 */
export const authenticateWithBiometrics = async (): Promise<boolean> => {
  try {
    const isAvailable = await isBiometricAuthAvailable();
    if (!isAvailable) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with biometrics',
      fallbackLabel: 'Use Passcode',
      disableDeviceFallback: false,
    });

    if (result.success) {
      router.push('/wallet');
      return true;
    } else {
      Alert.alert('Authentication failed');
      return false;
    }
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return false;
  }
};

/**
 * Utility function to check auth and navigate to wallet if successful
 */
export const checkAuthAndNavigate = async (): Promise<void> => {
  const isAuthenticated = await authenticateWithBiometrics();
  if (isAuthenticated) {
    router.push('/wallet');
  }
};