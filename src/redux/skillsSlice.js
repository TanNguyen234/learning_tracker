import { createSlice } from "@reduxjs/toolkit";

export const skillSlice = createSlice({
  name: "skills",
  initialState: [
    { id: 1, status: "Done", title: "React" },
    { id: 2, status: "Learning", title: "FastAPI" },
    { id: 3, status: "Planned", title: "ReduxToolkit" },
    { id: 4, status: "Planned", title: "MongoDB" },
  ],
  reducers: {
    get: (state, action) => {
      state = action.payload;
    },
  },
});
