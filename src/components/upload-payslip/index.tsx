import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";
import { Image } from "react-native";
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker';

export function UploadPayslip({ close }: { close?: any }) {

    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState(new Date())
    const [aid, setAID] = useState("")
    const [photos, setPhotos] = useState<any>(null);



    // hanldlers
    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, (response: any) => {
            if (response.assets) {
                // const photos = response.assets.filter(asset => ({ name: asset.fileName, uri: asset.uri, type: asset.type }))
                setPhotos(response.assets)
            }
        })
    };
    const _filter = (index: number) => {
        // @ts-ignore
        const newPhotos = photos.filter(i => i !== photos[index])
        setPhotos(newPhotos)
    }

    return (
        <KeyboardAvoidingView>
            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Upload Playslip</Text>

            <View className="space-y-0">
                <TouchableOpacity className="flex items-start" onPress={() => setOpen(true)}>
                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Payment Date *</Text>
                    <TextInput editable={false} className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={date.toLocaleDateString()} />
                </TouchableOpacity>
                <View className="flex items-start">
                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">AID *</Text>
                    <TextInput className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={aid} />
                </View>
            </View>

            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                mode="date"
            />

            <View className=''>
                <TouchableOpacity className='flex justify-center items-center space-y-2 border-2 border-dashed border-[#4A3FBC] p-4 mt-4' style={{ borderRadius: 10, borderStyle: 'dotted' }} onPress={handleChoosePhoto}>
                    <Image source={require('../../assets/icons/export.png')} className="h-7 w-7" />
                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white z-10 px-2">Upload Payslip</Text>
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={photos}
                    horizontal
                    className='py-2.5'
                    renderItem={({ item, index }) =>
                        <View className='mt-3'>
                            <Image
                                key={item?.uri}
                                source={{ uri: item?.uri }}
                                className="h-24 w-[109px] rounded-lg object-cover m-1"
                            />
                            <TouchableOpacity className='flex items-center justify-center absolute top-3 right-3 bg-slate-500 p-1.5 rounded-lg' onPress={() => _filter(index)}>
                                <Image source={require('../../assets/icons/Vector.png')} className="h-3 w-3" />
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>

            <Button disabled={false} onPress={() => { }}>Submit</Button>

        </KeyboardAvoidingView>
    )
}