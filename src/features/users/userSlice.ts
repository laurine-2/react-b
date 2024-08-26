// src/features/users/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';


// Interface pour un utilisateur
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

// Interface pour l'état du slice des utilisateurs
interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// État initial
const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (userData: Omit<User, 'id'>) => {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  });
  
  export const updateUser = createAsyncThunk('users/updateUser', async ({ id, ...userData }: User) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  });

// Ajouter deleteUser pour supprimer un utilisateur
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number) => {
    await axiosInstance.delete(`/users/${userId}`);
    return userId; // Retourne l'ID de l'utilisateur supprimé
  });

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
