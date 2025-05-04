import { createSlice } from "@reduxjs/toolkit";

export const skillSlice = createSlice({
  name: "skills",
  initialState: [
    { id: 1, state: "Done", title: "React" },
    { id: 2, state: "Learning", title: "FastAPI" },
    { id: 3, state: "Planned", title: "ReduxToolkit" },
    { id: 4, state: "Planned", title: "MongoDB" },
  ],
  reducers: {
    get: (state, action) => {
      state = action.payload;
    },
  },
});
