import { BlurView } from "expo-blur";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ColorizedBackground = ({ children }: { children: any }) => {
    return (
        <View className='flex-1 bg-white h-full'>
            <Image source={require('../assets/images/bg1.jpg')} className="absolute object-cover h-full w-full z-0" />
            <BlurView
                className='w-full h-full bottom-0 z-10 flex-1'
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    className='h-full w-full'
                >
                    {children}
                </LinearGradient>
            </BlurView>
        </View>
    );
};