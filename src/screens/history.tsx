import { FlatList, Image, RefreshControl, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import { Loader } from "../components/loader"
import { Back } from "../components/back"

enum Status {
    completed = 'completed',
    pending = 'pending',
    cancelled = 'cancelled'
}

interface CardProps {
    amount: number
    status: Status
    aid: string
}


const cards: CardProps[] = [
    {
        amount: 1000,
        status: Status.completed,
        aid: '1234567890'
    },
    {
        amount: 2000,
        status: Status.pending,
        aid: '1234567890'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        aid: '1234567890'
    },
    {
        amount: 3000,
        status: Status.completed,
        aid: '1234567890'
    },
    {
        amount: 3000,
        status: Status.pending,
        aid: '1234567890'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        aid: '1234567890'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        aid: '1234567890'
    },
    {
        amount: 3000,
        status: Status.pending,
        aid: '1234567890'
    }
]

export const History = ({ navigation }: { navigation: any }) => {
    const [trades, setTrades] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)

    return (
        <View className="mt-8">
            <StatusBar barStyle={'dark-content'} />
            {/* 
                Header
            */}
            <View className=" border-black/10 py-3">
                <Back navigation={navigation} />
                <Text className="text-black text-xl mx-auto font-['Poppins-Medium'] capitilize">History</Text>
            </View>
            {/* 
                    Trades
            */}
            <View className="flex flex-row items-center justify-between bg-slate-50 mx-10 p-2 rounded-lg my-2">
                <Text className="text-xs text-black/70">Page: <Text className="font-medium">{page}</Text></Text>
                <Text className="text-xs text-black/70">Items: <Text className="font-medium">{trades?.length}</Text></Text>
            </View>
            {false ? <Loader /> :
                <FlatList
                    className="mx-5 mb-24"
                    data={cards}
                    renderItem={({ item, index }) => <CardItem onPress={() => { }} index={index} trade={item} />}
                />
            }
        </View>
    )
}

const CardItem = ({ trade, index, onPress }: { index: number, trade: any, onPress: () => void }): JSX.Element => {
    return (<TouchableOpacity key={index} className="flex-row gap-x-2 my-2" onPress={onPress}>
        <View className="flex-1 flex-row justify-between bg-[#F9F9FF] p-1 rounded-xl">
            <View className="space-y-2 p-2 rounded-xl">
                <View className="bg-slate-300 rounded-lg w-18 py-0.5 px-2 mx-auto"><Text className="font-['Poppins-SemiBold'] uppercase text-xs text-main">bKash</Text></View>
                <Text className="font-['Poppins-SemiBold'] text-lg text-main"> &#2547; {trade?.amount}</Text>
                <Text className="font-['Poppins-Medium'] text-xs text-slate-300">12 - 03 - 2020</Text>
            </View>
            <View className="flex items-end p-3 space-y-2">
                <Text>AID: {trade?.aid}</Text>
                <Text className="font-['Poppins-SemiBold'] text-lg text-main">{trade?.status}</Text>
            </View>
        </View>
    </TouchableOpacity>)
}