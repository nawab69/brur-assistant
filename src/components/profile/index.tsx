import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
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
import { IProfile, useCreateProfileMutation, useGetDepartmentQuery } from "../../redux/slices/profile/profileSlice";
import { Formik } from "formik";
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker';

const schema = yup.object({
    fullName: yup.string().required(),
    fathersName: yup.string().required(),
    mothersName: yup.string().required(),
    mobileNumber: yup.string().required(),
    session: yup.string().required(),
    regNo: yup.string().required(),
    dateOfBirth: yup.string().required(),
    hallName: yup.string().required(),
    nationality: yup.string().required(),
    permanentAddress: yup.string().required(),
    presentAddress: yup.string().required(),
    department: yup.string().required(),
    semester: yup.string().required()
})

const semesterData = [
    {
        id: 1,
        name: '1st'
    },
    {
        id: 2,
        name: '2nd'
    },
    {
        id: 3,
        name: '3rd'
    },
    {
        id: 4,
        name: '4th'
    },
    {
        id: 5,
        name: '5th'
    },
    {
        id: 6,
        name: '6th'
    },
    {
        id: 7,
        name: '7th'
    },
    {
        id: 8,
        name: '8th'
    }
]

export function CreateProfile({ close }: { close?: any }) {

    const [loading, setLoading] = useState<boolean>(false)

    const toast = useToasts()

    const token = useSelector(selectCurrentToken);

    const [data, setData] = useState<any>(null)

    const { data: depts, isLoading: deptLoading, isError, error } = useGetDepartmentQuery()

    console.log(depts, deptLoading, isError, error)

    const [educationalQualification, setEducationalQualification] = useState<any>([{
        examName: 'SSC',
        board: '',
        group: '',
        passingYear: '',
        rollNo: '',
        result: ''
    }, {
        examName: 'HSC',
        board: '',
        group: '',
        passingYear: '',
        rollNo: '',
        result: ''
    }

    ])
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false,
        });

        console.log(result);

        if (!result.canceled) {
            result.assets[0].fileName = result.assets[0].uri.split('/').pop()
            setData(result);
        }
    };

    const [createProfile, { isLoading }] = useCreateProfileMutation()



    const handleCreateProfile = async (values: IProfile) => {
        try {
            toast.loading("Creating Profile...")
            const formData = new FormData()
            Object.keys(values).forEach(key => {
                if (key === 'semester') {
                    formData.append(key, parseInt(values[key]).toString())
                } else if (
                    key === 'department'
                ) {
                    formData.append(key, depts?.find((item) => item.name === values[key])?._id.toString())
                }
                else if (key === 'educationalQualification') {
                    values[key].forEach((item: any, index: number) => {
                        Object.keys(item).forEach((itemKey) => {
                            formData.append(`${key}[${index}][${itemKey}]`, item[itemKey])
                        })
                    })
                } else {
                    formData.append(key, values[key])
                }
            })

            if (data) {
                const uriParts = data.assets[0].uri.split('.');
                const fileType = uriParts[uriParts.length - 1];

                formData.append('signature', {
                    uri: Platform.OS === 'ios' ? data.assets[0].uri.replace('file://', '') : data.assets[0].uri,
                    name: data.assets[0].fileName,
                    type: `image/${fileType}`
                } as any)
            }


            const response = await createProfile(formData).unwrap()
            toast.success("Profile Created Successfully")
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView>

            <View className="space-y-0">

                <Formik
                    initialValues={{
                        fullName: '',
                        fathersName: '',
                        mothersName: '',
                        mobileNumber: '',
                        session: '',
                        regNo: '',
                        dateOfBirth: '',
                        hallName: '',
                        nationality: 'Bangladesh',
                        permanentAddress: '',
                        presentAddress: '',
                        department: '',
                        semester: ''
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        // TODO: Submit the form
                        await handleCreateProfile({ ...values, educationalQualification })
                        // actions.resetForm()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                        <>
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="fullName" label="Full Name" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="fathersName" label="Father's Name" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="mothersName" label="Mothers's Name" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="mobileNumber" label="Mobile Number" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="session" label="Session" touched={touched} />

                            <Search items={
                                semesterData.map((item) => item.name)
                            } title="Semester" selected={values.semester} onSelect={(item) => handleChange('semester')(
                                item
                            )} />
                            <Search items={
                                depts?.map((item) => item.name)
                            } title="Department" selected={values.department} onSelect={(item) => handleChange('department')(
                                item
                            )} />



                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="regNo" label="Registration Number" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="dateOfBirth" label="Date of Birth" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="hallName" label="Hall Name" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="nationality" label="Nationality" touched={touched} />

                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="permanentAddress" label="Permanent Address" touched={touched} />
                            <InputText handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} name="presentAddress" label="Present Address" touched={touched} />

                            {/* Upload signature using expo document picker */}
                            <TouchableOpacity onPress={pickImage}>
                                <View className="flex items-start">
                                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Upload Signature</Text>
                                    <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                        <Text>{data?.assets?.[0]?.fileName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* 
                            educationalQualification: {
                                examName: string
                                board: string
                                group: string
                                passingYear: string
                                rollNo: string
                                result: string
                            }[]
                            */}



                            <View>
                                <Text className="font-['Poppins-Medium'] text-black text-xs bg-white mt-2 text-center z-10 px-2">Educational Qualification (SSC)</Text>
                            </View>

                            <View>
                                <View className="flex flex-row space-x-2">

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Exam Name</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 0) {
                                                                    return {
                                                                        ...item,
                                                                        examName: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[0].examName
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Board</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 0) {
                                                                    return {
                                                                        ...item,
                                                                        board: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[0].board
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View className="flex flex-row space-x-2">

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Group</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 0) {
                                                                    return {
                                                                        ...item,
                                                                        group: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[0].group
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Passing Year</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 0) {
                                                                    return {
                                                                        ...item,
                                                                        passingYear: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[0].passingYear
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View className="flex flex-row space-x-2">

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Roll No</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 0) {
                                                                    return {
                                                                        ...item,
                                                                        rollNo: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[0].rollNo
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Result</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 0) {
                                                                    return {
                                                                        ...item,
                                                                        result: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[0].result
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                </View>

                            </View>
                            <View>
                                <View>
                                    <Text className="font-['Poppins-Medium'] text-black text-xs bg-white mt-2 text-center z-10 px-2">Educational Qualification (HSC)</Text>
                                </View>
                                <View className="flex flex-row space-x-2">

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Exam Name</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 1) {
                                                                    return {
                                                                        ...item,
                                                                        examName: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[1].examName
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Board</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 1) {
                                                                    return {
                                                                        ...item,
                                                                        board: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[1].board
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View className="flex flex-row space-x-2">

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Group</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 1) {
                                                                    return {
                                                                        ...item,
                                                                        group: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[1].group
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Passing Year</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 1) {
                                                                    return {
                                                                        ...item,
                                                                        passingYear: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[1].passingYear
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View className="flex flex-row space-x-2">

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Roll No</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 1) {
                                                                    return {
                                                                        ...item,
                                                                        rollNo: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[1].rollNo
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="w-1/2 px-2">
                                        <View className="flex items-start">
                                            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Result</Text>

                                            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                                                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                                                    onChangeText={
                                                        (value) => setEducationalQualification((prev) => {

                                                            return prev.map((item, index) => {
                                                                if (index === 1) {
                                                                    return {
                                                                        ...item,
                                                                        result: value
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        }
                                                        )
                                                    }
                                                    value={
                                                        educationalQualification[1].result
                                                    } />
                                            </View>
                                        </View>
                                    </View>

                                </View>

                            </View>

                            <Button onPress={handleSubmit}>
                                Submit
                            </Button>
                        </>
                    )}
                </Formik>



            </View>
        </KeyboardAvoidingView >
    )
}

function InputText({ handleChange, handleBlur, values, errors, name, label, touched }: { handleChange: any, handleBlur: any, values: any, errors: any, name: string, label: string, touched: any }) {
    return (
        <View className="flex items-start">
            <Text className="font-['Poppins-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">{label}</Text>

            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Poppins-SemiBold'] text-sm py-3 px-2`}>
                <TextInput className="w-full text-black font-['Poppins-Regular'] text-sm"
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    value={values[name]} />
            </View>
            {
                touched?.[name] && errors?.[name] && <Text className="font-['Poppins-Medium'] text-red-500 text-xs px-2  mt-1">{errors[name]}</Text>
            }
        </View>
    )
}