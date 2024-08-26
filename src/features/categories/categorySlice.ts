import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

// Interface pour une catégorie
interface Category {
  id: number;
  name: string;
  description: string;
  team_id: number; // Ajout du champ `team_id` pour lier une catégorie à une équipe
}

// Interface pour l'état du slice des catégories
interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// État initial
const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Fetch categories
export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchCategories', async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
});

// Add a new category
export const addCategory = createAsyncThunk<Category, { name: string; description: string; team_id: number }>(
  'categories/addCategory',
  async (categoryData) => {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  }
);

// Update a category
export const updateCategory = createAsyncThunk<Category, { id: number; name: string; description: string; team_id: number }>(
  'categories/updateCategory',
  async ({ id, ...categoryData }) => {
    const response = await axiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk<number, number>('categories/deleteCategory', async (id) => {
  await axiosInstance.delete(`/categories/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
