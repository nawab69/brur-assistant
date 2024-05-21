import { Image, ImageBackground, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { ColorizedBackground } from "../components/colorized-background";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { routes } from "../constant";
import { useState } from "react";
import { Portal } from "@gorhom/portal";
import { Sheet } from "../components/sheet";
import { Admission } from "../components/admission";
import { FormFillUp } from "../components/form-fillup";
import { AdmitCard } from "../components/admit";
import { Payment } from "../components/payment";
import { UploadPayslip } from "../components/upload-payslip";
import Text from "../components/Text";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";
import { MaterialIcons } from '@expo/vector-icons';
import Recent from "../components/recent";

export const Home = ({
  navigation
}: any) => {

  const user = useSelector(selectCurrentUser);

  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false)
  const [isFormFillupOpen, setIsFormFillupOpen] = useState<boolean>(false)
  const [isAdmitOpen, setIsAdmitOpen] = useState<boolean>(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false)
  const [isUploadPayslipOpen, setIsUploadPayslipOpen] = useState<boolean>(false)

  const gridItems = [
    { title: 'Admission', imageSrc: require('../assets/images/admission.png'), color: 'green', onPress: () => setIsAdmissionOpen(true) },
    { title: 'Form fillup', imageSrc: require('../assets/images/formfillup.png'), color: 'yellow', onPress: () => setIsFormFillupOpen(true) },
    { title: 'Admit Card', imageSrc: require('../assets/images/admit-card.png'), color: 'indigo', onPress: () => setIsAdmitOpen(true) },
    {
      title: 'Payment History', imageSrc: require('../assets/images/payment.png'), color: 'purple', onPress: () => navigation.navigate({
        name: routes.HISTORY,
      })
    },
    { title: 'Upload Payslip', imageSrc: require('../assets/images/payslip.png'), color: 'cyan', onPress: () => setIsUploadPayslipOpen(true) },
    { title: 'Result', imageSrc: require('../assets/images/evaluation.png'), color: 'cyan', onPress: () => setIsUploadPayslipOpen(true) },
  ];

  const renderItem = (item: any, index: number) => (
    <TouchableOpacity key={index} className="w-1/2 p-4">
      <View className="bg-blue-200 border-1 border-blue-200 rounded-lg p-4 items-center justify-center">
        <Image source={item.imageSrc} className="w-16 h-16 mb-2" />
        <Text className="font-semibold">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (


    <View className="flex-1">
      <View className="rounded-lg overflow-hidden">

        <View className="p-6 pt-16 rounded-lg bg-purple-600">

          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="text-sm font-[Poppins-Light] text-white break-normal">
                Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}
              </Text>
              <Text className="text-lg text-gray-100 break-normal font-[Poppins-Bold]">
                {user?.name || "User"} 👋
              </Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => { }}>
                <MaterialIcons name="notifications" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>


          <View>
            <Text className="text-xs text-gray-100 break-normal mt-2">
              Welcome to the student portal. Here you can manage your admission, form fillup, payment, admit card and more.
            </Text>
          </View>

        </View>

      </View>
      <ScrollView>
        <View className="flex flex-row flex-wrap mt-8">

          <View>
            <Text className="text-lg font-bold text-gray-800 ml-4 mb-4">Quick Actions</Text>

            <View className="flex flex-row flex-wrap justify-around">
              {gridItems.map((item, index) =>
                <TouchableOpacity key={index} className="p-4 w-28" onPress={item.onPress}>
                  <View className={`bg-white rounded-full h-16 w-16 items-center justify-center`}>
                    <Image source={item.imageSrc} className="w-10 h-10" />
                  </View>
                  <Text className="font-[Poppins-SemiBold] text-xs text-center">{item.title}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text className="mt-2 text-lg font-bold text-gray-800 ml-4 ">Recent Activity</Text>
          <View className="mt-2 flex items-center justify-center w-full">
            <Recent />
          </View>
        </View>
      </ScrollView>

      <Portal>
        {isAdmissionOpen && (
          <Sheet snaps={['40%', '95%']} setIsOpen={() => setIsAdmissionOpen(false)}>
            <Admission />
          </Sheet>
        )}

        {isFormFillupOpen && (
          <Sheet snaps={['40%', '95%']} setIsOpen={() => setIsFormFillupOpen(false)}>
            <FormFillUp />
          </Sheet>
        )}

        {isAdmitOpen && (
          <Sheet snaps={['60%', '95%']} setIsOpen={() => setIsAdmitOpen(false)}>
            <AdmitCard />
          </Sheet>
        )}

        {isPaymentOpen && (
          <Sheet snaps={['45%', '95%']} setIsOpen={() => setIsPaymentOpen(false)}>
            <Payment />
          </Sheet>
        )}

        {isUploadPayslipOpen && (
          <Sheet snaps={['50%', '75%', '95%']} setIsOpen={() => setIsUploadPayslipOpen(false)}>
            <UploadPayslip />
          </Sheet>
        )}

      </Portal>
    </View>

  )



}