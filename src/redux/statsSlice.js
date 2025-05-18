import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStat } from "../services/stat";

export const getStatUser = createAsyncThunk(
  "stats/get",
  async (credentials, thunkAPI) => {
    try {
      const data = await getStat(credentials);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const statSlice = createSlice({
  name: "stats",
  initialState: {
    totalHours: 7.0,
    totalSkills: 3,
    totalLogs: 4,
    chartData: [
      { date: "2025-04-18", hours: 2 },
      { date: "2025-04-19", hours: 3.5 },
      { date: "2025-04-20", hours: 1.5 },
    ],
    skillPieData: [
      { type: "HTML", value: 2 },
      { type: "JavaScript", value: 3.5 },
      { type: "React", value: 1 },
    ],
  },
  reducers: {
    get: (state, action) => {
      state = action.payload;
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(getStatUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getStatUser.fulfilled, (state, action) => {
          state.loading = false;
          state = action.payload
        })
        .addCase(getStatUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something is wrong!";
        });
    }
});
