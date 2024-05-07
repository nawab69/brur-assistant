import { ActivityIndicator } from "react-native"
import { Text, TouchableOpacity } from "react-native"

interface IButton {
    disabled: boolean
    children: string
    onPress: () => void
}

export const Button = ({ children, onPress, disabled }: IButton) => {
    return (
        <TouchableOpacity disabled={disabled} className={`${disabled && "opacity-75"} flex h-12 items-center justify-center bg-purple-500 rounded-lg my-2`} onPress={onPress}>
            {disabled ? <ActivityIndicator /> : <Text className="text-white font-['Poppins-Bold']  text-center rounded-lg w-full my-3">{children}</Text>}
        </TouchableOpacity>
    )
}