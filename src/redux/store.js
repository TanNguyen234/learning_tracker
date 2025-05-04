import {configureStore} from '@reduxjs/toolkit';
import { userSlice } from '../pages/auth/userSlice';
import { statSlice } from '../pages/Home/statsSlice';
import { skillSlice } from '../pages/skill/skillsSlice';
import { logSlice } from '../pages/logs/logsSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        stats: statSlice.reducer,
        skills: skillSlice.reducer,
        logs: logSlice.reducer
    }
})

export default store;