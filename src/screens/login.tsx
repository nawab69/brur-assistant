import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, TextInput, TouchableOpacity, View } from "react-native"
import { routes } from "../constant";
import { Formik } from "formik";
import * as yup from 'yup'
import { useLoginMutation } from "../redux/slices/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useToasts } from "../utils/useToasts";
import { setCredentials, setCredentialsLocally } from "../redux/slices/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../components/button";
import { MaterialIcons } from '@expo/vector-icons';
import Text from "../components/Text";


const schema = yup.object({
    email: yup.string().email().required(),
    password: yup
        .string()
        .required('Please Enter your password')
})

export const Login = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(true)

    const [login, { isLoading }] = useLoginMutation()
    const toast = useToasts()


    const _login = async (email: string, password: string) => {
        try {
            toast.dismiss()
            toast.loading("Loggin in...")
            const userData: any = await login({ email, password }).unwrap()
            const { token, refreshToken, ...user } = userData

            await dispatch(setCredentials({ token, refreshToken, user }))
            await dispatch(setCredentialsLocally({ token, refreshToken, user }))
            toast.success("Log in Successful")
            navigation.navigate(routes.BOTTOM_TAB)
        } catch (error: any) {
            console.log(error)
            toast.dismiss()
            toast.error(error?.message)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    const checkCurrentUser = async () => {
        console.log("loading", loading);
        try {
            const currentUser = await AsyncStorage.getItem('userInfo');
            const currentToken = await AsyncStorage.getItem('token');
            const currentRefreshToken = await AsyncStorage.getItem('refreshToken')

            const user = JSON.parse(currentUser!);
            const token = JSON.parse(currentToken!);
            const refreshToken = JSON.parse(currentRefreshToken!)

            console.log(user && user?.email && token, user, token)

            // Sent to HomeScreen is User is Available and token 
            if (user && user?.email && token && refreshToken) {
                dispatch(setCredentials({ user, token, refreshToken }));
                navigation.navigate(routes.BOTTOM_TAB);
                console.log("loading from layout effect", loading)
            }
        } catch (error: any) {
            toast.dismiss();
            toast.error(error?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        checkCurrentUser()
    }, [])

    return loading ? <View className="flex-1 items-center justify-center"><ActivityIndicator /></View> : (
        <View className="flex-1 px-6">
            <View className="mt-20">
                <Text className="text-3xl font-bold text-purple-500 tracking-wider font-[Poppins-Bold]">Welcome {"\n"}
                    Back,</Text>
            </View>

            <View className="flex items-center">

                <Image source={require('../assets/icons/graduation.png')} className="h-40 w-40" tintColor={"rgb(168 85 247)"} />
            </View>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    _login(values.email, values.password)
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View className="flex-1 mt-8">
                        <View className="mb-4">
                            <View className="w-full">

                                <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                                />
                                <View className="absolute top-3 ml-2">
                                    <MaterialIcons name="email" size={28} color="rgb(168 85 247)" />
                                </View>
                            </View>
                            {
                                errors.email && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.email}</Text>
                            }
                        </View>
                        <View className="mb-4">
                            <View className="w-full">

                                <TextInput
                                    secureTextEntry
                                    autoCorrect={false}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="Password"
                                    className="px-4 py-3 pl-10 rounded-lg border border-purple-500 font-[Poppins-Regular]"
                                />
                                <View className="absolute top-3 ml-2">
                                    <MaterialIcons name="password" size={28} color="rgb(168 85 247)" />
                                </View>

                            </View>
                            {
                                errors.password && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.password}</Text>
                            }
                        </View>

                        <TouchableOpacity className="my-2 mr-2 "><Text className="text-right font-[Poppins-Regular]">Forget Password</Text></TouchableOpacity>

                        <Button disabled={isLoading} onPress={handleSubmit}>Log in</Button>
                        <View className="mt-6 flex-row items-end mb-20 justify-center flex-1">
                            <Text className="text-purple-500 items-center justify-center">Don't have an account?</Text>
                            <TouchableOpacity onPress={() => {
                                // Navigate to register screen
                                navigation.navigate(routes.REGISTER);
                            }}>
                                <Text className="text-purple-500 underline ml-1 font-[Poppins-Bold]">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
            </Formik>
        </View>


    )
}