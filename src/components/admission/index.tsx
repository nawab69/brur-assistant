import { Linking, View } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";
import { useToasts } from "../../utils/useToasts";
import axios from "axios";
import { selectCurrentToken, selectCurrentUser } from "../../redux/slices/auth/authSlice";
import { useSelector } from "react-redux";
import { baseUrl, pdfBaseUrl } from "../../constant";

enum AdmissionType {
    Regular = 'Regular',
    ReAdmission = 'Re-Admission'
}

enum AdmissionYear {
    FirstYear = '1st Year',
    SecondYear = '2nd Year',
    ThirdYear = '3rd Year',
    FourthYear = '4th Year',
}

enum AdmissionSemester {
    FirstSemester = '1st Semester',
    SecondSemester = '2nd Semester',
}

const examYears = [
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
]

export function Admission({ close }: { close?: any }) {

    const [admissionType, setAdmissionType] = useState<AdmissionType>(AdmissionType.Regular)
    const [admissionYear, setAdmissionYear] = useState<AdmissionYear>(AdmissionYear.FirstYear)
    const [admissionSemester, setAdmissionSemester] = useState<AdmissionSemester>(AdmissionSemester.FirstSemester)
    const [examYear, setExamYear] = useState<string>('2023')

    const [loading, setLoading] = useState<boolean>(false)

    const toast = useToasts()

    const token = useSelector(selectCurrentToken);

    console.log()
    const [data, setData] = useState<any>(null)

    const generatePaySlip = async () => {
        if (loading) return

        setLoading(true)


        if (!admissionType) {
            toast.dismiss()
            toast.error('Please select admission type')
            setLoading(false)
            return
        }

        if (!admissionYear) {
            toast.dismiss()
            toast.error('Please select admission year')
            setLoading(false)
            return
        }

        if (!admissionSemester) {
            toast.dismiss()
            toast.error('Please select admission semester')
            setLoading(false)
            return
        }

        if (!examYear) {
            toast.dismiss()
            toast.error('Please select exam year')
            setLoading(false)
            return
        }

        console.log(admissionType, admissionYear, admissionSemester, examYear)

        try {
            const { data } = await axios.post(`${baseUrl}admissions`, {
                type: admissionType,
                year: admissionYear,
                semester: admissionSemester,
                examYear: examYear
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data) {
                toast.dismiss()
                console.log("URL", `${pdfBaseUrl}${data.file}`)
                Linking.openURL(`${pdfBaseUrl}${data.file}`)
                toast.success("Admission Payslip Generated Successfully")
            } else {
                throw new Error('Something went wrong')
            }
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Something went wrong')
        }

        setLoading(false)
    }
    return (
        <KeyboardAvoidingView>
            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Admission</Text>
            <View className="space-y-0">
                <Search title='Admission Type *' items={Object.values(AdmissionType)} onSelect={(selected) => { setAdmissionType(selected as AdmissionType) }} selected={admissionType} />
                <Search title='Admission Year *' items={Object.values(AdmissionYear)} onSelect={(selected) => { setAdmissionYear(selected as AdmissionYear) }} selected={admissionYear} />
                <Search title='Admission Semester *' items={Object.values(AdmissionSemester)} onSelect={(selected) => { setAdmissionSemester(selected as AdmissionSemester) }} selected={admissionSemester} />
                <Search title='Exam Year *' items={examYears} onSelect={(selected) => { setExamYear(selected) }} selected={examYear} />
                <Button disabled={false} onPress={generatePaySlip}>Generate Pay Slip</Button>
            </View>
        </KeyboardAvoidingView>
    )
}