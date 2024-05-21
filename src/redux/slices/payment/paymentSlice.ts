import { apiSlice } from '../../../app/api/apiSlice'

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    payAdmission: builder.mutation<any, { admissionId: string }>({
      query: ({ admissionId }) => ({
        url: `/admissions/${admissionId}/pay`,
        method: 'POST',
      }),
      invalidatesTags: ['Admission'],
    }),
  }),
  overrideExisting: true,
})

export const { usePayAdmissionMutation } = profileSlice
