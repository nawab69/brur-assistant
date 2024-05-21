import React from 'react'
import { View } from 'react-native'
import { Payment } from '../components/payment'

const PaymentScreen = ({ route }) => {
    const { amount, id, type } = route.params
    return (
        <View className='p-6 mt-24'>
            {/* Payment component */}
            <Payment amount={amount} id={id} type={type} />
        </View>
    )
}

export default PaymentScreen
