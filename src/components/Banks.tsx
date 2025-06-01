
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native"
import { AntDesign } from "@expo/vector-icons"

const banks = [
  { id: "1", name: "Access Bank" },
  { id: "2", name: "First Bank" },
  { id: "3", name: "Guaranty Trust Bank (GTB)" },
  { id: "4", name: "Zenith Bank" },
  { id: "5", name: "United Bank for Africa (UBA)" },
  { id: "6", name: "Ecobank" },
  { id: "7", name: "Fidelity Bank" },
  { id: "8", name: "Stanbic IBTC Bank" },
  { id: "9", name: "Union Bank" },
  { id: "10", name: "Polaris Bank" },
]

export default function BankDropdown() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleSelectBank = (bankName: string) => {
    setSelectedBank(bankName)
    setModalVisible(false)
  }

  return (
    <View className="mb-6">
      <Text className="text-base text-white font-medium mb-2">Receiving Bank</Text>
      <TouchableOpacity 
        className="bg-[#23262B] p-4 rounded-md flex-row justify-between items-center"
        onPress={() => setModalVisible(true)}
      >
        <Text className={selectedBank ? "text-white" : "text-gray-400"}>
          {selectedBank || "Select Receiving Bank"}
        </Text>
        <AntDesign name="caretdown" size={18} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-[#080808] rounded-t-lg max-h-[70%]">
            <View className="border-b border-gray-200 p-4">
              <Text className="text-lg text-white font-semibold">Select Bank</Text>
            </View>
            <FlatList
              data={banks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4"
                  onPress={() => handleSelectBank(item.name)}
                >
                  <Text className="text-white">{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}