import { auth, authPost, post } from "../utils/request";

export const loginForAccess = async (data) => {
    const res = await post('/auth/token', data);
    return res;
};

export const loginInfoUser = async (token) => {
    const res = await auth('/user', token);
    return res;
};

export const loginForRefresh = async (data) => {
    const res = await authPost('/auth/refresh', data);
    return res;
};