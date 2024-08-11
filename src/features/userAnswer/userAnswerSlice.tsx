import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Thunks pour les opérations asynchrones

// Récupérer toutes les réponses utilisateur
export const fetchUserAnswers = createAsyncThunk('userAnswers/fetchUserAnswers', async () => {
  const response = await axiosInstance.get('/user-answers');
  return response.data;
});

// Ajouter une nouvelle réponse utilisateur
export const addUserAnswer = createAsyncThunk('userAnswers/addUserAnswer', async (userAnswerData) => {
  const response = await axiosInstance.post('/user-answers', userAnswerData);
  return response.data;
});

const userAnswerSlice = createSlice({
  name: 'userAnswers',
  initialState: {
    userAnswers: [], // Liste des réponses utilisateur
    status: 'idle', // Statut de la requête (idle, loading, succeeded, failed)
    error: null, // Stocke les erreurs éventuelles
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAnswers.pending, (state) => {
        state.status = 'loading'; // Indique que les réponses utilisateur sont en cours de chargement
      })
      .addCase(fetchUserAnswers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Indique que les réponses ont été chargées avec succès
        state.userAnswers = action.payload; // Stocke les réponses utilisateur récupérées
      })
      .addCase(fetchUserAnswers.rejected, (state, action) => {
        state.status = 'failed'; // Indique qu'une erreur est survenue lors du chargement
        state.error = action.error.message; // Stocke le message d'erreur
      })
      .addCase(addUserAnswer.fulfilled, (state, action) => {
        state.userAnswers.push(action.payload); // Ajoute une nouvelle réponse utilisateur à la liste
      });
  },
});

export default userAnswerSlice.reducer;
