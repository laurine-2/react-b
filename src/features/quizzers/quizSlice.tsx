import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Thunks pour les opérations asynchrones
export const fetchQuizzes = createAsyncThunk('quizzes/fetchQuizzes', async () => {
  const response = await axiosInstance.get('/quizzes');
  return response.data;
});

export const addQuiz = createAsyncThunk('quizzes/addQuiz', async (quizData) => {
  const response = await axiosInstance.post('/quizzes', quizData);
  return response.data;
});

const quizSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.quizzes.push(action.payload);
      });
  },
});

export default quizSlice.reducer;
