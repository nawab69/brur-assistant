import { Text, TouchableOpacity } from "react-native"

export const Back = ({ className, navigation }: { className?: string, navigation: any }) => {
    return (
        <TouchableOpacity className={["absolute top-[14px] mx-3 bg-indigo-500 w-14 px-2 py-1 rounded-full", className].join(' ')} onPress={() => navigation.goBack()}>
            <Text className="font-medium text-white mx-auto">Back</Text>
        </TouchableOpacity>
    )
}