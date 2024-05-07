import { Text as TextComponent } from 'react-native'

const Text = ({ children, ...props }) => {
    return (
        <TextComponent {...props} className={`font-[Poppins-Regular] ${props.className}`}>{children}</TextComponent>
    )
}

export default Text
