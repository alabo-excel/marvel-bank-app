"use client"

import { router } from "expo-router"
import { useState, useRef, useEffect } from "react"
import { KeyboardAvoidingView, Platform, Pressable, Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { authenticateWithBiometrics } from "@/src/utils/BiometricsAuth";
import { formatBalance } from "@/src/utils/data";
import { useAtom } from "jotai";
import { balanceAtom, transactionsAtom } from "@/src/store/jotai";
import BankDropdown from "@/src/components/Banks";

export default function TransferPage() {
  const [amount, setAmount] = useState("")
  const [receivingBank, setReceivingBank] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [narration, setNarration] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const refRBSheet = useRef<any>(null);
  const [balance, setBalance] = useAtom(balanceAtom)
  const [transactions, setTransactions] = useAtom(transactionsAtom)

  const processTransaction = (
    amount: number,
    type: 'debit' | 'credit',
    description: string,
    receiver: string
  ): { success: boolean; newBalance?: number; error?: string } => {
    // Convert amount to number if it's a string
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount

    // Validate input
    if (isNaN(numericAmount)) {
      return { success: false, error: 'Invalid amount' };
    }

    if (numericAmount <= 0) {
      return { success: false, error: 'Amount must be positive' };
    }

    // Check for sufficient balance for debit transactions
    if (type === 'debit' && numericAmount > balance) {
      return { success: false, error: 'Insufficient funds' };
    }

    // Calculate new balance
    const newBalance = type === 'credit'
      ? balance + numericAmount
      : balance - numericAmount;

    // Create transaction record
    const transaction = {
      id: Date.now().toString(),
      amount: numericAmount,
      receiver,
      type,
      description,
      date: new Date(),
      balanceAfter: newBalance,
    };

    // Atomic update of both state variables
    setBalance(newBalance);
    setTransactions(prev => [...prev, transaction]);

    return { success: true, newBalance };
  };

  const handleTransfer = async () => {
    if (!amount || !receiverName) {
      alert('Please enter amount and recipient name');
      return;
    }

    setIsProcessing(true);

    try {
      const authSuccess = await authenticateWithBiometrics();
      if (!authSuccess) {
        alert('Authentication failed');
        return;
      }

      const result = processTransaction(
        parseFloat(amount),
        'debit',
        narration || 'Transfer',
        receiverName
      );

      if (result.success) {
        router.push('/wallet');
      } else {
        alert(result.error || 'Transfer failed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      alert('An error occurred during transfer');
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    refRBSheet.current?.open()
  }, [])

  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 pt-12 pb-4">
          <TouchableOpacity className="mr-4" onPress={() => router?.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Transfer Money</Text>
        </View>

        {/* Safety Alert */}
        <Pressable onPress={() => refRBSheet.current?.open()}>
          <View className="mx-4 mb-6 bg-red-100 rounded-md p-3 flex-row items-center">
            <MaterialCommunityIcons name="alert-decagram" size={24} color="#F87171" />
            <Text className="ml-2 text-red-600">Click to review safety tips. Stay alert</Text>
          </View>
        </Pressable>

        {/* Form */}
        <View className="px-4">
          {/* Amount */}
          <View className="mb-6">
            <Text className="text-base font-medium mb-2">Amount</Text>
            <TextInput
              className="bg-white p-4 rounded-md border border-gray-200"
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View className="flex-row justify-end mt-1">
              <Text className="text-[#0CB9DE]">Your balance: {"₦" + formatBalance(balance)}</Text>
            </View>
          </View>

          {/* Receiving Bank */}
          <View>
            <BankDropdown />
          </View>          {/* <View className="mb-6">
            <Text className="text-base font-medium mb-2">Receiving Bank</Text>
            <TouchableOpacity className="bg-white p-4 rounded-md border border-gray-200 flex-row justify-between items-center">
              <Text className="text-gray-400">Select Receiving Bank</Text>
              <AntDesign name="caretdown" size={18} color="black" />
            </TouchableOpacity>
          </View> */}

          {/* Receiver Name */}
          <View className="mb-6">
            <Text className="text-base font-medium mb-2">Receiver name</Text>
            <TextInput
              className="bg-white p-4 rounded-md border border-gray-200"
              placeholder="Receiver name"
              value={receiverName}
              onChangeText={setReceiverName}
            />
          </View>

          {/* Narration */}
          <View className="mb-6">
            <Text className="text-base font-medium mb-2">Narration</Text>
            <TextInput
              className="bg-white p-4 rounded-md border border-gray-200 h-24"
              placeholder="Enter Narration"
              multiline={true}
              textAlignVertical="top"
              value={narration}
              onChangeText={setNarration}
            />
          </View>
        </View>

        {/* Spacer */}
        <View className="h-32" />
      </ScrollView>

      {/* Safety Tips Bottom Sheet */}
      <RBSheet
        ref={refRBSheet}
        customStyles={{ container: { borderTopLeftRadius: 10, borderTopRightRadius: 10 } }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
      >
        <View className="p-6">
          <View className="flex-row justify-between mb-3">
            <Text className="font-bold text-xl">Stay Secure While Sending Money</Text>
            <TouchableOpacity onPress={() => refRBSheet.current.close()}>
              <AntDesign name="closecircleo" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row mb-3">
            <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
            <Text className="text-lg">Double-check recipient details. Avoid sending to the wrong account.</Text>
          </View>
          <View className="flex-row mb-3">
            <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
            <Text className="text-lg">Beware of urgency scams. If someone is rushing you, it could be fraud.</Text>
          </View>
          <View className="flex-row mb-3">
            <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
            <Text className="text-lg">Don&apos;t reuse OTPs. Each one is unique for a reason.</Text>
          </View>
          <View className="flex-row mb-3">
            <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
            <Text className="text-lg">Only send from secure devices. Avoid public Wi-Fi when making transfers.</Text>
          </View>
        </View>
      </RBSheet>

      {/* Transfer Button - Fixed at bottom */}
      <View className="px-4 py-4 bg-gray-50">
        <TouchableOpacity
          className="bg-[#0CB9DE] py-4 rounded-full items-center"
          onPress={handleTransfer}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-base">Make Transfer</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}