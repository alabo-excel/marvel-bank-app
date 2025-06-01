import { StatusBar } from "react-native"
import { ScrollView, Image, Text, TouchableOpacity, View, Pressable } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { TourGuideProvider, TourGuideZone, TourGuideZoneProps, useTourGuideController } from 'rn-tourguide';
import RBSheet from 'react-native-raw-bottom-sheet';
import { formatBalance } from '../../utils/data'
import { useAtom } from "jotai";
import { balanceAtom, isFirstTime, transactionsAtom } from "@/src/store/jotai";
import { formatDate } from "@/src/utils/formatTime";
import { Platform, Dimensions } from "react-native"


function App() {
  const [show, setShow] = useState(true)
  const refRBSheet = useRef<any>(null);
  const refRBSheet2 = useRef<any>(null);
  const [balance, _] = useAtom(balanceAtom)
  const [transactions, __] = useAtom(transactionsAtom)
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const [firstTime, setIsFirstTime] = useAtom(isFirstTime)
  const {
    start, // a function to start the tourguide
  } = useTourGuideController()

  return (

    <View className="flex-1 p-2 bg-[#080808]">
      {/* <StatusBar style="dark" /> */}
      {/* <StatusBar
        hidden={true} /> */}
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-gray-300 mr-3" />
          <Text className="text-lg text-white font-semibold">Hello James</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full">
          <FontAwesome name="bell-o" size={18} color="#0CB9DE" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1">
        {/* Balance Card */}
        <TourGuideZone
          zone={1}
          text="See your account balance. Click on the eye icon to close/reveal the amount visibility"
          borderRadius={30}

        >
          <View className="mx-4 my-2 bg-[#00CFFF] rounded-3xl p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-[#1E1E1E] mb-2">Your balance</Text>
                <Text className="text-4xl text-[#1E1E1E] font-bold">{show ? "₦" + formatBalance(balance) : '******'}</Text>
                <Text className="text-[#1E1E1E] mt-2">Nigeria Naira</Text>
              </View>
              <TouchableOpacity onPress={() => setShow(!show)} >
                {show ? <Ionicons name="eye-off-outline" size={24} color="#CCCCCC" /> : <Ionicons name="eye-outline" size={24} color="#CCCCCC" />}
              </TouchableOpacity>
            </View>
          </View>
        </TourGuideZone>

        {/* Action Buttons */}
        <View className="flex-row justify-between mx-4 my-2">
          <TourGuideZone
            zone={2}
            text="Click here to add money to your account"
            borderRadius={10}

          >
            <View className="">
              <TouchableOpacity
                className="flex-row items-center justify-center bg-transparent border border-[#0CB9DE] rounded-full py-3 px-6">
                <Feather name="plus" size={20} color="#0CB9DE" />
                <Text className="ml-2 text-[#0CB9DE] font-medium">Add Money</Text>
              </TouchableOpacity>
            </View>
          </TourGuideZone>
          <TourGuideZone
            zone={3}
            text="Click here to send money"
            borderRadius={10}
          >
            <View className="">
              <TouchableOpacity onPress={() => {
                router.push('/transfer'),
                  setIsFirstTime(false)
              }} className="flex-row items-center justify-center bg-[#0CB9DE] rounded-full py-3 px-6">
                <Feather name="send" size={20} color="white" />
                <Text className="ml-2 text-white font-medium">Transfer</Text>
              </TouchableOpacity>
            </View>
          </TourGuideZone>
          <TourGuideZone
            zone={4}
            text="Click here to see your account details"
            borderRadius={10}
          >
            <View nativeID="transactions" className="w-12 h-12 rounded-full my-auto bg-[#F8EDEB] items-center justify-center">
              <Text className="text-red-500 text-xl">🏦</Text>
            </View>
          </TourGuideZone>
        </View>


        {/* Info Cards */}
        <View className="mx-4 my-2">
          {/* Security Card */}
          <Pressable onPress={() => refRBSheet.current.open()}>
            <View className="bg-[#23262B] rounded-xl p-4 mb-3 flex-row">
              <View className="w-10 h-10 rounded-full bg-[#4CAF50] items-center justify-center mr-3">
                <MaterialCommunityIcons name="shield-lock-outline" size={18} color="black" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-white text-base">Protect Your Account from Threats</Text>
                <Text className="text-white text-sm mt-1">
                  Stay safe while banking online. Learn how to protect your account from fraud and cyber threats.
                </Text>
              </View>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <AntDesign name="closecircleo" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </Pressable>
          {/* App Guide Card */}
          <Pressable onPress={() => start()}>
            <View className="bg-[#23262B] rounded-xl p-4 mb-3 flex-row">
              <View className="w-10 h-10 rounded-full bg-[#F48FB1] items-center justify-center mr-3">
                <MaterialIcons name="phone-android" size={18} color="black" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-base text-white">Get the Most Out of Your App</Text>
                <Text className="text-white text-sm mt-1">
                  A quick overview to help you get started and explore key features with ease.
                </Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="closecircleo" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </Pressable>

          {/* Privacy Card */}
          <Pressable onPress={() => refRBSheet2.current.open()}>
            <View className="bg-[#23262B] rounded-xl p-4 mb-3 flex-row">
              <View className="w-10 h-10 rounded-full bg-[#29B6F6] items-center justify-center mr-3">
                <MaterialCommunityIcons name="qrcode-scan" size={18} color="black" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-white  text-base">Your Privacy, Our Priority</Text>
                <Text className="text-white text-sm mt-1">
                  We value your privacy. Here&apos;s how we collect, store, and use your data. Transparency is key to trust.
                </Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="closecircleo" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>

        {/* Transactions */}
        <View className="mx-4 my-2">
          <Text className="font-bold text-white text-lg mb-2">Transactions</Text>
          {transactions.length >= 1 ? transactions.map((transaction: any, index: any) => <View key={index} className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mr-3">
              <Text>JD</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-white">{transaction.receiver}</Text>
              <Text className="text-[#ABABAB] text-xs">{formatDate(transaction.date)}</Text>
            </View>
            <Text className="font-bold text-red-500">-{formatBalance(transaction.amount)}</Text>
          </View>
          ) : <Text className="text-white">No available transactions</Text>}
          {/* Transaction Item - Positive */}
          {/* <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mr-3">
              <Text>JD</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold">Jane Doe</Text>
              <Text className="text-gray-500 text-xs">Yesterday • 12:20pm</Text>
            </View>
            <Text className="font-bold text-[#0096C7]">+$30,000</Text>
          </View> */}

          {/* Transaction Item - Negative */}
          {/* <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mr-3">
              <Text>JD</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold">Jane Doe</Text>
              <Text className="text-gray-500 text-xs">Yesterday • 12:20pm</Text>
            </View>
            <Text className="font-bold text-red-500">-$10,000</Text>
          </View> */}

        </View>
        <RBSheet
          ref={refRBSheet}
          customStyles={{ container: { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#080808" } }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
        >
          <View className="p-6">
            <View className="flex-row justify-between mb-3">
              <Text className="font-bold text-white text-xl">Cybersecurity Tips for Safe Banking</Text>
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <AntDesign name="closecircleo" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">Enable Two-Factor Authentication (2FA) to add an extra layer of security to your account.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">Never Share Your OTP or Password. No bank representative will ever ask for it.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">Use Strong Passwords.  Avoid using the same password for multiple apps.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">Be Wary of Phishing Links. Only click links from official sources.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">Keep Your App Updated. Updates fix known vulnerabilities.</Text>
            </View>
          </View>
        </RBSheet>
        <RBSheet
          ref={refRBSheet2}
          customStyles={{ container: { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#080808" } }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
        >
          <View className="p-6">
            <View className="flex-row justify-between mb-3">
              <Text className="font-bold text-white text-xl">Your Data, Your Rights</Text>
              <TouchableOpacity onPress={() => refRBSheet2.current.close()}>
                <AntDesign name="closecircleo" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">We only collect what’s necessary to provide secure, efficient banking services.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">Your data is encrypted both in transit and at rest.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">We never sell your data to third parties.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">You can review, download, or delete your personal data anytime via your profile settings.</Text>
            </View>
            <View className="flex-row mb-3">
              <Image className="mr-3" source={require("../../../assets/images/carat.png")} />
              <Text className="text-lg text-white">We use anonymized data for improving user experience and security.</Text>
            </View>
          </View>
        </RBSheet>
      </ScrollView>
    </View>
    // </CopilotProvider>
  )
}

export default function AppwithProvider() {
  const [firstTime, _] = useAtom(isFirstTime)

  return (
    <TourGuideProvider startAtMount={firstTime} {...Platform.select({
      android: {
        backdropColor: 'rgba(0,0,0,0.7)',
        androidStatusBarVisible: true,
        tooltipStyle: {
          marginTop: StatusBar.currentHeight,
          // elevation: 24,
        }
      }
    })} >
      <App />
    </TourGuideProvider>
  )
};