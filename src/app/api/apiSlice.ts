import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  setCredentials,
  setCredentialsLocally,
} from '../../redux/slices/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../../constant';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async headers => {
    const token = await AsyncStorage.getItem('token');
    /* const token = (getState() as RootState).auth.token */
    if (token) {
      headers.set('authorization', `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});

const refreshQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async headers => {
    const token = await AsyncStorage.getItem('refreshToken');
    /*  const token = (getState() as RootState).auth.refreshToken */
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2QyODExOGE2ZjgyODFmY2YxOGM1ZGQiLCJpYXQiOjE2NzYxMzYxOTksImV4cCI6MTY3Njc0MDk5OX0.dTQlXo63cpP1__Kdkr8V67ti_3SPqtR3IuLJ_w0WMDs';
    if (token) {
      headers.set('authorization', `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    //send refresh token to get a new access token
    const refreshResult: any = await refreshQuery(
      '/auth/refresh',
      api,
      extraOptions,
    );
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(
        setCredentials({
          user,
          token: refreshResult.data?.token,
          refreshToken: refreshResult.data?.refreshToken,
        }),
      );

      api.dispatch(
        setCredentialsLocally({
          user,
          token: refreshResult.data?.token,
          refreshToken: refreshResult.data?.refreshToken,
        }),
      );

      await AsyncStorage.setItem(
        'token',
        JSON.stringify(refreshResult.data?.token),
      );

      await AsyncStorage.setItem(
        'refreshToken',
        JSON.stringify(refreshResult.data?.refreshToken),
      );

      //retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  tagTypes: ['Users'],
});
