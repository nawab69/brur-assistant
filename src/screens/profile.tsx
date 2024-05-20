import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ColorizedBackground } from '../components/colorized-background';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';
import { useGetProfileQuery } from '../redux/slices/profile/profileSlice';
import { Button } from '../components/button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Sheet } from '../components/sheet';
import { CreateProfile } from '../components/profile';

export const Profile = () => {

    const user = useSelector(selectCurrentUser);

    const { data: profile, isError, error, isLoading } = useGetProfileQuery();

    const [isCreateProfileOpen, setIsCreateProfileOpen] = useState<boolean>(false);

    if (isError && error as string === 'Profile not found') {
        return (

            <View className="flex-1">
                <View className='bg-purple-600 pt-16 pb-4'>
                    <Text className="text-xl font-[Poppins-Bold] text-white text-center tracking-wide">Profile</Text>
                </View>
                <View className="flex-1 items-center justify-center">
                    <Image source={require('../assets/images/404.png')} className="w-64 h-64 mb-4  border-white" />
                    <Text className="text-2xl font-[Poppins-SemiBold] text-center text-purple-500 mt-4">Profile not found</Text>
                    <TouchableOpacity
                        className="px-4 py-2 mt-4 bg-purple-200 border-purple-500 border-2 rounded-lg"
                        onPress={() => {
                            setIsCreateProfileOpen(true)
                        }}
                        disabled={false}
                    ><Text className='text-purple-600'>Create Profile</Text></TouchableOpacity>
                </View>

                {isCreateProfileOpen && (
                    <Sheet snaps={['92%']} setIsOpen={() => setIsCreateProfileOpen(false)} enablePanDownToClose={true}>
                        <View className="flex-1">
                            <View className='py-4'>
                                <Text className="text-xl font-[Poppins-Bold] text-center tracking-wide">Create Profile</Text>
                            </View>
                            <View className="flex-1">
                                <CreateProfile />
                            </View>
                        </View>
                    </Sheet>
                )}
            </View>


        )
    }

    if (isLoading) return (
        <View className='h-full w-full flex flex-1 items-center justify-center'><ActivityIndicator /></View>
    )

    const year = parseInt((parseInt(profile.semester) / 2).toString());
    const semester = (parseInt(profile.semester) % 2) == 0 ? '2nd' : '1st';

    const parseYear = (year: number) => {
        switch (year) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            case 4:
                return '4th';
            default:
                return '5th';
        }
    }

    return (

        <View className="flex-1 mt-24">
            <View className="flex items-center justify-center pt-8">
                <Image
                    source={{ uri: require('../assets/images/404.png') }}
                    className="w-32 h-32 mb-4 rounded-full border-4 border-white"
                />
                <Text className="text-2xl font-bold mb-2 text-center">{profile?.fullName}</Text>
                <Text className="text-lg font-medium mb-4">
                    {`Department of ${profile?.department?.name}`}
                </Text>
            </View>
            <View className="p-4">
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="font-semibold">Year:</Text>
                    <Text>{parseYear(year)}</Text>
                </View>
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="font-semibold">Semester</Text>
                    <Text>{semester}</Text>
                </View>
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="font-semibold">Session:</Text>
                    <Text>{profile.session}</Text>
                </View>
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="font-semibold">ID:</Text>
                    <Text>{profile.user?.studentId}</Text>
                </View>
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="font-semibold">Registration No:</Text>
                    <Text>{profile.regNo}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <Text className="font-semibold">Email:</Text>
                    <Text>{profile.user?.email}</Text>
                </View>
            </View>
        </View>

    )
}
