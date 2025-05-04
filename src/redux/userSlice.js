import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, loginApi } from "../services/auth";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials, thunkAPI) => {
      try {
        const data = await loginApi(credentials);
        if(data.code !== 200) throw new Error("Đăng nhập thất bại!");
        
        return data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
);

export const autoLoginUser = createAsyncThunk(
  "user/autoLoginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await authApi(credentials);
      if(data.code !== 200) throw new Error("Đăng nhập thất bại!");
      
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  username: "",
  email: "",
  token: "",
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {

    },
    logout: (state) => {
      state.username = "";
      state.email = "";
      state.token = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  }
});

export const { logout } = userSlice.actions;