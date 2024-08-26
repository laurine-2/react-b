import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

interface Team {
  id: number;
  name: string;
  manager_id: number;
}

interface TeamState {
  teams: Team[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// État initial
const initialState: TeamState = {
  teams: [],
  status: 'idle',
  error: null,
};

// Fetch all teams
export const fetchTeams = createAsyncThunk<Team[]>('teams/fetchTeams', async () => {
  const response = await axiosInstance.get('/teams');
  return response.data;
});

// Add a new team
export const addTeam = createAsyncThunk<Team, { name: string }>('teams/addTeam', async (teamData) => {
  const response = await axiosInstance.post('/teams', teamData);
  return response.data;
});

// Update a team
export const updateTeam = createAsyncThunk<Team, { id: number; name: string }>('teams/updateTeam', async ({ id, name }) => {
  const response = await axiosInstance.put(`/teams/${id}`, { name });
  return response.data;
});

// Delete a team
export const deleteTeam = createAsyncThunk<number, number>('teams/deleteTeam', async (id) => {
  await axiosInstance.delete(`/teams/${id}`);
  return id;
});

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch teams';
      })
      .addCase(addTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.teams.push(action.payload);
      })
      .addCase(updateTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        const index = state.teams.findIndex((team) => team.id === action.payload.id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<number>) => {
        state.teams = state.teams.filter((team) => team.id !== action.payload);
      });
  },
});

export default teamSlice.reducer;
