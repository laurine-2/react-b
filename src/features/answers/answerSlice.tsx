// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axios';

// // Thunks pour les opérations asynchrones
// export const fetchAnswers = createAsyncThunk('answers/fetchAnswers', async () => {
//   const response = await axiosInstance.get('/answers');
//   return response.data;
// });

// export const addAnswer = createAsyncThunk('answers/addAnswer', async (answerData) => {
//   const response = await axiosInstance.post('/answers', answerData);
//   return response.data;
// });

// export const updateAnswer = createAsyncThunk('answers/updateAnswer', async ({ id, answerData }) => {
//   const response = await axiosInstance.put(`/answers/${id}`, answerData);
//   return response.data;
// });

// export const deleteAnswer = createAsyncThunk('answers/deleteAnswer', async (id) => {
//   await axiosInstance.delete(`/answers/${id}`);
//   return id;
// });

// const answerSlice = createSlice({
//   name: 'answers',
//   initialState: {
//     answers: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAnswers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAnswers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.answers = action.payload;
//       })
//       .addCase(fetchAnswers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addAnswer.fulfilled, (state, action) => {
//         state.answers.push(action.payload);
//       })
//       .addCase(updateAnswer.fulfilled, (state, action) => {
//         const index = state.answers.findIndex(a => a.id === action.payload.id);
//         state.answers[index] = action.payload;
//       })
//       .addCase(deleteAnswer.fulfilled, (state, action) => {
//         state.answers = state.answers.filter(a => a.id !== action.payload);
//       });
//   },
// });

// export default answerSlice.reducer;
