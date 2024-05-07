import { View, Text, Image, TouchableOpacityBase, TouchableOpacity, FlatList, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Portal } from '@gorhom/portal'
import { Sheet } from '../../components/sheet'
import { ChangePassword } from './sheets'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { logout, selectCurrentUser, unsetCredentialLocally } from '../../redux/slices/auth/authSlice'
import { routes } from '../../constant'
const UpdateProfile = ChangePassword;

interface cardProps {
    title: string,
    image: any,
    component?: JSX.Element,
    snap?: string[]
}

const constant = {
    "CHANGE_PASSWORD": "Change password",
    "UPDATE_PROFILE": "Update profile",
}
const list: cardProps[] = [
    {
        title: constant.CHANGE_PASSWORD,
        image: require('../../assets/icons/user.png'),
        component: <ChangePassword />,
        snap: ['56%']
    },
    {
        title: constant.UPDATE_PROFILE,
        image: require('../../assets/icons/user.png'),
        component: <UpdateProfile />,
        snap: ['56%']
    }
]

export default function Menu({ navigation }: { navigation: any }) {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(selectCurrentUser)

    const [state, setState] = useState({
        [constant.CHANGE_PASSWORD]: false,
        [constant.UPDATE_PROFILE]: false
    })



    const _toggle = (key: string) => {
        Object.keys(state).forEach((item) => {
            setState({ ...state, [item]: false })
        })
        Object.keys(state).forEach((item) => {
            if (item === key) {
                setState({ ...state, [item]: true })
            }
        })
    }

    const _logout = () => {
        dispatch(unsetCredentialLocally())
        dispatch(logout())
        navigation.navigate(routes.LOGIN)
    }
    return (
        <>
            <View className="flex-1 bg-[#F4F3FF]">
                <View className="px-5 my-auto">
                    <View className='border-2 rounded-2xl w-contain mx-auto p-1 mt-6'>
                        <Image source={require('../../assets/images/profile.png')} className="h-24 w-24 rounded-xl" />
                    </View>
                    <View className='my-3'>
                        <Text className="text-black text-lg font-['Poppins-Medium'] mx-auto text-center mb-2">{user?.name}</Text>
                        <Text className="text-slate-400 text-xs font-['Poppins-Medium'] mx-auto">{user?.email}</Text>
                    </View>
                </View>
                <View className="bg-white mt-auto rounded-t-3xl px-5 py-8">
                    <FlatList
                        data={list}
                        renderItem={({ item, index }) => <CardItem toggle={_toggle} index={index} card={item} />}
                    />

                    {/* <TouchableOpacity key={"twa"} className="my-3" onPress={() => setIsTwa(true)}>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row gap-x-6'>
                                <Image source={require('../../../assets/profile/shield.png')} className="h-7 w-7" />
                                <Text className="text-black text-lg font-['Poppins-Medium'] mx-auto">Two factor authentication</Text>
                            </View>
                            <Image source={require('../../../assets/arrow-right.png')} className="h-3" style={{ resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity key={"logout"} className="my-5" onPress={_logout}>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row gap-x-6'>
                                <Image source={require('../../assets/icons/menu.png')} className="h-7 w-7" />
                                <Text className="text-black text-lg font-['Poppins-Medium'] mx-auto">Logout</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            <Portal>
                {Object.entries(state).map((item, index) => {
                    return item[1] && (
                        <Sheet snaps={list?.[index]?.snap || ['75%']} setIsOpen={() => setState({ ...state, [item[0]]: false })}>
                            <View>{list?.[index]?.component}</View>
                        </Sheet>
                    )
                })}
            </Portal>
            <Portal>
                {/* {isTwa && (
                    <Sheet setIsOpen={() => setIsTwa(false)}>
                        <Twa onClick={() => setIsTwa(false)} />
                    </Sheet>
                )} */}

            </Portal>
        </>
    )
}

const CardItem = ({ card, index, toggle }: { index: number, card: cardProps, toggle: (key: string) => void }): JSX.Element => {
    return (<>
        <TouchableOpacity key={index} className="my-3" onPress={() => toggle(card.title)}>
            <View className='flex-row justify-between items-center'>
                <View className='flex-row gap-x-6'>
                    <Image source={card.image} className="h-7 w-7" />
                    <Text className="text-black text-lg font-['Poppins-Medium'] mx-auto">{card.title}</Text>
                </View>
                <Image source={require('../../assets/icons/arrow-right.png')} className="h-3" style={{ resizeMode: 'contain' }} />
            </View>
        </TouchableOpacity>
    </>)
}