import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "logs",
  initialState: [
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
  reducers: {
    get: (state, action) => {
      state = action.payload;
    },
  },
});
