import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createLog } from "../services/log";

// Thunk để gửi log lên server
export const postLog = createAsyncThunk(
  "logs/post",
  async (credentials, thunkAPI) => {
    try {
      await createLog(credentials.logData, credentials.access_token);
      return credentials.logData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice quản lý logs
export const logSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [
      {
        id: 1,
        skill: "HTML",
        start: "2025-04-20T08:00:00",
        end: "2025-04-20T09:00:00",
        duration: 60,
      },
      {
        id: 2,
        skill: "React",
        start: "2025-04-20T14:30:00",
        end: "2025-04-20T16:00:00",
        duration: 90,
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    getLogs: (state, action) => {
      state.logs = action.payload;
    },
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.push(action.payload); // Thêm log mới vào danh sách
      })
      .addCase(postLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something is wrong!";
      });
  },
});

// Export reducer và actions
export const { getLogs, setLogs } = logSlice.actions;
export default logSlice.reducer;