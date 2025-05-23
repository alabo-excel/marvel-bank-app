"use client"

import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, Alert  } from "react-native"
import { authenticateWithBiometrics } from "../utils/BiometricsAuth"

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => void
  navigation?: any
}

interface Credentials {
  email: string
  password: string
}

const validCredentials: Credentials[] = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "securepass" },
  { email: "test@test.com", password: "test123" },
  // Add more credentials as needed
]

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Check if credentials match any in the array
    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    )

    if (!isValid) {
      Alert.alert("Login Failed", "Invalid email or password")
      return
    }

    // If credentials are valid
    if (onLogin) {
      onLogin(email, password)
    }

    router.push('/wallet')
  }


  const handleBiometrics = async () => {
    // Handle transfer logic here
    const success = await authenticateWithBiometrics();
    if (success) {
      router.push('/wallet')
    }
    // Navigate back or to confirmation screen
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-6">
          <Text className="text-gray-400 mb-2">Welcome</Text>
          <Text className="text-2xl font-bold">Login to Your Account</Text>
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium mb-2">Email</Text>
          <TextInput
            className="bg-white p-4 rounded-md border border-gray-200"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mb-12">
          <Text className="text-base font-medium mb-2">Password</Text>
          <TextInput
            className="bg-white p-4 rounded-md border border-gray-200"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity className="bg-[#0CB9DE] py-4 rounded-full items-center" onPress={handleLogin}>
          <Text className="text-white font-semibold text-base">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center py-6" onPress={handleBiometrics}>
          <Text className="text-[#0CB9DE] font-semibold text-base">Login with biometrics</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
