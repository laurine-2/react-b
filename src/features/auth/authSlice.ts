import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

interface AuthState {
  user: { firstname: string; lastname: string; username: string; role: string } | null;
  
  token: string | null;
  loading: boolean;
  error: { message: string } | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/login', userData);
      console.log('API Response:', response.data);
      const { token, user } = response.data; // Ensure user is extracted
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error: any) {
      console.error('Login Error:', error.response.data.message);
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { firstname: string; lastname: string; matricule: string; email: string; password: string; role: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post('/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
