import { Text, TouchableOpacity, View, } from "react-native"
import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { forwardRef } from "react";

export const Sheet = forwardRef(({ snaps, children, setIsOpen, enablePanDownToClose = true }: any, ref: any) => {
    const _handle = () => {
        if (setIsOpen) setIsOpen(false)
    }
    return (
        <GestureHandlerRootView className="absolute top-0 bottom-0 left-0 right-0 bg-black/30">
            <TouchableOpacity className="absolute top-0 bottom-0 left-0 right-0" onPress={_handle} />
            <BottomSheet
                ref={ref}
                snapPoints={snaps || ['70%', '75%']}
                enableHandlePanningGesture={enablePanDownToClose}
                enablePanDownToClose={enablePanDownToClose}
                onClose={_handle}
            >
                <BottomSheetScrollView contentContainerStyle={{ justifyContent: 'flex-start' }}>
                    <View className="p-5">
                        {React.cloneElement(children, { close: setIsOpen })}
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
            <TouchableOpacity />
        </GestureHandlerRootView>
    )
})