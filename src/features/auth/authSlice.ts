import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

interface AuthState {
  user: { firstname: string; lastname: string; username: string; role: string } | null;
  
  token: string | null;
  loading: boolean;
  error: { message: string } | null;
}

const initialState: AuthState = {
  user: {
    id: null, // Ajoutez `id` ici
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  },
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/login', userData);
      const { token, user } = response.data;
      // Assurez-vous que l'API renvoie bien un `id` pour l'utilisateur
      console.log('User Data:', user); // Vérifiez si l'utilisateur a un `id`
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
  }
);



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error: any) {
      console.error("Registration error:", error.response.data); // Affichez tous les détails de l'erreur
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
  }
);



// Action pour mettre à jour le profil
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/profile', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      })
      //vue and update profil

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
