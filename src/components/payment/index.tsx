import { ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";
import { Image } from "react-native";

enum PaymentType {
    Bkash = 'Bkash',
    Nagad = 'Nagad',
    Rocket = 'Rocket',
}






export function Payment({ close }: { close?: any }) {

    const [type, setType] = useState<PaymentType | string>("")
    const [aid, setAID] = useState<string | number>("")
    const [amount, setAmount] = useState<number>(0)


    return (
        <KeyboardAvoidingView>
            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Pay Now</Text>

            <View className="space-y-0">

                <Search title='Select Payment Method *' items={Object.values(PaymentType)} onSelect={(selected) => { setType(selected as PaymentType) }} selected={type} />
                <View className="flex items-start">
                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">AID *</Text>
                    <TextInput className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={aid.toString()} onChangeText={(value) => setAID(value)} keyboardType="numeric" />
                </View>
                <View className="flex items-start">
                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Total Amount *</Text>
                    <TextInput className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={aid.toString()} onChangeText={(value) => setAID(value)} keyboardType="numeric" />
                </View>
                <Button disabled={false} onPress={() => { }}>Proceed to Payment</Button>
            </View>
        </KeyboardAvoidingView>
    )
}