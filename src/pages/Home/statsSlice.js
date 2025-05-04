import { createSlice } from "@reduxjs/toolkit";

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
});
