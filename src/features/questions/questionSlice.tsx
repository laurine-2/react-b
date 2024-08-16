import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Thunks pour les opérations asynchrones
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axiosInstance.get('/questions');
  return response.data;
});

// export const addQuestion = createAsyncThunk('questions/addQuestion', async (questionData) => {
//   const response = await axiosInstance.post('/questions', questionData);
//   return response.data;
// });

// Action pour ajouter une question à un quiz spécifique
export const addQuestion = createAsyncThunk('questions/addQuestion', async ({ quizId, questionData }) => {
  // Assurez-vous d'utiliser des backticks ici
  const response = await axiosInstance.post(`/quizzes/${quizId}/questions`, questionData);
  return response.data;
});

export const updateQuestion = createAsyncThunk('questions/updateQuestion', async ({ id, questionData }) => {
  const response = await axiosInstance.put(`/questions/${id}`, questionData);
  return response.data;
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (id) => {
  await axiosInstance.delete(`/questions/${id}`);
  return id;
});

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(q => q.id === action.payload.id);
        state.questions[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(q => q.id !== action.payload);
      });
  },
});

export default questionSlice.reducer;
