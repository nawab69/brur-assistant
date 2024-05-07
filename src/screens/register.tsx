import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import { ColorizedBackground } from "../components/colorized-background";
import { routes } from "../constant";
import { Formik } from "formik";
import * as yup from 'yup'
import { useToasts } from "../utils/useToasts";
import { useRegisterMutation } from "../redux/slices/auth/authApiSlice";
import { Button } from "../components/button";
import Text from "../components/Text";
import { MaterialIcons } from '@expo/vector-icons';

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    studentId: yup.string().required().min(7),
    password: yup
        .string()
        .required('Please Enter your password')
        .min(8)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    confirmpass: yup
        .string()
        .min(8)
        .required('Please retype your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.')
})

export const Register = ({
    navigation,
}: any) => {
    // hook
    const toast = useToasts()

    // api
    const [register, { isLoading }] = useRegisterMutation()


    const handleRegister = async (email: string, password: string, name: string, studentId: string) => {
        console.log(email, password, name, studentId)
        try {
            toast.dismiss()
            toast.loading("Signing up ...")
            const user = await register({ email, password, name, studentId }).unwrap()
            if (user && user?.email) {
                toast.success("Sign up successful.")
                navigation.navigate(routes.LOGIN)
            } else {
                throw new Error("Something went wrong")
            }
        } catch (error: any) {
            console.log(error)
            toast.dismiss()
            toast.error(error?.message)
        }
    };

    return (

        <ScrollView className="flex-1 px-6">
            <View className="mt-20">
                <Text className="text-3xl text-center font-bold text-purple-500 tracking-wider font-[Poppins-Bold]">Create New Account</Text>
            </View>
            <Formik
                initialValues={{ email: '', password: '', confirmpass: '', name: '', studentId: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const { email, password, name, studentId } = values
                    handleRegister(email, password, name, studentId)
                    // actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View className="flex-1 mt-20">

                        <View className="mb-4">
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                placeholder="Name"
                                className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                            />
                            <View className="absolute top-3 ml-2">
                                <MaterialIcons name="account-box" size={28} color="rgb(168 85 247)" />
                            </View>
                            {
                                errors.name && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.name}</Text>
                            }
                        </View>
                        <View className="mb-4">
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}

                                placeholder="Email"
                                className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                            />
                            <View className="absolute top-3 ml-2">
                                <MaterialIcons name="email" size={28} color="rgb(168 85 247)" />
                            </View>
                            {
                                errors.email && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.email}</Text>
                            }
                        </View>
                        <View className="mb-4">
                            <TextInput
                                onChangeText={handleChange('studentId')}
                                onBlur={handleBlur('studentId')}
                                value={values.studentId}

                                placeholder="Student Id"
                                className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                            />
                            <View className="absolute top-3 ml-2">
                                <MaterialIcons name="numbers" size={28} color="rgb(168 85 247)" />
                            </View>
                            {
                                errors.studentId && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.studentId}</Text>
                            }
                        </View>
                        <View className="mb-4">
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Password"
                                className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                                secureTextEntry
                            />
                            <View className="absolute top-3 ml-2">
                                <MaterialIcons name="password" size={28} color="rgb(168 85 247)" />
                            </View>
                            {
                                errors.password && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.password}</Text>
                            }
                        </View>
                        <View className="mb-4">
                            <TextInput
                                onChangeText={handleChange('confirmpass')}
                                onBlur={handleBlur('confirmpass')}
                                value={values.confirmpass}
                                placeholder="Confirm Password"
                                className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                                secureTextEntry
                            />
                            <View className="absolute top-3 ml-2">
                                <MaterialIcons name="password" size={28} color="rgb(168 85 247)" />
                            </View>
                            {
                                errors.confirmpass && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.confirmpass}</Text>
                            }
                        </View>

                        <Button disabled={isLoading} onPress={handleSubmit}>Sign Up</Button>


                        <View className="mt-10 flex-row items-end mb-20 justify-center flex-1 ">
                            <Text className="text-purple-500 items-center justify-center">Already have an account?</Text>
                            <TouchableOpacity onPress={() => {
                                // Navigate to register screen
                                navigation.navigate(routes.LOGIN);
                            }}>
                                <Text className="text-purple-500 underline ml-1 font-[Poppins-Bold]">Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)}
            </Formik>
        </ScrollView>


    )
}