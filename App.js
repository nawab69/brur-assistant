import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalProvider } from '@gorhom/portal'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeWindStyleSheet, useColorScheme } from 'nativewind'
import { ToastProvider } from 'react-native-toast-notifications'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { routes } from './src/constant'
import { Routes } from './src/screens'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()
NativeWindStyleSheet.setColorScheme('light')

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme()

  if (colorScheme === 'dark') {
    setColorScheme('light')
  }

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('./assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('./assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('./assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('./assets/fonts/Poppins-ThinItalic.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        <PortalProvider>
          <GestureHandlerRootView
            className='flex-1'
            onLayout={onLayoutRootView}>
            <ExpoStatusBar
              translucent
              backgroundColor='transparent'
              barStyle={'dark-content'}
            />
            <NavigationContainer>
              <Stack.Navigator initialRouteName={routes.LOGIN}>
                {Routes.map(item => {
                  return (
                    <Stack.Screen
                      key={item.path}
                      name={item.path}
                      component={item.component}
                      options={{ headerShown: false }}
                    />
                  )
                })}
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </PortalProvider>
      </ToastProvider>
    </Provider>
  )
}
