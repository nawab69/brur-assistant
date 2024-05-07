import {apiSlice} from '../../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: {...credentials},
      }),

      transformErrorResponse: (error: any) => {
        return error.data;
      },
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/auth/users/register',
        method: 'POST',
        body: {...credentials},
      }),

      transformErrorResponse: (error: any) => {
        console.log('Error', error);
        return error.data;
      },
    }),
    currentUser: builder.query({
      query: () => '/auth/users/current',
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: '/auth/users/change-password',
        method: 'POST',
        body,
      }),
    }),
    verify: builder.mutation({
      query: body => ({
        url: '/auth/users/verify',
        method: 'POST',
        body,
      }),
    }),
    sendCode: builder.mutation({
      query: body => ({
        url: '/auth/users/resend-email',
        method: 'POST',
        body,
      }),
    }),
    forgotPass: builder.mutation({
      query: body => ({
        url: '/auth/users/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPass: builder.mutation({
      query: body => ({
        url: '/auth/users/reset-password',
        method: 'POST',
        body,
      }),
    }),
    validateCode: builder.mutation({
      query: body => ({
        url: '/auth/users/validate-code',
        method: 'POST',
        body,
      }),
    }),
    tfaSetup: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/2fa/setup',
        method: 'GET',
      }),
    }),
    tfaConfirmSetup: builder.mutation({
      query: body => ({
        url: '/auth/2fa/confirm',
        method: 'POST',
        body,
      }),
    }),
    tfaDisable: builder.mutation({
      query: body => ({
        url: '/auth/2fa/disable',
        method: 'POST',
        body,
      }),
    }),
    tfaVerify: builder.mutation({
      query: body => ({
        url: '/auth/2fa/verify',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useSendCodeMutation,
  useVerifyMutation,
  useLazyCurrentUserQuery,
  useForgotPassMutation,
  useResetPassMutation,
  useValidateCodeMutation,
  useRegisterMutation,
  useTfaConfirmSetupMutation,
  useTfaDisableMutation,
  useTfaSetupMutation,
  useTfaVerifyMutation,
} = authApiSlice;
