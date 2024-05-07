import { ActivityIndicator, View } from "react-native"

export const Loader = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
        </View>
    )
}