import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { Quiz, QuizWithoutQuestions } from '../types';

// Définir la configuration pour AsyncThunk (si vous avez une configuration spécifique)
type AsyncThunkConfig = {
  // Définissez ici votre configuration si nécessaire, sinon laissez vide
};

// Définir explicitement le type pour `fetchQuizzes`
export const fetchQuizzes = createAsyncThunk<Quiz[], void, AsyncThunkConfig>(
  'quizzes/fetchQuizzes',
  async () => {
    const response = await axiosInstance.get('/quizzes');
    return response.data as Quiz[];
  }
);

// Définir explicitement le type pour `addQuiz`
export const addQuiz = createAsyncThunk<Quiz, QuizWithoutQuestions, AsyncThunkConfig>(
  'quizzes/addQuiz',
  async (quizData) => {
    const response = await axiosInstance.post('/quizzes', quizData);
    return response.data as Quiz;
  }
);

// Définir explicitement le type pour `fetchQuizById`
export const fetchQuizById = createAsyncThunk('quizzes/fetchQuizById', async (quizId: number) => {
  const response = await axiosInstance.get(`/quizzes/${quizId}`);
  return response.data; // Assurez-vous que la réponse renvoie bien les données du quiz
});


// Définir explicitement le type pour `deleteQuiz`
export const deleteQuiz = createAsyncThunk<number, number, AsyncThunkConfig>(
  'quizzes/deleteQuiz',
  async (quizId) => {
    await axiosInstance.delete(`/quizzes/${quizId}`);
    return quizId;
  }
);

export const fetchQuizzesByCategory = createAsyncThunk<Quiz[], number, AsyncThunkConfig>(
  'quizzes/fetchQuizzesByCategory',
  async (categoryId) => {
    const response = await axiosInstance.get(`/categories/${categoryId}/quizzes`);
    return response.data as Quiz[];
  }
);


// Slice Redux
const quizSlice = createSlice({
  name: 'quizzes',
  initialState: {
    // quizzes: [] as Quiz[],
    selectedQuiz: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchQuizzes.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
      state.status = 'succeeded';
      state.quizzes = action.payload;
    })
    .addCase(fetchQuizzes.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch quizzes';
    })
    .addCase(addQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    })
    .addCase(fetchQuizById.fulfilled, (state, action: PayloadAction<Quiz>) => {
      state.status = 'succeeded';
      state.selectedQuiz = action.payload;
    })
    .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<number>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
    })
    .addCase(fetchQuizzesByCategory.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchQuizzesByCategory.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
      state.status = 'succeeded';
      state.quizzes = action.payload;
    })
    .addCase(fetchQuizzesByCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch quizzes by category';
    });
  },
});

export default quizSlice.reducer;
