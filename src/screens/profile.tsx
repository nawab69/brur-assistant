import { View, Text, Image } from 'react-native'
import React from 'react'
import { ColorizedBackground } from '../components/colorized-background';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';

export const Profile = () => {

    const user = useSelector(selectCurrentUser);
    const profileData = {
        profilePicture: require('../assets/images/profile.png'),
        name: user?.name,
        departmentName: 'Computer Science and Engineering',
        year: '3rd',
        semester: '1st',
        session: '2019-2020',
        id: user?.studentId,
        registrationNo: '000012730',
        email: user?.email,
    };
    return (
        <ColorizedBackground>
            <View className="flex-1 mt-24">
                <View className="flex items-center justify-center pt-8">
                    <Image
                        source={profileData.profilePicture}
                        className="w-32 h-32 mb-4 rounded-full border-4 border-white"
                    />
                    <Text className="text-2xl font-bold mb-2 text-center">{profileData.name}</Text>
                    <Text className="text-lg font-medium mb-4">
                        {profileData.departmentName}
                    </Text>
                </View>
                <View className="p-4">
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="font-semibold">Year:</Text>
                        <Text>{profileData.year}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="font-semibold">Semester:</Text>
                        <Text>{profileData.semester}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="font-semibold">Session:</Text>
                        <Text>{profileData.session}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="font-semibold">ID:</Text>
                        <Text>{profileData.id}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="font-semibold">Registration No:</Text>
                        <Text>{profileData.registrationNo}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="font-semibold">Email:</Text>
                        <Text>{profileData.email}</Text>
                    </View>
                </View>
            </View>
        </ColorizedBackground>
    )
}
