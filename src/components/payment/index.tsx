import { ActivityIndicator, Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";
import { Image } from "react-native";
import { usePayAdmissionMutation } from "../../redux/slices/payment/paymentSlice";
import { useToasts } from "../../utils/useToasts";






export function Payment({ amount, id, type }: { amount: number, id: string, type: string }) {

    const [selected, setSelected] = useState<string>('offline')
    const [loading, setLoading] = useState<boolean>(false)

    const [payAdmission] = usePayAdmissionMutation()

    const toast = useToasts()

    const handlePayment = async () => {
        try {
            const data = await payAdmission({ admissionId: id }).unwrap()
            console.log("Payment response", data)
            setLoading(true)
            if (data.url) await Linking.openURL(data.url)
            else toast.error('Payment failed')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <View className="flex h-full items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <View className="h-full flex-col justify-between">
            <View>
                <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Pay Now</Text>
            </View>


            <View className="space-y-4 flex-1">
                <View className="flex flex-row justify-between items-center bg-white px-4 py-2 rounded-lg">
                    <View>
                        <Text className="text-sm text-gray-800 font-[Poppins-SemiBold]">Total Amount</Text>
                        <Text className="text-xs text-gray-500">Total amount to be paid</Text>
                        <Text className="text-xs text-gray-500">৳ {amount}</Text>
                    </View>
                </View>

                <View className="flex justify-between bg-white px-4 py-2  rounded-lg mt-4">
                    <View className="mb-4">
                        <Text className="text-sm text-gray-800 font-[Poppins-SemiBold]">Payment Method</Text>
                        <Text className="text-xs text-gray-500">Choose your payment method</Text>
                    </View>
                    <View className='flex flex-col space-y-4 items-center'>
                        <TouchableOpacity className={`${selected === 'offline' ? 'bg-purple-600' : 'border-2 border-purple-600'} w-full py-4 text-center rounded-lg`} onPress={() => setSelected("offline")} >
                            <Text className={`text-center ${selected === 'offline' ? 'text-white' : 'text-black'} font-[Poppins-SemiBold]`}>Offline Payment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${selected === 'online' ? 'bg-purple-600' : 'border-2 border-purple-600'} w-full py-4 text-center rounded-lg`} onPress={() => setSelected("online")} >
                            <Text className={`text-center ${selected === 'online' ? 'text-white' : 'text-black'} font-[Poppins-SemiBold]`}>Online Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Button disabled={false} onPress={() => {
                    handlePayment()
                }}>Proceed to Payment</Button>
            </View>
            <View className="">
                <Image source={require("../../assets/images/Payment-Brands.jpg")} className="w-full h-48" />
            </View>

        </View>
    )
}