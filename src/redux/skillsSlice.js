import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSkill } from "../services/skill";

export const postSkill = createAsyncThunk(
  "skills/post",
  async (credentials, thunkAPI) => {
    try {
      await createSkill(credentials.skillData, credentials.access_token);
      return credentials.logData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [
      { id: 1, status: "Done", title: "React" },
      { id: 2, status: "Learning", title: "FastAPI" },
      { id: 3, status: "Planned", title: "ReduxToolkit" },
      { id: 4, status: "Planned", title: "MongoDB" },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    get: (state, action) => {
      state = action.payload;
    },
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills.push(action.payload); // Thêm log mới vào danh sách
      })
      .addCase(postSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something is wrong!";
      });
  },
});
