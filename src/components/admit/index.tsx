import { ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";
import { Image } from "react-native";

enum FormFillUpType {
    Regular = 'Regular',
    Improvement = 'Improvement'
}

enum Year {
    FirstYear = '1st Year',
    SecondYear = '2nd Year',
    ThirdYear = '3rd Year',
    FourthYear = '4th Year',
}

enum Semester {
    FirstSemester = '1st Semester',
    SecondSemester = '2nd Semester',
}

interface CourseDetails {
    code: string;
    title: string;
    credit: number;
    type: string;
    attempt: number;
    previousGPA: string;
    previousExamYear: string;
}

const examYears = [
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
]

const credits = [
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
]

export function AdmitCard({ close }: { close?: any }) {

    const [type, setType] = useState<FormFillUpType>(FormFillUpType.Regular)
    const [year, setYear] = useState<Year>(Year.FirstYear)
    const [semester, setSemester] = useState<Semester>(Semester.FirstSemester)
    const [examYear, setExamYear] = useState<string>('2023')


    return (
        <KeyboardAvoidingView>
            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Download Admit Card</Text>

            <View className="space-y-0">

                <Search title='Form Fillup Type *' items={Object.values(FormFillUpType)} onSelect={(selected) => { setType(selected as FormFillUpType) }} selected={type} />
                <Search title='Year *' items={Object.values(Year)} onSelect={(selected) => { setYear(selected as Year) }} selected={year} />
                <Search title='Semester *' items={Object.values(Semester)} onSelect={(selected) => { setSemester(selected as Semester) }} selected={semester} />
                <Search title='Exam Year *' items={examYears} onSelect={(selected) => { setExamYear(selected) }} selected={examYear} />
                <Button disabled={false} onPress={() => { }}>Generate Admit Card</Button>

            </View>
        </KeyboardAvoidingView>
    )
}