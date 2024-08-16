import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Thunks pour ajouter une réponse utilisateur
export const addUserAnswer = createAsyncThunk('userAnswers/addUserAnswer', async (answerData) => {
  const response = await axiosInstance.post('/user-answers', answerData);
  return response.data;
});

const userAnswerSlice = createSlice({
  name: 'userAnswers',
  initialState: {
    userAnswers: [], // Stockage des réponses utilisateur
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userAnswers.push(action.payload); // Ajoute la réponse soumise au store
      })
      .addCase(addUserAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Capture les erreurs
      });
  },
});

export default userAnswerSlice.reducer;
