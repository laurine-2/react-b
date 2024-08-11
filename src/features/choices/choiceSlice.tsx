import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Assurez-vous que `fetchChoices` est bien défini et exporté ici
export const fetchChoices = createAsyncThunk('choices/fetchChoices', async () => {
  const response = await axiosInstance.get('/choices');
  return response.data;
});

const choiceSlice = createSlice({
  name: 'choices',
  initialState: {
    choices: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.choices = action.payload;
      })
      .addCase(fetchChoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default choiceSlice.reducer;
