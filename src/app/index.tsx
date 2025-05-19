"use client"

import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { authenticateWithBiometrics } from "../utils/BiometricsAuth"

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => void
  navigation?: any
}

export default function LoginScreen({ onLogin, navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (onLogin) {
      onLogin(email, password)
    }

    router.push('/wallet')
    // If using with navigation
    // if (navigation) {
    //   navigation.navigate("Home")
    // }
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
