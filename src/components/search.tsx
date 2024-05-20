/* eslint-disable no-undef */
import React from 'react';
import { View, TouchableOpacity, Image, Modal, } from 'react-native';

interface ISearchProps {
    items: string[];
    selected: string
    title: string
    onSelect: (item: string) => void;
}

import { Picker } from '@react-native-picker/picker';
import Text from './Text';


export const Search = ({ items, title, selected, onSelect }: ISearchProps) => {

    const [isPickerOpen, setIsPickerOpen] = React.useState<boolean>(false)

    return (
        <View className='flex items-start'>
            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">{title}</Text>
            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-1.5`}>

                <TouchableOpacity className='flex py-2 pl-2' onPress={() =>
                    setIsPickerOpen(!isPickerOpen)
                }>
                    <Text>
                        {selected}
                    </Text>
                    <View className='absolute right-2 top-3'>
                        <Image source={require('../assets/icons/arrow-down.png')} className="h-4 w-4" />
                    </View>
                </TouchableOpacity>
            </View>

            {
                isPickerOpen &&

                <Modal visible={isPickerOpen} transparent={false} animationType="slide" className='bg-gray-300 flex items-center' presentationStyle='formSheet'>
                    <View className='h-full justify-center'>

                        <View className=''>
                            <Picker
                                selectedValue={selected}
                                onValueChange={(itemValue) => {
                                    onSelect(itemValue as string)
                                    setIsPickerOpen(false)
                                }}
                            >
                                {
                                    items.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </View>

                </Modal>
            }
        </View>
    );
};

