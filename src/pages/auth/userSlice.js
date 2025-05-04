import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    email: "",
    token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.username = "";
            state.email = "";
            state.token = "";
        }
    }
});
