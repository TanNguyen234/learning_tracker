import {configureStore} from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { statSlice } from './statsSlice';
import { skillSlice } from './skillsSlice';
import { logSlice } from './logsSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        stats: statSlice.reducer,
        skills: skillSlice.reducer,
        logs: logSlice.reducer
    }
})

export default store;