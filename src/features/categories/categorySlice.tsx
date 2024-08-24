import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
});

// Add a new category
export const addCategory = createAsyncThunk('categories/addCategory', async (categoryData) => {
  const response = await axiosInstance.post('/categories', categoryData);
  return response.data;
});

// Update a category
export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, ...categoryData }) => {
  const response = await axiosInstance.put(`/categories/${id}`, categoryData);
  return response.data;
});

// Delete a category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: number) => {
  await axiosInstance.delete(`/categories/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = Array.isArray(action.payload) ? action.payload : []; // Vérifiez que c'est un tableau
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if (Array.isArray(state.categories)) {
          state.categories.push(action.payload); // Assurez-vous que `categories` est un tableau avant de pousser
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;

// export { deleteCategory };
