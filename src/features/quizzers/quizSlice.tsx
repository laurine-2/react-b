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

// Action pour supprimer un quiz
export const deleteQuiz = createAsyncThunk('quizzes/deleteQuiz', async (quizId) => {
  await axiosInstance.delete(`/quizzes/${quizId}`);
  return quizId;
});

// Thunk pour récupérer les quiz par catégorie
export const fetchQuizzesByCategory = createAsyncThunk(
    'quizzes/fetchQuizzesByCategory',
    async (categoryId) => {
      const response = await axiosInstance.get(`/categories/${categoryId}/quizzes`);
      return response.data;
    }
  );

  // Thunk pour récupérer un quiz spécifique par ID
export const fetchQuizById = createAsyncThunk(
    'quizzes/fetchQuizById',
    async (quizId) => {
      const response = await axiosInstance.get(`/quizzes/${quizId}`);
      return response.data;
    }
  );
  

const quizSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: [],
    selectedQuiz: null,  // Ajout d'un état pour un quiz spécifique
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
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
      })
      .addCase(fetchQuizzesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizzesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchQuizById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedQuiz = action.payload;  // Stocke le quiz récupéré
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      ;
  },
});

export default quizSlice.reducer;
