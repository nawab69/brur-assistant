import React, { useState } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import Text from '../Text'
import { useGetRecentAdmissionQuery, useGetRecentFormQuery } from '../../redux/slices/profile/profileSlice'
import { Sheet } from '../sheet'
import { Payment } from '../payment'
import { routes } from '../../constant'
import { useNavigation } from '@react-navigation/native'

const Recent = () => {

    const { data } = useGetRecentAdmissionQuery()
    const { data: formData } = useGetRecentFormQuery()
    console.log(data)

    const navigation = useNavigation()
    return (
        <>
            <View className='flex space-y-2'>
                <View className="flex flex-row justify-between items-center bg-white px-4 py-2 w-[90%] rounded-lg">
                    <View>

                        <Text className="text-sm text-gray-800 font-[Poppins-SemiBold]">Form Fill Up</Text>
                        {/* Badge of status */}
                        <Text className="text-xs text-gray-500">{new Date(formData?.createdAt).toLocaleDateString('en', {
                            dateStyle: 'medium',
                        })}</Text>

                        <View className="flex flex-row items-center space-x-2 mt-1">
                            <View className="w-3 h-3 bg-green-500 rounded-full"></View>
                            <Text className="text-xs text-green-500">{formData?.status}</Text>
                        </View>
                    </View>

                    <View className='flex flex-row space-x-2 items-center'>
                        <TouchableOpacity>
                            <Image source={require('../../assets/icons/download.png')} className="w-8 h-8" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../assets/icons/pay.png')} className="w-16 h-10" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View className="flex flex-row justify-between items-center bg-white px-4 py-2 w-[90%] rounded-lg">
                    <View>
                        <Text className="text-sm text-gray-800 font-[Poppins-SemiBold]">Admission form</Text>
                        {/* Badge of status */}
                        <Text className="text-xs text-gray-500">{new Date(data?.createdAt).toLocaleDateString('en', {
                            dateStyle: 'medium',
                        })}</Text>

                        <View className="flex flex-row items-center space-x-2 mt-1">
                            <View className="w-3 h-3 bg-green-500 rounded-full"></View>
                            <Text className="text-xs text-green-500">{data?.status}</Text>
                        </View>
                    </View>

                    <View className='flex flex-row space-x-2 items-center'>
                        <TouchableOpacity>
                            <Image source={require('../../assets/icons/download.png')} className="w-8 h-8" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {

                            navigation.navigate(
                                // @ts-ignore
                                routes.PAYMENT,
                                { id: data?._id, type: 'admission', amount: data?.totalFee },
                            )
                        }}>
                            <Image source={require('../../assets/icons/pay.png')} className="w-16 h-10" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </>
    )
}

export default Recent
