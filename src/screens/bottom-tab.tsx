import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "./home"
import { Profile } from "./profile"
import { Image, Text, View } from "react-native"
import Menu from "./menu/menu"

const Tab = createBottomTabNavigator()

interface ITabs {
    name: string,
    icon: {
        normal: string,
        active: string
    }
    component: any,

}

const tabs: ITabs[] = [
    {
        name: 'Home',
        icon: {
            normal: require('../assets/icons/home.png'),
            active: require('../assets/icons/home-f.png')
        },
        component: Home
    }, {
        name: 'Profile',
        icon: {
            normal: require('../assets/icons/user.png'),
            active: require('../assets/icons/user-f.png')
        },
        component: Profile
    }, {
        name: 'Menu',
        icon: {
            normal: require('../assets/icons/menu.png'),
            active: require('../assets/icons/menu.png')
        },
        component: Menu
    }
]

export const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    headerShown: false
                })
            }
            initialRouteName="Home"
        >
            {tabs.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            // @ts-ignore
                            return (<Image tintColor={focused ? 'rgb(147 51 234)' : 'black'} source={tab.icon.active} className="h-8 w-8" />)
                        },
                        tabBarStyle: {
                            paddingHorizontal: 30,
                            paddingBottom: 20,
                            paddingTop: 10,
                            height: 80,
                            backgroundColor: 'white'
                        },
                        tabBarLabelStyle: {
                            color: '#282a2e',
                            fontFamily: 'Poppins',
                            fontSize: 9,
                        },
                        tabBarLabel: ({ focused }) => {
                            return <Text className={`text-[10px] font-['Poppins-Medium'] ${focused ? 'text-[#241C71]' : 'text-[#B5B4BD]'} `}>{tab.name}</Text>
                        },
                    }}
                    component={tab.component}
                />

            ))}
        </Tab.Navigator>
    )
}