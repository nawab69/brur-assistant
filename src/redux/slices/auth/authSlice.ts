import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {State} from 'react-native-gesture-handler';

interface IAuthState {
  loading: boolean;
  error?: string;
  user?: {
    email?: string;
    name?: string;
    id?: string;
    roles?: string[];
    isVerified?: boolean;
    is2FAEnabled?: boolean;
    studentId?: string;
  } | null;
  token?: string | null;
  refreshToken?: string | null;
}

export const setCredentialsLocally = createAsyncThunk(
  'setCredentials',
  async (body: Partial<IAuthState>) => {
    await AsyncStorage.setItem('userInfo', JSON.stringify(body.user));
    await AsyncStorage.setItem('token', JSON.stringify(body.token));
    await AsyncStorage.setItem(
      'refreshToken',
      JSON.stringify(body.refreshToken),
    );
  },
);
export const unsetCredentialLocally = createAsyncThunk(
  'unsetCredentials',
  async () => {
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
  },
);

export const fetchCurrentCredentials = createAsyncThunk(
  'fetchCurrentCredentials',
  async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log({user, token, refreshToken});
    return {
      user: JSON.parse(user!),
      token: JSON.parse(token!),
      refreshToken: JSON.parse(refreshToken!),
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: true,
    error: undefined,
    user: null,
    token: null,
    refreshToken: null,
  } as IAuthState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = undefined;
      state.loading = false;
      console.log('setting setCredentials done');
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrentCredentials.fulfilled, (state, action) => {
      (state.loading = false),
        (state.token = action.payload.token),
        (state.refreshToken = action.payload.refreshToken),
        (state.user = action.payload.user);
    });

    builder.addCase(fetchCurrentCredentials.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(setCredentialsLocally.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(setCredentialsLocally.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(setCredentialsLocally.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) =>
  state.auth.refreshToken;
