import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Thunks pour les opérations asynchrones

// Récupérer tous les résultats
export const fetchResults = createAsyncThunk('results/fetchResults', async () => {
  const response = await axiosInstance.get('/results');
  return response.data;
});

// Ajouter un nouveau résultat
export const addResult = createAsyncThunk('results/addResult', async (resultData) => {
  const response = await axiosInstance.post('/results', resultData);
  return response.data;
});

const resultSlice = createSlice({
  name: 'results',
  initialState: {
    results: [], // Liste des résultats
    status: 'idle', // Statut de la requête (idle, loading, succeeded, failed)
    error: null, // Stocke les erreurs éventuelles
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading'; // Indique que les résultats sont en cours de chargement
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Indique que les résultats ont été chargés avec succès
        state.results = action.payload; // Stocke les résultats récupérés
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed'; // Indique qu'une erreur est survenue lors du chargement
        state.error = action.error.message; // Stocke le message d'erreur
      })
      .addCase(addResult.fulfilled, (state, action) => {
        state.results.push(action.payload); // Ajoute un nouveau résultat à la liste
      });
  },
});

export default resultSlice.reducer;
