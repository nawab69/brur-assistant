import { ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";
import { Image } from "react-native";
import axios from "axios";
import { baseUrl, pdfBaseUrl } from "../../constant";
import { Linking } from "react-native";
import { useToasts } from "../../utils/useToasts";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/slices/auth/authSlice";

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

export function FormFillUp({ close }: { close?: any }) {

    const [type, setType] = useState<FormFillUpType>(FormFillUpType.Regular)
    const [year, setYear] = useState<Year>(Year.FirstYear)
    const [semester, setSemester] = useState<Semester>(Semester.FirstSemester)
    const [examYear, setExamYear] = useState<string>('2023')

    const [improvementCourses, setImprovementCourses] = useState<CourseDetails[]>([]);
    const [currentCourse, setCurrentCourse] = useState<CourseDetails>({
        code: '',
        title: '',
        credit: 3,
        type: '',
        attempt: 1,
        previousGPA: '',
        previousExamYear: '',
    });

    const [isNewCourse, setIsNewCourse] = useState<boolean>(false)

    const addCourse = () => {
        if (improvementCourses.length < 3) {
            setImprovementCourses([...improvementCourses, currentCourse]);
            setCurrentCourse({
                code: '',
                title: '',
                credit: 3,
                type: '',
                attempt: 1,
                previousGPA: '',
                previousExamYear: '',
            });
            setIsNewCourse(false)
        }
    };

    const removeCourse = (index: number) => {
        console.log(index)
        setImprovementCourses(improvementCourses.filter((_, i) => i !== index));
    };

    const [loading, setLoading] = useState<boolean>(false)

    const toast = useToasts()

    const token = useSelector(selectCurrentToken);

    console.log()
    const [data, setData] = useState<any>(null)

    const generatePaySlip = async () => {
        if (loading) return

        setLoading(true)


        if (!type) {
            toast.dismiss()
            toast.error('Please select type')
            setLoading(false)
            return
        }

        // if (!year) {
        //     toast.dismiss()
        //     toast.error('Please select year')
        //     setLoading(false)
        //     return
        // }

        // if (!semester) {
        //     toast.dismiss()
        //     toast.error('Please select semester')
        //     setLoading(false)
        //     return
        // }

        if (!examYear) {
            toast.dismiss()
            toast.error('Please select exam year')
            setLoading(false)
            return
        }

        console.log(type, year, semester, examYear)

        try {
            const { data } = await axios.post(`${baseUrl}forms`, {
                type: type,
                year: year,
                semester: semester,
                examYear: examYear
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data) {
                toast.dismiss()
                // console.log("URL", `${pdfBaseUrl}${data.file}`)
                // Linking.openURL(`${pdfBaseUrl}${data.file}`)
                toast.success("Form Fill Up Successfully Completed")
            } else {
                throw new Error('Something went wrong')
            }
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error(e?.response?.data?.message || 'Something went wrong')
        }

        setLoading(false)
    }

    return (
        <KeyboardAvoidingView>
            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Form Fill Up</Text>

            <View className="space-y-0">

                <Search title='Form Fillup Type *' items={Object.values(FormFillUpType)} onSelect={(selected) => { setType(selected as FormFillUpType) }} selected={type} />
                <Search title='Exam Year *' items={examYears} onSelect={(selected) => { setExamYear(selected) }} selected={examYear} />
                {
                    type === FormFillUpType.Improvement && (<>
                        <Search title='Year *' items={Object.values(Year)} onSelect={(selected) => { setYear(selected as Year) }} selected={year} />
                        <Search title='Semester *' items={Object.values(Semester)} onSelect={(selected) => { setSemester(selected as Semester) }} selected={semester} />
                    </>)
                }



                {/* Improvement Course Details
                Three form of  */}

                {
                    type === FormFillUpType.Improvement && (
                        <View className="space-y-0">
                            <Text className="font-['Poppins-Medium'] text-main text-[18px] capitalize mt-4 pb-3 mb-4 text-center border-b border-slate-300">Improvement Course Details</Text>


                            {
                                isNewCourse ? (
                                    <View>

                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Course Code</Text>
                                            <TextInput className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={currentCourse.code} onChangeText={(value) => setCurrentCourse({ ...currentCourse, code: value })} />
                                        </View>
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Course Title</Text>
                                            <TextInput className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={currentCourse.title} onChangeText={(value) => setCurrentCourse({ ...currentCourse, title: value })} />
                                        </View>

                                        <Search title='Credit' items={credits} onSelect={(selected) => { setCurrentCourse({ ...currentCourse, credit: Number(selected) }) }} selected={currentCourse.credit?.toString()} />

                                        <Search title='Course Type' items={['Theory']} onSelect={(selected) => { setCurrentCourse({ ...currentCourse, type: 'Theory' }) }} selected={currentCourse.type.toString()} />

                                        <Search title='Attempt No' items={['1', '2']} onSelect={(selected) => { setCurrentCourse({ ...currentCourse, attempt: Number(selected) }) }} selected={currentCourse.attempt.toString()} />

                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Previous GPA</Text>
                                            <TextInput className="rounded-lg border-2 border-[#4A3FBC]/20 h-12 px-4 w-full text-black font-['Poppins-SemiBold'] text-sm" value={currentCourse.previousGPA} onChangeText={(value) => setCurrentCourse({ ...currentCourse, previousGPA: value })} keyboardType="number-pad" />
                                        </View>

                                        <Search title='Previous Exam Year' items={examYears} onSelect={(selected) => { setCurrentCourse({ ...currentCourse, previousExamYear: selected }) }} selected={currentCourse.previousExamYear} />
                                        <View className="flex flex-row justify-around items-center">
                                            <View className="w-24">
                                                <Button disabled={false} onPress={addCourse}>Add </Button>
                                            </View>
                                            <View className="w-24">
                                                <Button disabled={false} onPress={() => setIsNewCourse(false)}>Cancel </Button>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                    <View>

                                        {
                                            improvementCourses.length === 0 ? (
                                                <>
                                                    <View className="mt-6 flex items-center mb-4">
                                                        <Text className="text-xl font-semibold text-red-500">No Improvement Course Added</Text>
                                                    </View>
                                                    <Button disabled={false} onPress={() => setIsNewCourse(true)}>Add a new course</Button>
                                                </>
                                            ) : (
                                                <View>
                                                    <Button disabled={false} onPress={() => setIsNewCourse(true)}>Add another course</Button>
                                                </View>
                                            )
                                        }
                                    </View>
                                )
                            }
                            {improvementCourses.map((course, index) => (
                                <View key={index} className="border px-2 py-2 border-indigo-700 my-2 rounded">
                                    <TouchableOpacity onPress={() => removeCourse(index)} className="absolute top-2 right-2 z-50 bg-red-100 p-2 rounded-lg">
                                        <Image source={require('../../assets/icons/bin.png')} className="h-6 w-6" style={{ tintColor: 'red' }} />
                                    </TouchableOpacity>
                                    <Text>Course Code: {course.code}</Text>
                                    <Text>Course Title: {course.title}</Text>
                                    <Text>Credit: {course.credit}</Text>
                                    <Text>Course Type: {course.type}</Text>
                                    <Text>Attempt No: {course.attempt}</Text>
                                    <Text>Previous GPA: {course.previousGPA}</Text>
                                    <Text>Previous Exam Year: {course.previousExamYear}</Text>
                                </View>
                            ))}
                        </View>
                    )
                }



                {
                    (type === FormFillUpType.Improvement && improvementCourses.length > 0) || type === FormFillUpType.Regular ? <Button disabled={loading} onPress={generatePaySlip}>Submit</Button> : (<></>)
                }

            </View>
        </KeyboardAvoidingView>
    )
}