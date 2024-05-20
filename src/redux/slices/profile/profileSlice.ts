import { apiSlice } from '../../../app/api/apiSlice'

export interface IProfile {
  fullName: string
  fathersName: string
  mothersName: string
  dateOfBirth: string
  nationality: string
  presentAddress: string
  permanentAddress: string
  mobileNumber: string
  signature?: string
  hallName: string
  regNo: string
  session: string
  department: string
  semester: string
  user?: {
    studentId: string
    email: string
  }
  educationalQualification: {
    examName: string
    board: string
    group: string
    passingYear: string
    rollNo: string
    result: string
  }[]
}

export interface IResponseProfile extends Omit<IProfile, 'department'> {
  _id: string
  department: {
    _id: string
    name: string
  }
}

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<IResponseProfile, void>({
      query: () => ({
        url: '/profiles',
        method: 'GET',
      }),
      transformErrorResponse: (error: any) => {
        console.log('Error', error)
        return error.data.message
      },
      providesTags: ['Profile'],
    }),

    createProfile: builder.mutation<IProfile, FormData>({
      query: (profile: FormData) => ({
        url: '/profiles',
        method: 'POST',
        body: profile,
      }),

      invalidatesTags: ['Profile'],

      transformErrorResponse: (error: any) => {
        console.log('Error', error)
        return error.data
      },
    }),

    getDepartment: builder.query<any[], void>({
      query: () => ({
        url: '/departments',
        method: 'GET',
      }),
      transformErrorResponse: (error: any) => {
        console.log('Error', error)
        return error.data.message
      },
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useGetDepartmentQuery,
} = profileSlice
