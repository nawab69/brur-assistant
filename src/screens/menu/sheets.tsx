import { useEffect, useState } from "react"
import { Alert, Image, KeyboardAvoidingView, Modal, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import * as yup from "yup"
import { ErrorMessage, Formik, useFormik } from "formik"
import { Button } from "../../components/button"
export const ChangePassword = () => {


    // schema
    const schema = yup.object().shape({
        confirmPass: yup
            .string()
            .required('Please retype your password.')
            .oneOf([yup.ref('newPass')], 'Password does not match.'),
        newPass: yup
            .string()
            .required('Please Enter your password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        currPass: yup
            .string()
            .required('Please Enter your current password')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        // ),
    })

    const [secure, setSecure] = useState(true)

    const _handleChange = async (oldPassword: string, newPassword: string) => {
        try {
            // toast.loading("Changing password ...")
            // const data = await ChangePassword({ oldPassword, newPassword }).unwrap()
            // toast.success(data?.message)
        } catch (error: any) {
            // toast.dismiss()
            // toast.error(error?.data?.message || "Something went wrong")
        }
    }
    return (
        <View>
            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Change password</Text>
            <Formik
                initialValues={{ currPass: '', newPass: '', confirmPass: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    _handleChange(values.currPass, values.newPass)
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <KeyboardAvoidingView className="space-y-0">
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">New password</Text>
                            <View className="w-full">
                                <TextInput
                                    className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm"
                                    secureTextEntry={secure}
                                    autoCorrect={false}
                                    onChangeText={handleChange('newPass')}
                                    onBlur={handleBlur('newPass')}
                                    value={values.newPass}
                                    placeholder="***********"
                                    placeholderTextColor={'#E4E3E8'}
                                />
                                <TouchableOpacity className="absolute right-2 top-0 bottom-0 w-10 h-full flex items-center justify-center" onPress={() => setSecure(!secure)}>
                                    <Image source={!secure ? require('../../assets/icons/eye.png') : require('../../assets/icons/eye-off.png')} className="h-6 w-6" />
                                </TouchableOpacity>
                            </View>
                            <Text className="font-['Poppins-Medium'] text-red-500 text-xs bg-white px-2">{errors.newPass}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Confirm password</Text>
                            <View className="w-full">
                                <TextInput
                                    className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm"
                                    secureTextEntry={secure}
                                    autoCorrect={false}
                                    onChangeText={handleChange('confirmPass')}
                                    onBlur={handleBlur('confirmPass')}
                                    value={values.confirmPass}
                                    placeholder="***********"
                                    placeholderTextColor={'#E4E3E8'}
                                />
                                <TouchableOpacity className="absolute right-2 top-0 bottom-0 w-10 h-full flex items-center justify-center" onPress={() => setSecure(!secure)}>
                                    <Image source={!secure ? require('../../assets/icons/eye.png') : require('../../assets/icons/eye-off.png')} className="h-6 w-6" />
                                </TouchableOpacity>
                            </View>
                            <Text className="font-['Poppins-Medium'] text-red-500 text-xs bg-white px-2">{errors.confirmPass}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Current password</Text>
                            <View className="w-full">
                                <TextInput
                                    className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm"
                                    secureTextEntry={secure}
                                    autoCorrect={false}
                                    onChangeText={handleChange('currPass')}
                                    onBlur={handleBlur('currPass')}
                                    value={values.currPass}
                                    placeholder="***********"
                                    placeholderTextColor={'#E4E3E8'}
                                />
                                <TouchableOpacity className="absolute right-2 top-0 bottom-0 w-10 h-full flex items-center justify-center" onPress={() => setSecure(!secure)}>
                                    <Image source={!secure ? require('../../assets/icons/eye.png') : require('../../assets/icons/eye-off.png')} className="h-6 w-6" />
                                </TouchableOpacity>
                            </View>
                            <Text className="font-['Poppins-Medium'] text-red-500 text-xs bg-white px-2">{errors.currPass}</Text>
                        </View>
                        <Button disabled={false} onPress={handleSubmit}>Update</Button>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View>
    )
}